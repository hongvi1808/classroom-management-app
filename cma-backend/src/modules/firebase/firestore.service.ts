import 'reflect-metadata';
import Container, { Service } from "typedi";
import { doc, getDocs, collection, updateDoc, getDoc, query,  deleteDoc,  setDoc, where } from "firebase/firestore";
import { FirebaseAppService } from "./firebase.service";

@Service()
export class FirestoreService {
    private firebaseService: FirebaseAppService
    constructor() {
        this.firebaseService = Container.get(FirebaseAppService)
    }
    public getCollection(name: string) {
        return collection(this.firebaseService.getStore(), name);
    }
    public async create(collectionName: string, data: any) {
        try {
            const collection = this.getCollection(collectionName)
            const res = await setDoc(doc(collection, data.id), data);
            return res;

        } catch (error) {
            console.error('Error creating document:', error);
            throw error;
        }
    }
    public async update(collectionName: string, id: string, data: any) {
        try {
            const collection = this.getCollection(collectionName)
            const res = await updateDoc(doc(collection, id), data);
            return res;

        } catch (error) {
            console.error('Error updating document:', error);
            throw error;

        }
    }
    public async findById(collectionName: string, id: string) {
        try {
            const collection = this.getCollection(collectionName)
            const res = await getDoc(doc(collection, id));
            return res;

        } catch (error) {
            console.error('Error finding by id document:', error);
            throw error;
        }
    }
    public async findOneBy(collectionName: string, opt: { filed: string, op: any, value: any }): Promise<any | null> {
        try {
            const collection = this.getCollection(collectionName)
            const q = query(collection, where(opt.filed, opt.op, opt.value));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                return null;
            }
            const docSnap = querySnapshot.docs[0];
            return { id: docSnap.id, ...docSnap.data() };
        } catch (error) {
            console.error('Error finding one by document:', error);
            throw error;
        }

    }
    public async findAllBy(collectionName: string, opt: { filed: string, op: any, value: any }) {
        try {
            const collection = this.getCollection(collectionName)
            const queryZ = query(collection, where(opt.filed, opt.op, opt.value),  where('alive', '==', true));
            const res = await getDocs(queryZ);
            return res;

        } catch (error) {
            console.error('Error finding all by document:', error);
            throw error;

        }
    }

    public async delete(collectionName: string, data: any) {
        try {
            const collection = this.getCollection(collectionName)
            const res = await deleteDoc(doc(collection, data.id));
            return res;

        } catch (error) {
            console.error('Error deleting document:', error);
            throw error;
        }
    }
}