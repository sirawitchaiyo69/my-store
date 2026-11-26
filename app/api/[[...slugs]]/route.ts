import { app } from "@/server/app";

// Next ส่งทุก request ใต้ /api/* มาที่ไฟล์นี้ แล้วเราส่งต่อให้ Elysia
// method ไหนไม่ได้ export ไว้ Next จะตอบ 405 ทันทีโดยไม่ถึง Elysia
export const GET = app.fetch;
export const POST = app.fetch;
