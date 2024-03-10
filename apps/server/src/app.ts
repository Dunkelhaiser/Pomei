import Fastify from "fastify";

export const app = Fastify();

app.get("/healthcheck", () => ({
    status: "OK",
}));

void (async () => {
    try {
        await app.listen({ port: 3000, host: "0.0.0.0" });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
})();
