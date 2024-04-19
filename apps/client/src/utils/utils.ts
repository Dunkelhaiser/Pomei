import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
};

export const generateId = () => {
    let id = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 36; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
};
