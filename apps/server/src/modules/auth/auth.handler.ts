import { FastifyReply, FastifyRequest } from "fastify";
import { lucia } from "./auth.ts";

export const authHandler = async (
    req: FastifyRequest<{ Body: unknown } | { Params: unknown } | { Body: unknown; Params: unknown }>,
    res: FastifyReply
    // eslint-disable-next-line consistent-return
) => {
    const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");

    if (!sessionId) {
        return res.code(401).send({ message: "Unathorized" });
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (session && session.fresh) {
        const cookie = lucia.createSessionCookie(session.id);
        void res.setCookie(cookie.name, cookie.value, cookie.attributes);
    }

    if (!session) {
        const cookie = lucia.createBlankSessionCookie();
        void res.setCookie(cookie.name, cookie.value, cookie.attributes);
    }

    req.user = user!;
    req.session = session!;
};
