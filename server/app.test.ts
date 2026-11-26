import { describe, expect, test } from "bun:test";

import { app } from "./app";

describe("GET /api/health", () => {
  test("ตอบ 200 พร้อม { ok: true }", async () => {
    const res = await app.handle(new Request("http://localhost/api/health"));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  test("path ที่ไม่มีอยู่ตอบ 404", async () => {
    const res = await app.handle(new Request("http://localhost/api/nope"));

    expect(res.status).toBe(404);
  });
});
