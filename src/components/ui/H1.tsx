import { cn } from "@/lib/utils";

// h1 component will take the exact same props as a normal html h1 component so you can use it as a normal h1 tag and then add your own styling
export function H1(props: React.HTMLProps<HTMLHeadingElement>) {
    return (
        <h1
            // apply all the props passed to this component to h1 headline
            {...props}
            // override html classname with your styling
            // use cn and props.classname to add additional styling from outside the component
            className={cn(
                "text-3xl font-bold tracking-tight sm:text-4xl", props.className,
            )}
        />
    );
}