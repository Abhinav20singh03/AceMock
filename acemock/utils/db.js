import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema.js"
const sql = neon("postgresql://neondb_owner:npg_hiHjpcU4D1fz@ep-soft-salad-a5l6mz18-pooler.us-east-2.aws.neon.tech/acemock?sslmode=require");
export const db = drizzle(sql,{schema});
