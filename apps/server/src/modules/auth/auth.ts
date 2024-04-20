import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import { type Session, type User } from "lucia";
import { db } from "@/db/client.ts";
import { sessions, users } from "@/db/schema.ts";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: true,
        },
    },
    getUserAttributes: (attributes) => ({
        verifiedAt: attributes.verifiedAt,
        email: attributes.email,
    }),
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: {
            verifiedAt: Date | null;
            email: string;
        };
    }
}

declare module "fastify" {
    interface FastifyRequest {
        user: User;
        session: Session;
    }
}
