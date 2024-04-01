import ky from "ky";
import { env } from "@/env";

export const api = ky.create({
    prefixUrl: env.VITE_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
