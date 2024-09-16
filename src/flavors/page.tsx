import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import { H3 } from "@/components/ui/H3";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Flavors",
    description: "all the flavors we offer"
};

export default function Flavors() {
    return (
        <div> 
            <p> Our Flavors at Falooda Lab
            
            At Falooda Lab, we take falooda to the next level with our innovative and mouthwatering flavors:
            1. Rose Malai Kulfife: rose jello, rose milk, malai kulfi ice cream, and a garnish of delicate rose petals 
            2. Mango Saffron: saffron jello, mango milk, kesar/pista ice cream, and a sprinkle of pistachios
            3. Meetha Paan: with khus jello, fennel seed & cardamom milk, meetha paan ice cream, and paan masala garnish 
            4. Lemon Mint: combining mint jello, lemon milk, lemon ice cream with lemon Oreos, and a hint of lemon zest and mint leaf 
            5. Orange Blossom Pistachio: with orange jello, pistachio & orange blossom milk, orange cream ice cream pistachio garnish 6. Hwachae, featuring watermelon jello, strawberry milk, strawberry ice cream, and a fizzy float effect with lemon/lime soda 7. Hazelnut Coffee, with coffee jello, hazelnut milk, malai kulfi ice cream, and a topping of ground coffee
            </p>
        </div>
    );    
}