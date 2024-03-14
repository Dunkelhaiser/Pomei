import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        PRODUCTION: z
            .string()
            .refine((s) => s === "true" || s === "false")
            .transform((s) => s === "true"),
    },
    runtimeEnv: process.env,
    emptyStringAsUndefined: true,
});
