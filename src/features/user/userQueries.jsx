export const userDetailQuery = ({ auth, userUid }) => {
  if (userUid !== null) {
    return [
        // ถ้า userUid !== null ก็จะเกิด storeAs 2 ตัวคือ storeAsProfile/storeAsPhotos
      {
        collection: 'users',
        doc: userUid,

        storeAs: 'storeAsProfile'
      },
      {
        collection: 'users',
        doc: userUid,
        subcollections: [{ collection: 'photos' }],
        storeAs: 'storeAsPhotos'
      }
    ];
  } else {
    return [
      {
        collection: 'users',
        doc: auth.uid,
        subcollections: [{ collection: 'photos' }],
        storeAs: 'storeAsPhotos'
      }
    ];
  }

};

// func = ถ้า Uid(idเพื่อน) ไม่เท่ากับค่าว่าง ก็แสดงเป็นข้อมูลของเพื่อน แต่ถ้าเป็นค่าว่างก็ให้แสดงข้อมูลที่เป็นของเจ้าของ