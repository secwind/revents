const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});


const newActivity = (type, event, id) => {
    return {
        type: type,
        eventDate: event.date,
        hostedBy: event.hostedBy,
        title: event.title,
        photoURL: event.hostphotoURL,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        hostUid: event.hostUid,
        eventId: id
    }
}


//functions.firestore.document('events/{eventId}').onCreate คือการตรวจจับ func onCreate โดย document('events/{eventId}') คือ Collection 'events' และ /{eventId} แปลว่า Doc id  ถ้ามี ('events/{eventId}/number') แปลว่า ให้ตรวจจับ func onCreate Collection 'events' และidที่สร้างใน ในข้อมูลของ number
exports.createActivity = functions.firestore.document('events/{eventId}')
    .onCreate(event => {
        let newEvent = event.data();

        console.log(newEvent);

        const activity = newActivity('newEvent', newEvent, event.id)

        console.log(activity)

        return admin.firestore().collection('activity')
            .add(activity)
            .then((docRef) => {
                return console.log('Activety created with ID: ', docRef.id);
            })
            .catch((err) => {
                return console.log('Error activety', err);
            })
    })

exports.cancelActivity = functions.firestore.document('events/{eventId}')
    .onUpdate((event, context) => {
        let updatedEvent = event.after.data()
        let previousEventData = event.before.data()
        console.log(event)
        console.log(context)
        console.log(updatedEvent)
        console.log(previousEventData)

        if (!updatedEvent.cancelled || updatedEvent.cancelled === previousEventData.cancelled) return false


        //  newActivity = func send     type ,   data.  id
        const activity = newActivity('cancelledEvent', updatedEvent, context.params.eventId)

        console.log({
            activity
        })

        return admin.firestore().collection('activity')
            .add(activity)
            .then((docRef) => {
                return console.log('Activety created with ID: ', docRef.id);
            })
            .catch((err) => {
                return console.log('Error activety', err);
            })

    })



// นำพารามิเตอร์ที่ส่งเขามาที่ HTTP endpoint ไป Insert เข้าไปใน 
// Realtime Database ที่ path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
    // รับค่า text พารามิเตอร์ที่ส่งเข้ามา
    const original = req.query.text;
    const id = req.query.id;
    // insert เข้าไปใน Realtime Database แล้วส่ง response
        return admin.database().ref('/messages').push({
        original: original,
        idName: id
    }).then(snapshot => {
        // รีไดเรค (ด้วย code 303)ไปที่ url ของ Firebase console เพื่อดูข้อมูลที่เพิ่มเข้าไป
        return res.redirect(303, snapshot.ref);
    });
    // url คือ https://us-central1-revents-3aac5.cloudfunctions.net/addMessage
    // url ทำ req https://us-central1-revents-3aac5.cloudfunctions.net/addMessage?text=uppercaseme
});


// ถ้ามี(Listener) onCreate หรือ การสร้างข้อมูลใหม่บน RTD ให้เกิด func makeUppercase
exports.makeUppercase = functions.database.ref('/messages/{dataId}/idName')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val();
      console.log('Uppercasing', context.params.dataId, original);

      //สร้างตัวแปร uppercase เท่ากับ ข้อมูลของ '/messages/{pushId}/idName' กลายเป็นตัวใหญ่ทั้งหมด
      const uppercase = original.toUpperCase();

      //return ข้อมูล ให้สร้าง upperData: -- uppercase -> ข้อมูลของ idName ที่กลายเป็นตัวใหญ่ทั้งหมด
      return snapshot.ref.parent.child('upperData').set(uppercase);
    });