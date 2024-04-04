import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import ThemeContextProvider from "./context/Theme";
import UserContextProvider from "./context/User";
import "./styles.css";

import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("app")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeContextProvider>
                <UserContextProvider>
                    <RouterProvider router={router} />
                </UserContextProvider>
            </ThemeContextProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
