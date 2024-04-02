/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from "@tanstack/react-router";

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as ProtectedImport } from "./routes/_protected";
import { Route as AuthAuthImport } from "./routes/auth/_auth";

// Create Virtual Routes

const AuthImport = createFileRoute("/auth")();
const IndexLazyImport = createFileRoute("/")();
const ProtectedVerifyLazyImport = createFileRoute("/_protected/verify")();
const AuthAuthSignupLazyImport = createFileRoute("/auth/_auth/sign_up")();
const AuthAuthSigninLazyImport = createFileRoute("/auth/_auth/sign_in")();
const AuthAuthForgotpasswordLazyImport = createFileRoute("/auth/_auth/forgot_password")();

// Create/Update Routes

const AuthRoute = AuthImport.update({
    path: "/auth",
    getParentRoute: () => rootRoute,
} as any);

const ProtectedRoute = ProtectedImport.update({
    id: "/_protected",
    getParentRoute: () => rootRoute,
} as any);

const IndexLazyRoute = IndexLazyImport.update({
    path: "/",
    getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/index.lazy").then((d) => d.Route));

const ProtectedVerifyLazyRoute = ProtectedVerifyLazyImport.update({
    path: "/verify",
    getParentRoute: () => ProtectedRoute,
} as any).lazy(() => import("./routes/_protected.verify.lazy").then((d) => d.Route));

const AuthAuthRoute = AuthAuthImport.update({
    id: "/_auth",
    getParentRoute: () => AuthRoute,
} as any);

const AuthAuthSignupLazyRoute = AuthAuthSignupLazyImport.update({
    path: "/sign_up",
    getParentRoute: () => AuthAuthRoute,
} as any).lazy(() => import("./routes/auth/_auth.sign_up.lazy").then((d) => d.Route));

const AuthAuthSigninLazyRoute = AuthAuthSigninLazyImport.update({
    path: "/sign_in",
    getParentRoute: () => AuthAuthRoute,
} as any).lazy(() => import("./routes/auth/_auth.sign_in.lazy").then((d) => d.Route));

const AuthAuthForgotpasswordLazyRoute = AuthAuthForgotpasswordLazyImport.update({
    path: "/forgot_password",
    getParentRoute: () => AuthAuthRoute,
} as any).lazy(() => import("./routes/auth/_auth.forgot_password.lazy").then((d) => d.Route));

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
    interface FileRoutesByPath {
        "/": {
            preLoaderRoute: typeof IndexLazyImport;
            parentRoute: typeof rootRoute;
        };
        "/_protected": {
            preLoaderRoute: typeof ProtectedImport;
            parentRoute: typeof rootRoute;
        };
        "/auth": {
            preLoaderRoute: typeof AuthImport;
            parentRoute: typeof rootRoute;
        };
        "/auth/_auth": {
            preLoaderRoute: typeof AuthAuthImport;
            parentRoute: typeof AuthRoute;
        };
        "/_protected/verify": {
            preLoaderRoute: typeof ProtectedVerifyLazyImport;
            parentRoute: typeof ProtectedImport;
        };
        "/auth/_auth/forgot_password": {
            preLoaderRoute: typeof AuthAuthForgotpasswordLazyImport;
            parentRoute: typeof AuthAuthImport;
        };
        "/auth/_auth/sign_in": {
            preLoaderRoute: typeof AuthAuthSigninLazyImport;
            parentRoute: typeof AuthAuthImport;
        };
        "/auth/_auth/sign_up": {
            preLoaderRoute: typeof AuthAuthSignupLazyImport;
            parentRoute: typeof AuthAuthImport;
        };
    }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
    IndexLazyRoute,
    ProtectedRoute.addChildren([ProtectedVerifyLazyRoute]),
    AuthRoute.addChildren([
        AuthAuthRoute.addChildren([AuthAuthForgotpasswordLazyRoute, AuthAuthSigninLazyRoute, AuthAuthSignupLazyRoute]),
    ]),
]);

/* prettier-ignore-end */
