/* eslint-disable import/export */
import { RenderOptions, render } from "@testing-library/react";

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
    render(ui, {
        wrapper: ({ children }) => children,
        ...options,
    });

export * from "@testing-library/react";
export { customRender as render };
