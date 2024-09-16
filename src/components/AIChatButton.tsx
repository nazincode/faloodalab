// create button to toggle chatbox open/close

"use client"

import { useState } from "react";
import { Bot } from "lucide-react";
import AIChatBox from "./AIChatBox";

export default function AIChatButton() {
    // 'useState' hook used to create state variable 'chatBoxOpen' and function 'setChatBoxOpen' to update it; chatbox closed by default
    const [chatBoxOpen, setChatBoxOpen] = useState(false);

    return (
        <>
            {/* clicking button sets setChatBoxOpen function to true and  opens chatbox*/}
            <button onClick={() => setChatBoxOpen(true)}>
                <Bot size={24} />
            </button>
            {/* passes chatBoxOpen state to AIChatBox as a prop */}
            {/* passes setChatBoxOpen function to AIChatBox which closes chatbox when called */}
            <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
        </>
    );

}