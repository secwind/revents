const object1 = {
    a: 1,
    b: 2,
    c: 3
  };
  
  const constA = {
    aa: 11,
    bb: 22,
    cc: 33
  }
  
  const constB = {
    aa: 123456789,
    ee: 44,
    zz: 26
  }
  
  const constC = {
    aa: 'last',
    uu: 'love'
  }
  
  
  const object2 = Object.assign({c: 4, d: 5}, object1);
  
  // แปลว่า ข้อมูล constC เป็นหลัก และ constB เป็นรอง และ constA ตั้งต้น เป็นการ push ข้อมูลด้วย key จะไม่ซ้ำกันเลย โดยยึด ตัวท้ายเป็นหลัก และถ้ามี Object.assign(constA, xxx) แล้ว การ value constA ก็จะเปลี่ยนไปในทันที
  Object.assign(constA, constB, constC);
  
  console.log(object2.c, object2.d);
  console.log(constA);
  console.log(constC);

  // ผลจาก console.log
// > 3 5
// > Object { aa: "last", bb: 22, cc: 33, ee: 44, zz: 26, uu: "love" }
// > Object { aa: "last", uu: "love" }