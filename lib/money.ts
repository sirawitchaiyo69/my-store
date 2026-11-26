const baht = new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" });

// ราคามาจากคอลัมน์ numeric(10,2) ซึ่ง database ส่งมาเป็นข้อความ เช่น "190.00"
// ส่งข้อความเข้า Intl ตรง ๆ ไม่แปลงเป็น number ก่อน ตัวเลขจึงไม่ถูกปัดเพี้ยนระหว่างทาง
export function formatBaht(amount: string): string {
  return baht.format(amount as Intl.StringNumericLiteral);
}
