import dotenv from "dotenv"

dotenv.config();
export const STRAPI_API_TOKEN= process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';

export const SHIPROCKET_TOKEN = process.env.NEXT_PUBLIC_SHIPROCKET_TOKEN;