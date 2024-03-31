import { FastifyInstance } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
import { verifyRequestOrigin } from "lucia";

interface Options {
    enabled: boolean;
}

export const csrfPlugin = fastifyPlugin(
    async (app: FastifyInstance, opts: Options) => {
        if (!opts.enabled) {
            return;
        }

        // eslint-disable-next-line consistent-return
        app.addHook("preHandler", (req, res, done) => {
            if (req.method === "GET") {
                return done();
            }

            const originHeader = req.headers.origin ?? null;
            const hostHeader = req.headers.host ?? null;
            if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
                return res.status(403);
            }
        });
    },
    {
        name: "csrf",
        fastify: "4.x",
    }
);
