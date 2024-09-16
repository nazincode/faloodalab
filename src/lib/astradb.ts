// setup connections with astradb

import { DataAPIClient } from "@datastax/astra-db-ts";
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";


import { OpenAIEmbeddings } from "@langchain/openai";

// store env variables, if endpoint doesn't exist return empty string
const endpoint = process.env.ASTRA_DB_ENDPOINT || "";
const token = process.env.ASTRA_DB_APPLICATION_TOKEN || "";
const collection = process.env.ASTRA_DB_COLLECTION || "";

// if token, endpoint, or collection is missing throw an error
if (!token || !endpoint || !collection) {
    throw new Error(
        "Please set ASTRA_DB environment variables missing."
    )
}

export async function getVectorStore() {
    return AstraDBVectorStore.fromExistingIndex(
        new OpenAIEmbeddings({ modelName: "text-embedding-3-small" }),
        {
            token,
            endpoint,
            collection,
            collectionOptions: {
                vector: {
                    // the number of dimensions openai generates; the more dimensions, the more info we can store
                    dimension: 1536, 
                    metric: "cosine"
                }
            }
        }
    )
}

export async function getEmbeddingsCollection() {
    const client = new DataAPIClient(token);
    const db = client.db(endpoint);
    return db.collection(collection);
}
