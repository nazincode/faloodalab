
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
// need to import environment variables before importing embeddings/vectorestore 

import { getEmbeddingsCollection, getVectorStore } from "../src/lib/astradb";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { DocumentInterface } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


async function generateEmbeddings() {

    const vectorStore = await getVectorStore();

    (await getEmbeddingsCollection()).deleteMany({})

    const loader = new DirectoryLoader(
        // directory you want to load it from
        "src/app/",
        // define how to handle different file extensions 
        {
            // for .tsx files, pass the file path and load as strings using TextLoader
            ".tsx": (path) => new TextLoader(path)
        },
        // determine if you want to load nested folders
        true
    )

    // create array with desired page names
    // const filenames = ["page.tsx", "flavors.tsx", "about.tsx"];
    // load .tsx files 
    const docs = (await loader.load())
    // filter docs using .some to check if doc.metadata ends with any of the desired filenames
                // docs.filter(doc => filenames.some(name => doc.metadata.source.endsWith(name)));
    .filter((doc) => doc.metadata.source.endsWith("page.tsx"))
    // generate page url
    .map((doc): DocumentInterface => {
        const url = doc.metadata.source
            // replaces backward slashes in path with forward slashes
            .replace(/\\/g, "/")
            // split string into 2 at src and only keep 2nd part at index 1
            .split("/src/app")[1]
            // convert every page to string ex: /about OR leave it at front page url
            .split("/page")[0] || "/";

            // remove unnecessary info from pages in order to pass core info to AI
            const pageContentTrimmed = doc.pageContent
                // remove all import statements
                .replace(/^import.*$/gm, "")
                // remove all className props
                .replace(/ className=(["']).*?\1| className={.*?}/g, "")
                // remove empty lines
                .replace(/^\s*[\r]/gm, "")
                // trim whitespace from beginning or end
                .trim();
 
            return {
                pageContent: pageContentTrimmed,
                metadata: { url }
            }
    })

    // split docs into chunks if large page
    const splitter = RecursiveCharacterTextSplitter.fromLanguage("html");

    const splitDocs = await splitter.splitDocuments(docs)
    
    await vectorStore.addDocuments(splitDocs);
}

generateEmbeddings();