import { z as zod } from "zod";

export const messageSchema = zod.object({
    message: zod.string(),
});

export const emptySchema = zod.object({});
