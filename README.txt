STEAMPILOT — เว็บช่วยค้นหาเกม Steam, เคลียร์เกมดอง และวางแผนซื้อช่วงลดราคา

ไฟล์
- index.html : โครงหน้าเว็บ
- style.css  : ธีมและ responsive layout
- script.js  : ตัวกรองเกม, รายการเกมส่วนตัว, watchlist, ปฏิทินและการสุ่มเลือก

วิธีเปิด
1. แตกไฟล์ ZIP
2. เปิด index.html ด้วย Chrome / Edge / Firefox
3. รายการเกมที่เพิ่มจะถูกเก็บไว้ใน localStorage ของเบราว์เซอร์เครื่องนี้

คุณสมบัติใน prototype
- ค้นหาและกรองเกมตามอารมณ์ เวลาเล่น งบ และประเภท
- เพิ่มเกมเข้า backlog / watchlist ด้วยตัวเอง
- สุ่มเลือกเกมจาก backlog
- ลิงก์ไปยังหน้าราคา/ข้อมูลของ SteamDB และเกมบน Steam
- ปฏิทินเทศกาลลดราคาที่ประกาศแล้ว
- Responsive สำหรับ desktop และมือถือ

หมายเหตุข้อมูลสำคัญ
- การ์ดเกมและราคาที่มีเครื่องหมาย * เป็นข้อมูลตัวอย่างสำหรับสาธิต UI ไม่ใช่ราคาสดและไม่ควรใช้ตัดสินใจซื้อ
- ปฏิทินอ้างอิงกำหนดการ Steamworks/SteamDB ณ วันที่ทำ prototype; ตรวจสอบอีกครั้งก่อนใช้งานจริง
- ตัวเว็บนี้ยังไม่ได้เชื่อม API หรือดึงข้อมูลสดจาก SteamDB เพราะยังต้องกำหนดวิธีเชื่อมต่อ/แหล่งข้อมูลที่อนุญาต และจัดการข้อจำกัด CORS/การใช้งานข้อมูล
- รายการเกมส่วนตัวเก็บใน browser localStorage ไม่ได้ซิงก์ข้ามเครื่อง และการล้างข้อมูลเว็บไซต์อาจลบรายการที่บันทึกไว้
- SteamPilot เป็นโปรเจกต์อิสระ ไม่ได้เกี่ยวข้องกับ Valve, Steam หรือ SteamDB

แนวทางพัฒนาต่อ
1. เชื่อม Steam Web API / แหล่งข้อมูลที่เหมาะสมเพื่อดึง library และ release data จริง
2. ระบบนำเข้า wishlist และเกมที่เป็นเจ้าของด้วย Steam ID (ไม่ขอรหัสผ่าน Steam)
3. price alert ผ่าน backend + email/Discord/notification
4. ปรับ personal recommendations ตาม tags, playtime, review sentiment และสิ่งที่ผู้ใช้กดไม่สนใจ
5. ให้ผู้ใช้เลือกเป้าหมาย “เล่นเกมเดิมให้จบก่อนซื้อใหม่” และสรุป backlog รายสัปดาห์

อ้างอิง:
https://steamdb.info/
https://steamdb.info/pricechanges/
https://steamdb.info/sales/history/
https://steamdb.info/upcoming/
https://steamdb.info/recentlyreleased/
https://partner.steamgames.com/doc/marketing/upcoming_events
