/** @type {import ("drizzle-kit").Config } */
export default {
    schema:"./utils/schema.js",
    dialect:"postgresql",
    dbCredentials:{
        url:"postgresql://neondb_owner:npg_hiHjpcU4D1fz@ep-soft-salad-a5l6mz18-pooler.us-east-2.aws.neon.tech/acemock?sslmode=require"
    }
}