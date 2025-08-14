import { Service } from "typedi";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getDatabase } from "firebase/database";

@Service()
export class FirebaseAppService {
    private firebaseApp: FirebaseApp ;
    constructor() {
        this.firebaseApp = initializeApp({
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
            measurementId: process.env.FIREBASE_MEASUREMENT_ID
        })
    }
    public getFirestore() {
        return getFirestore(this.firebaseApp);
    }
    public getRealtimeDB() {
        return getDatabase(this.firebaseApp);
    }
}