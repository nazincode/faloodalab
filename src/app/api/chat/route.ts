// api route handler

import { ChatOpenAI } from "@langchain/openai";
import { LangChainStream, Message as VercelChatMessage, OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionMessageParam } from "ai/prompts";
import OpenAI from "openai";
import { ChatPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { getVectorStore } from "@/lib/astradb";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { AIMessage, HumanMessage } from "@langchain/core/messages";

// useChat hook will make POST request to endpoint
export async function POST(req: Request) {
    // print error message if it doesn't work
    try {
        const body = await req.json();
        const messages = body.messages;

        const chatHistory = messages
        .slice(0, -1)
        .map((m: VercelChatMessage) => 
        m.role === "user" 
            ? new HumanMessage(m.content) : new AIMessage(m.content)
    )

        const currentMessageContent = messages[messages.length - 1].content;
        
        const {stream, handlers} = LangChainStream();

        // pass openai api key
        const chatModel = new ChatOpenAI({
            modelName: "gpt-4o-mini",
            streaming: true,
            callbacks: [handlers],
            verbose: true
        })

        // chatbot setup, pass system message using langchain
        const prompt = ChatPromptTemplate.fromMessages([
            [
                "system", 
                "You are chatbot for a dessert catering business that specializes in falooda. You are fun, peppy, and witty. " +
                "Answer the user's questions based on the below context. " + 
                "Whenever it makes sense, provide links to pages that contain more information about the topic from the given context. " + 
                "Format your messages in markdown format.\n\n" +
                "Context: \n{context}"
            ],
            [
                "user", "{input}"
            ]
        ]);

        // execute prompt via openai chat model
        const combineDocsChain = await createStuffDocumentsChain({
            llm: chatModel,
            prompt,
            documentPrompt: PromptTemplate.fromTemplate(
            "Page URL: {url}\n\nPage content:\n{page_content}"
            ),
            documentSeparator: "\n-------------\n"
        })

        const retriever = (await getVectorStore()).asRetriever();

        const retrievalChain = await createRetrievalChain({
            combineDocsChain,
            retriever
        })

        retrievalChain.invoke({
            // input last message user sent 
            input: currentMessageContent
        })


        return new StreamingTextResponse(stream);
    }   catch (error) {
        console.error(error);
        return Response.json({error: "Internal server error"}, { status: 500 });
        
    }
}