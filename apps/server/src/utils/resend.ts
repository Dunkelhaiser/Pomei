import { Resend } from "resend";
import { env } from "@/env.ts";

export const resend = new Resend(env.RESEND_KEY);
