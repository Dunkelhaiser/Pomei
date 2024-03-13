import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import Fastify from "fastify";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import { authRoutes } from "./modules/auth/auth.route.ts";
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

    void app.register(authRoutes, { prefix: "/auth" });
    try {
        await app.listen({ port: 3000, host: "0.0.0.0" });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
})();
