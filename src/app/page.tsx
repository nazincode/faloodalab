import { Metadata } from "next";
import Image from "next/image";
import milkshake from "./assets/milkshake.svg";
import falooda from "./assets/falooda.jpg";
import { H1 } from "../components/ui/H1";
import { H2 } from "../components/ui/H2";
import { Bot, Instagram, Music2Icon } from "lucide-react"
import Link from "next/link";

export const metadata: Metadata = {
  title: "Falooda Lab - Smart Site",
};

export default function Home() {
  return (
    // bg-[url('/background.png')] imports an image
    <section className="space-y-16 bg-cover bg-center bg-no-repeat px-1 py-8">
      {/* tailwind classes are mobile first, adjust layout from smallest -> largest w/ sm md lg etc*/}
      <section className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
        <div className="space-y-3">
          <H1 className="text-center sm:text-start">Welcome to Falooda Lab!</H1>
                {/* <p className="text-center sm:text-center"> 
                  Find us on <a href="instagram.com/faloodalab">
                    <Instagram className="inline pb-1"/> 
                  </a> and <a href="tiktok.com/faloodalab">
                    <Music2Icon className="inline pb-1"/>
                  </a>     
                </p> */}
        </div>
        <div className="flex justify-center">
          <Image
            src={falooda}
            alt="an image of falooda"
            height={300}
            className="aspect-auto rounded-full border-2 object-cover shadow-md dark:border-foreground"
          />
        </div>
      </section>
      <section className="space-y-3 text-center">
        <H2>ask the chatbot anything about us!</H2>
        <p>
          Click the <Bot className="inline pb-1" /> icon to activate the AI chat.
        </p>

      </section>
    </section>
  );
}
