# MY STORE — Zero to Checkout starter

โปรเจกต์ตั้งต้นของคอร์ส **Zero to Checkout (พัฒนาระบบอีคอมเมิร์ซเบื้องต้น)**
เราจะต่อร้านนี้ไปทีละครั้ง จากหน้าร้านที่ใช้ข้อมูลจำลอง → database จริง → API → ตะกร้า → ชำระเงินสำเร็จ

> **Know the Core · Build the Store** — สั่ง AI ได้ดี ต้องเข้าใจสิ่งที่สั่ง

## เริ่มใช้งาน

ต้องติดตั้ง Git, VS Code และ Bun ก่อน — ดูขั้นตอนเต็มใน setup guide ของคอร์ส

```bash
git clone https://github.com/bunjamat/zero-to-checkout-starter.git
cd zero-to-checkout-starter
bun install
```

copy ไฟล์ `.env.example` เป็น `.env` แล้วใส่ connection string ของ Neon

```bash
# macOS / Linux
cp .env.example .env
```

```powershell
# Windows (PowerShell)
Copy-Item .env.example .env
```

รัน

```bash
bun run dev
```

เปิด URL ที่ terminal พิมพ์ออกมา (ปกติคือ http://localhost:3000 แต่ถ้า port ไม่ว่างจะเป็นเลขอื่น)
แล้วลองเปิด `/api/health` ต้องเห็น `{"ok":true}`

## โครงสร้าง

| ที่อยู่ | คืออะไร |
| --- | --- |
| `app/page.tsx` | หน้าร้าน |
| `app/api/[[...slugs]]/route.ts` | ประตูที่ Next ส่ง request ใต้ `/api/*` ต่อให้ Elysia |
| `server/app.ts` | API ทั้งหมดของร้าน (Elysia) |
| `lib/` | type, ฟังก์ชันแปลงเงิน, ข้อมูลจำลอง |
| `components/` | หน้าตาของร้าน (`ui/` มาจาก shadcn) |

## Checkpoint

ต้นคาบแต่ละครั้ง ถ้าครั้งก่อนตามไม่ทัน ให้กระโดดไปจุดเริ่มของครั้งนั้นได้เลย

| tag | ได้อะไร |
| --- | --- |
| `cp-0` | หน้าร้านจากข้อมูลจำลอง + `/api/health` |
| `cp-1` | + เฉลยแล็บครั้งที่ 1 (`db/lab1.sql`) |

พิมพ์ทีละบรรทัด (ใช้ได้ทั้ง macOS และ Windows) — ตัวอย่างนี้กระโดดไป `cp-1` ถ้าเป็นครั้งอื่นให้เปลี่ยนเลขทั้งสองที่

```bash
git add -A
git commit -m "wip"
git fetch --tags
git switch -c my-store-1 cp-1
bun install
```

- สองบรรทัดแรกเก็บงานเดิมของเราไว้ใน commit ไม่หายและไม่ขวางการสลับ (ถ้าขึ้นว่า `nothing to commit` ก็ไม่เป็นไร)
- `git switch -c` สร้าง branch ใหม่ของเราเองจาก checkpoint — อย่าใช้ `git checkout cp-1` เฉย ๆ เพราะงานที่ commit ต่อจากนั้นจะไม่อยู่บน branch ไหนและหายได้
- `bun install` ติดตั้ง library ที่ checkpoint นั้นใช้ (บาง checkpoint เพิ่ม library ใหม่)

## คำสั่ง

| คำสั่ง | ทำอะไร |
| --- | --- |
| `bun run dev` | รันตอนพัฒนา |
| `bun run build` | build สำหรับ production |
| `bun test` | รัน test |
