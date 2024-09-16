import { Message, useChat } from "ai/react"; //from vercel ai sdk
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Bot, SendHorizonal, Trash, XCircle } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import Link from "next/link";
import { useEffect, useRef } from "react";

// interface: tsx feature used to define the shape of an object, specifies property: type
// AIChatBoxProps: name of interface
interface AIChatBoxProps {
    // open property is a boolean
    open: boolean;
    // onClose property is a function that takes no arguments and returns nothing
    onClose: () => void 
}

// function AIChatBox takes open, onClose as parameters and uses destructuring to extract "open" and "onClose" from object AIChatBoxProps
export default function AIChatBox({open, onClose} : AIChatBoxProps) {
    const {
        messages, // messages b/w user and bot
        input, // current input state of chat's textfield
        handleInputChange, // changes input state
        handleSubmit, // sends chat messages to api endpoint
        setMessages, // makes chat empty again
        isLoading, // loading state
        error, // error state
    } = useChat(); // automatic endpoint -> /api/chat

    // automatically scroll down
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages])


    // autofocus on input box when opening chatbox
    useEffect(() => {
        if (open) {
            inputRef.current?.focus();
        }
    })

    // check if messages at the last index are empty, if not empty check if from user
    const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

    // use cn function to apply styling conditionally to chatbox
    // if open is true, show chatbox
    return (
        <div 
            className={cn(
                "bottom-0 right-0 z-50 w-full max-w-[400px] p-1 xl:right-36", 
                // if 'open' is true, chatbox is fixed(visable) otherwise, hidden
                open ? "fixed" : "hidden",
            )}
        >
            {/* chatbox close button: when clicked, it calls onClose function to close chatbox*/}
            <button onClick={onClose} className="mb-1 ms-auto block">
                {/* import close icon */}
                <XCircle size={30} className="rounded-full bg-background" />
            </button>

            {/* chatbox styling */}
            <div className="flex h-[600px] flex-col rounded border bg-background shadow-xl">
                {/* use scrollRef to scroll down when something happens, only available on overflow-y class */}
                <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
                    {/* for each message in messages array, create ChatMessage */}
                    {messages.map(message => (
                        <ChatMessage message = {message} key={message.id} />
                    ))}
                    
                    {/* if isLoading is true and lastmessage is from user, */}
                    { isLoading && lastMessageIsUser && (
                        // render ChatMessage component
                        <ChatMessage
                            // by passing message prop to ChatMessage as an object
                            message={{
                                id: "loading",
                                role: "assistant",
                                content: "thinking...",
                            }}
                        />
                    )}
                    {/* if error is true, */}
                    {error && (
                        // render ChatMessage component
                        <ChatMessage
                            // by passing message prop
                            message={{
                                id: "error",
                                role: "assistant",
                                content: "something went wrong, please try again!",
                            }}
                        />
                    )}

                    {/* check for errors */}
                    {/* if no error and length of messages is 0, empty chatbox & present default message*/}
                    {!error && messages.length === 0 && (
                        <div className="flex flex-col h-full items-center justify-center gap-3 text-center mx-8">
                            <Bot size={28} />
                            <p className="text-lg font-medium"> 
                                Send a message to shart chat 
                            </p>
                            <p>
                                You can ask FaloodaBot any questions about Falooda Lab and Falooda history and it will present you with the relevant information from our website.
                            </p>
                            <p className="text-sm text-muted-foreground">
                                If you would like Falooda Lab to cater at your events, dm us!
                            </p>
                        </div>
                    )}
                </div>

                {/* form functions at bottom of chatbox handled by vercel ai sdk */}
                <form onSubmit={handleSubmit} className="m-3 flex gap-1">
                    
                    {/* clear chat button */}
                    <button
                        type="button"
                        className="flex items-center justify-center w-10 flex-none"
                        // tooltip that appears when hovering over icon
                        title="Clear chat"
                        // when clicked, call setMessages function to clear chat messages
                        onClick={() => setMessages([])}
                    >
                        {/* trash icon */}
                        <Trash size={24} />
                    </button>
                    
                    {/* input field */}
                    <input
                    // value controlled by input state destructured above
                    value={input}
                    // update input state using handleInputChange function
                    onChange={handleInputChange}
                    placeholder="what's up?"
                    className="grow border rounded bg-background px-3 py-2"
                    ref={inputRef}
                    />
                    
                    {/* submit button */}
                    <button 
                    type="submit"
                    className="flex w-10 flex-none items-center justify-center disabled:opacity-50"
                    // button is disabled if isLoading is true or if the input field is empty
                    disabled={isLoading || input.length === 0}
                    // tooltip message
                    title="Submit message"
                    >
                        {/* send icon */}
                        <SendHorizonal size={24} />
                    </button>
                </form>
            </div>
        </div>
    );     

}

interface ChatMessageProps {
    message: Message
}

// ChatMessage component: display individual messages with conditional styles for AI or user
// destructure message as an object to extract role and content
function ChatMessage( {message: {role, content}}: ChatMessageProps) {
    // check if message is from ai assistant 
    const isAIMessage = role === "assistant";

    return (
        // if message from ai assistant , set conditional style
        <div className={cn("mb-3 flex items-center", isAIMessage ? "me-5 justify-start" : "ms-5 justify-end" 
        )}>
            {/* if message from ai, show bot icon */}
            {isAIMessage && <Bot className="mr-2 flex-none" />}
            <div className={cn(
                "rounded-md border px-3 py-2", 
                isAIMessage ? "bg-background" : "bg-foreground text-background",
            )}>
                {/* render markdown {content} as html*/}
                <ReactMarkdown
                // add style to html using components: an object that takes key value pairs (html tag : function)
                components={{
                    // a: styling for links w/ function that takes props and returns link component 
                    a: ({node, ref, ...props}) => (
                        <Link
                        {...props}
                        // default ot empty string if props.href not provided
                        href={props.href ?? ""}
                        className="text-primary hover:underline"
                        />
                    ),
                    // styling for paragraph w/ function that takes props and returns style <p> element
                    p: ({node, ref, ...props}) => (
                        <p {...props} className="mt-3 first:mt-0" />
                    ),
                    // styling for lists
                    ul: ({node, ref, ...props}) => (
                        <ul {...props} className="mt-3 list-inside list-disc first:mt-0" />
                    ),
                    // styling for list items
                    li: ({node, ref, ...props}) => (
                        <li {...props} className="mt-1" />
                    )
                }}>
                    {/* render markdown content */}
                    {content}
                </ReactMarkdown>
                    
            </div>
        </div>
    );       
}