import { Elysia } from "elysia";

// API ทั้งหมดของร้านอยู่ใน instance นี้ตัวเดียว
// prefix ต้องตรงกับโฟลเดอร์ app/api/ ที่ Next ส่ง request เข้ามา
export const app = new Elysia({ prefix: "/api" }).get("/health", () => ({ ok: true }));
