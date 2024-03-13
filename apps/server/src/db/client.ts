import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.ts";
import { env } from "@/env.ts";

const sql = postgres(env.DATABASE_URL, { max: 1 });
export const db = drizzle(sql, { schema });
