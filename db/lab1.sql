-- เฉลยแล็บครั้งที่ 1: ตารางของร้าน MY STORE
-- รันทั้งไฟล์ซ้ำกี่รอบก็ได้ เพราะบรรทัดแรกลบตารางเก่าทิ้งก่อน

DROP TABLE IF EXISTS order_items, orders, products;

-- ===== ส่วนที่ 1: สร้างตาราง =====

-- สินค้า 1 ชิ้น = 1 แถว
-- เงินใช้ numeric(10,2) = ทศนิยม 2 ตำแหน่งที่เก็บได้ตรงเป๊ะ
-- sale_price ว่างได้ (ว่าง = ไม่มีโปร) แต่ถ้ามีต้องถูกกว่าราคาปกติ
CREATE TABLE products (
  id          integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name        varchar(200)  NOT NULL,
  description text,
  price       numeric(10,2) NOT NULL CHECK (price > 0),
  sale_price  numeric(10,2) CHECK (sale_price > 0),
  image_url   varchar(500),
  stock       integer       NOT NULL DEFAULT 0,
  created_at  timestamptz   NOT NULL DEFAULT now(),
  CONSTRAINT sale_price_below_price CHECK (sale_price < price)
);

-- ใบสั่งซื้อ 1 ใบ = 1 แถว (หัวใบเสร็จ)
CREATE TABLE orders (
  id            integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_name varchar(200)  NOT NULL,
  status        varchar(20)   NOT NULL DEFAULT 'pending', -- pending = ยังไม่จ่าย, paid = จ่ายแล้ว
  total         numeric(10,2) NOT NULL,
  created_at    timestamptz   NOT NULL DEFAULT now(),
  paid_at       timestamptz
);

-- รายการในใบสั่งซื้อ (บรรทัดในใบเสร็จ) — ใบเดียวมีได้หลายบรรทัด
-- unit_price คัดลอกราคาที่ขายจริง ณ ตอนสั่งไว้ (ราคาลดถ้ามี) เพราะราคาสินค้าเปลี่ยนได้ แต่ใบเสร็จเก่าต้องไม่เปลี่ยนตาม
CREATE TABLE order_items (
  id         integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id   integer       NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id integer       NOT NULL REFERENCES products(id),
  quantity   integer       NOT NULL CHECK (quantity > 0),
  unit_price numeric(10,2) NOT NULL
);

-- ===== ส่วนที่ 2: ใส่สินค้า =====
-- ไม่ต้องใส่ id เอง database นับให้

INSERT INTO products (name, description, price, sale_price, stock) VALUES
  ('แก้วเซรามิก',         'แก้วกาแฟขนาด 350 ml',      190.00, 159.00, 24),
  ('เสื้อยืด Hello World', 'ผ้าคอตตอน 100%',           350.00, NULL,   10),
  ('สติกเกอร์ชุด Dev',     'สติกเกอร์ 12 ลาย',          99.00,  NULL,   100),
  ('สมุดโน้ตจุด',          'กระดาษ 120 แกรม 96 แผ่น',  159.00, NULL,   0),
  ('ถุงผ้า MY STORE',      'ถุงผ้าแคนวาส',             220.00, NULL,   15),
  ('แผ่นรองเมาส์',         'ขนาด 30 × 25 cm',          259.00, NULL,   8);

-- ราคาที่ขายจริง = ราคาลดถ้ามี ไม่งั้นราคาปกติ (COALESCE เลือกค่าแรกที่ไม่ว่าง)
SELECT id, name, price, sale_price, COALESCE(sale_price, price) AS selling_price, stock
FROM products
ORDER BY id;

-- ===== ส่วนที่ 3: ลองสั่งซื้อ =====
-- สมชายซื้อแก้ว 2 ใบตอนลดราคา (159 × 2 = 318) กับสติกเกอร์ 1 ชุด (99) รวม 417 บาท

INSERT INTO orders (customer_name, total) VALUES ('สมชาย', 417.00);

INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
  (1, 1, 2, 159.00),
  (1, 3, 1, 99.00);

-- ===== ส่วนที่ 4: อ่านใบเสร็จด้วย JOIN =====
-- ต่อสามตารางเข้าด้วยกัน: ใบสั่งซื้อ → บรรทัดในใบ → ชื่อสินค้า

SELECT
  o.id                        AS order_id,
  o.customer_name,
  p.name                      AS product,
  oi.quantity,
  oi.unit_price,
  oi.quantity * oi.unit_price AS line_total
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
JOIN products p     ON p.id = oi.product_id
ORDER BY oi.id;

-- ยอดรวมทั้งใบ คำนวณจากบรรทัดจริง — ต้องได้ 417.00 ตรงกับ orders.total
SELECT o.id, o.total, SUM(oi.quantity * oi.unit_price) AS sum_of_lines
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
GROUP BY o.id;

-- ===== ส่วนที่ 5: หมดโปร =====
-- แก้วกลับไปราคาปกติ แต่ใบเสร็จของสมชายต้องยังเป็น 159.00

UPDATE products SET sale_price = NULL WHERE id = 1;

SELECT p.name, p.price AS price_today, oi.unit_price AS paid
FROM order_items oi
JOIN products p ON p.id = oi.product_id
ORDER BY oi.id;

-- ===== ลองเอง: constraint ทำงานยังไง =====
-- เอาเครื่องหมาย -- หน้าบรรทัดล่างออกแล้วรันทีละบรรทัด จะเจอ error "violates check constraint"
-- INSERT INTO products (name, price) VALUES ('ของแจกฟรี', 0);
-- INSERT INTO products (name, price, sale_price) VALUES ('ลดเกินราคา', 100.00, 150.00);
