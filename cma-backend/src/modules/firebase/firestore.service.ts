import { Service } from "typedi";
import { doc, getDocs, collection, addDoc, updateDoc, getDoc, query, startAt, startAfter, limit, deleteDoc, getCountFromServer, orderBy, setDoc, where } from "firebase/firestore";
import { FirebaseAppService } from "./firebase.service";

@Service()
export class FiretoreService {
    private firebaseAppService: FirebaseAppService;
    constructor(firebaseAppService: FirebaseAppService) {
        this.firebaseAppService = firebaseAppService;
    }
    public getCollection(name: string) {
        return collection(this.firebaseAppService.getFirestore(), name);
    }
    public async create(collectionName: string, data: any) {
        const collection = this.getCollection(collectionName)
        const res = await setDoc(doc(collection, data.id), data);
        return res;
    }
    public async update(collectionName: string, id: string, data: any) {
        const collection = this.getCollection(collectionName)
        const res = await updateDoc(doc(collection, id), data);
        return res;
    }
    public async findById(collectionName: string, id: string) {
        const collection = this.getCollection(collectionName)
        const res = await getDoc(doc(collection, id));
        return res;
    }
    public async findOneBy(collectionName: string, opt: { filed: string, op: any, value: any }): Promise<any | null> {
        const collection = this.getCollection(collectionName)
        const q = query(collection, where(opt.filed, opt.op, opt.value));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return null;
        }
        const docSnap = querySnapshot.docs[0];
        return { id: docSnap.id, ...docSnap.data() };
    }
    public async findAllBy(collectionName: string,  opt: { filed: string, op: any, value: any }) {
        const collection = this.getCollection(collectionName)
        const queryZ = query(collection, orderBy('updatedAt'), where(opt.filed, opt.op, opt.value));
        const res = await getDocs(queryZ);
        return res;
    }

    public async delete(collectionName: string, data: any) {
        const collection = this.getCollection(collectionName)
        const res = await deleteDoc(doc(collection, data.id));
        return res;
    }
}