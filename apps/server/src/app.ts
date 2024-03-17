import fastifyCookie, { FastifyCookieOptions } from "@fastify/cookie";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import Fastify, { FastifyInstance } from "fastify";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { authRoutes } from "./modules/auth/auth.route.ts";
import { csrfPlugin } from "./modules/auth/csrf.ts";
import { version } from "../package.json";

export const app = Fastify({
    logger: true,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

const signals = ["SIGINT", "SIGTERM", "SIGHUP"] as const;

const gracefulShutdown = async (signal: (typeof signals)[number], server: FastifyInstance) => {
    app.log.info(`Received signal: ${signal}`);
    await server.close();
    process.exit(0);
};

app.get("/healthcheck", () => ({
    status: "OK",
}));

void (async () => {
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
    try {
        await app.listen({ port: 3000, host: "0.0.0.0" });

        for (const signal of signals) {
            process.on(signal, () => gracefulShutdown(signal, app));
        }
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
})();
