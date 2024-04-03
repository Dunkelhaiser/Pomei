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
import { Route as ProtectedSettingsSecurityImport } from "./routes/_protected/settings/security";
import { Route as ProtectedSettingsGeneralImport } from "./routes/_protected/settings/general";

// Create Virtual Routes

const AuthImport = createFileRoute("/auth")();
const IndexLazyImport = createFileRoute("/")();
const ProtectedVerifyLazyImport = createFileRoute("/_protected/verify")();
const ProtectedSettingsLazyImport = createFileRoute("/_protected/settings")();
const AuthAuthSignupLazyImport = createFileRoute("/auth/_auth/sign_up")();
const AuthAuthSigninLazyImport = createFileRoute("/auth/_auth/sign_in")();
const AuthAuthForgotpasswordLazyImport = createFileRoute("/auth/_auth/forgot_password")();
const AuthAuthResetpasswordTokenLazyImport = createFileRoute("/auth/_auth/reset_password/$token")();

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
} as any).lazy(() => import("./routes/_protected/verify.lazy").then((d) => d.Route));

const ProtectedSettingsLazyRoute = ProtectedSettingsLazyImport.update({
    path: "/settings",
    getParentRoute: () => ProtectedRoute,
} as any).lazy(() => import("./routes/_protected/settings.lazy").then((d) => d.Route));

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

const ProtectedSettingsSecurityRoute = ProtectedSettingsSecurityImport.update({
    path: "/security",
    getParentRoute: () => ProtectedSettingsLazyRoute,
} as any);

const ProtectedSettingsGeneralRoute = ProtectedSettingsGeneralImport.update({
    path: "/general",
    getParentRoute: () => ProtectedSettingsLazyRoute,
} as any);

const AuthAuthResetpasswordTokenLazyRoute = AuthAuthResetpasswordTokenLazyImport.update({
    path: "/reset_password/$token",
    getParentRoute: () => AuthAuthRoute,
} as any).lazy(() => import("./routes/auth/_auth.reset_password.$token.lazy").then((d) => d.Route));

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
        "/_protected/settings": {
            preLoaderRoute: typeof ProtectedSettingsLazyImport;
            parentRoute: typeof ProtectedImport;
        };
        "/_protected/verify": {
            preLoaderRoute: typeof ProtectedVerifyLazyImport;
            parentRoute: typeof ProtectedImport;
        };
        "/_protected/settings/general": {
            preLoaderRoute: typeof ProtectedSettingsGeneralImport;
            parentRoute: typeof ProtectedSettingsLazyImport;
        };
        "/_protected/settings/security": {
            preLoaderRoute: typeof ProtectedSettingsSecurityImport;
            parentRoute: typeof ProtectedSettingsLazyImport;
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
        "/auth/_auth/reset_password/$token": {
            preLoaderRoute: typeof AuthAuthResetpasswordTokenLazyImport;
            parentRoute: typeof AuthAuthImport;
        };
    }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
    IndexLazyRoute,
    ProtectedRoute.addChildren([
        ProtectedSettingsLazyRoute.addChildren([ProtectedSettingsGeneralRoute, ProtectedSettingsSecurityRoute]),
        ProtectedVerifyLazyRoute,
    ]),
    AuthRoute.addChildren([
        AuthAuthRoute.addChildren([
            AuthAuthForgotpasswordLazyRoute,
            AuthAuthSigninLazyRoute,
            AuthAuthSignupLazyRoute,
            AuthAuthResetpasswordTokenLazyRoute,
        ]),
    ]),
]);

/* prettier-ignore-end */
