import { describe, expect, test } from "bun:test";

import { formatBaht } from "./money";

describe("formatBaht", () => {
  test("ใส่สัญลักษณ์บาทและทศนิยม 2 ตำแหน่ง", () => {
    expect(formatBaht("129.00")).toBe("฿129.00");
  });

  test("ใส่จุลภาคคั่นหลักพัน", () => {
    expect(formatBaht("1500.00")).toBe("฿1,500.00");
  });

  test("ตัวเลขยาวไม่เพี้ยน เพราะไม่ได้แปลงเป็น number", () => {
    expect(formatBaht("12345678.99")).toBe("฿12,345,678.99");
  });
});
