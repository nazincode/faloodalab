// set up twMerge to be able to override tailwind classes 
// clsx allows us to pass classes conditionally

import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}