import admin from 'firebase-admin'
import { getApps } from 'firebase-admin/app'


const serviceAccount = JSON.parse(
    process.env.services_key as string
)

if(!getApps().length){
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
}

const Admindb = admin.firestore();

export { Admindb }