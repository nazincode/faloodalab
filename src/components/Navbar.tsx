import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import AIChatBox from "./AIChatBox";
import AIChatButton from "./AIChatButton";

export default function Navbar() {
    return (
        <header className="sticky top-0">
        {/* max-w is size of header itself
        mx-auto is alignment for contents inside header
        flex-wrap makes elements lay out horizontal except in smaller screens it becomes vertical*/}
            <div className="max-w-3xl mx-auto flex flex-wrap justify-between gap-3 px-3 py-4">
                <nav className="space-x-4 font-medium">
                    {/* use Link to import links */}
                    <Link href="/">home</Link>
                    <Link href="/about">about us</Link>
                    <Link href="/flavors">our flavors</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <AIChatButton />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}