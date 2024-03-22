import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { folderSchema, newFolderSchema } from "./folder.schema.ts";
import { createFolderHandler } from "./folders.controller.ts";
import { authHandler } from "@/auth/auth.handler.ts";
import { messageSchema } from "@/utils/schema.ts";

export const foldersRoutes = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post(
        "/",
        {
            preHandler: authHandler,
            schema: {
                tags: ["folders"],
                description: "Create new folder",
                body: newFolderSchema,
                response: {
                    201: folderSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        createFolderHandler
    );
};
