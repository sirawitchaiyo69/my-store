// รูปร่างของสินค้าที่หน้าร้านใช้ — API ในครั้งที่ 2 ต้องคืน JSON หน้าตาเดียวกันนี้
// หน้าร้านจะได้สลับจากข้อมูลจำลองไปเรียก API จริงโดยไม่ต้องแก้ component
export type Product = {
  id: number;
  name: string;
  description: string | null;
  // ราคาเป็นข้อความ "190.00" ตามที่คอลัมน์ numeric ส่งออกมา
  price: string;
  // ราคาลด ว่าง (null) = ไม่มีโปร
  salePrice: string | null;
  imageUrl: string | null;
  stock: number;
};
