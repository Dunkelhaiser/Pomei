import { z as zod } from "zod";

export const getByIdSchema = zod.object({
    id: zod.string().uuid({ message: "Enter valid id format" }),
});

export const orderSchema = zod.object({
    order: zod.number().min(0, { message: "Order must be greater than or equal to 0" }),
});

export const getPaginated = {
    page: zod
        .preprocess((val) => Number(val), zod.number().min(1, { message: "Page must be greater than or equal to 1" }))
        .optional(),
    limit: zod
        .preprocess(
            (val) => Number(val),
            zod.number().min(1, { message: "Page size must be greater than or equal to 1" })
        )
        .optional(),
    isAscending: zod
        .string()
        .refine((s) => s === "true" || s === "false")
        .transform((s) => s === "true")
        .optional(),
};

export type GetByIdInput = zod.infer<typeof getByIdSchema>;
export type OrderInput = zod.infer<typeof orderSchema>;
