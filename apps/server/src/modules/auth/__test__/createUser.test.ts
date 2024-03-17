import Fastify from "fastify";
import { describe, it, vi, expect } from "vitest";
import * as AuthService from "../auth.service.ts";

describe("POST '/auth/createUser'", () => {
    it("should create a new user", async () => {
        const app = Fastify();
        await app.ready();

        const user = {
            id: "1",
            email: "test@gmail.com",
            password: "test12345",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const createUserSpy = vi.spyOn(AuthService, "createUser");
        createUserSpy.mockResolvedValue(user);
        expect(createUserSpy.getMockName()).toEqual("createUser");

        const payload = {
            email: "test@gmail.com",
            password: "test12345",
        };
        const response = await app.inject({
            method: "POST",
            url: "/auth/createUser",
            payload,
        });

        expect(response.json()).toEqual(user);
        expect(createUserSpy).toHaveBeenCalledWith(payload);
    });
});
