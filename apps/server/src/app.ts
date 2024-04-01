import fastifyCookie, { FastifyCookieOptions } from "@fastify/cookie";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import Fastify from "fastify";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { authRoutes } from "./modules/auth/auth.route.ts";
import { csrfPlugin } from "./modules/auth/csrf.ts";
import { foldersRoutes } from "./modules/folders/folders.route.ts";
import { notesRoutes } from "./modules/notes/notes.route.ts";
import { version } from "../package.json";

export const app = Fastify({
    logger: true,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get("/healthcheck", () => ({
    status: "OK",
}));

void (async () => {
    await app.register(cors, {
        origin: env.FRONTEND_URL,
        credentials: true,
    });
    void app.register(swagger, {
        swagger: {
            info: {
                title: "Pomei",
                description: "Pomei API Documentation",
                version,
            },
        },
        transform: jsonSchemaTransform,
    });
    void app.register(swaggerUi, {
        routePrefix: "/docs",
        staticCSP: true,
    });

    void app.register(fastifyCookie, {
        secret: "EGt+lNs9nf6rT8WGSQuGMYK4KCs=",
        setOptions: {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            secure: env.PRODUCTION === true,
            httpOnly: true,
            sameSite: "Strict",
        },
    } as FastifyCookieOptions);

    void app.register(csrfPlugin, {
        enabled: env.PRODUCTION === true,
    });

    void app.register(authRoutes, { prefix: "/auth" });
    void app.register(notesRoutes, { prefix: "/notes" });
    void app.register(foldersRoutes, { prefix: "/folders" });

    try {
        await app.listen({ port: 3000, host: "0.0.0.0" });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
})();
