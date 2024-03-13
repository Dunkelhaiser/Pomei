import Fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { authRoutes } from "./modules/auth/auth.route.ts";

export const app = Fastify({
    logger: true,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get("/healthcheck", () => ({
    status: "OK",
}));

void (async () => {
    void app.register(authRoutes, { prefix: "/auth" });
    try {
        await app.listen({ port: 3000, host: "0.0.0.0" });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
})();
