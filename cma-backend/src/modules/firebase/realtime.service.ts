import 'reflect-metadata';
import Container, { Service } from "typedi";
import { FirebaseAppService } from "./firebase.service";
import { child, equalTo, get, off, onValue, orderByChild, push, query, ref, remove, set, update } from 'firebase/database';

@Service()
export class RealtimeDBService {
    private firebaseService: FirebaseAppService
    constructor() {
        this.firebaseService = Container.get(FirebaseAppService)
    }
    public getRef(name: string) {
        return ref(this.firebaseService.getRealtimeDB(), name);
    }
    public async findAllBy(refName: string, opt: { filed: string, value: any }) {
        try {
            const reference = this.getRef(refName)
            const queryZ = query(reference, orderByChild(opt.filed), equalTo(opt.value));
            const snapshot = await get(queryZ);
            const data = snapshot.val() || {};
            return Object.keys(data).map((key) => ({ id: key, ...data[key] }));

        } catch (error) {
            console.error('Error finding all by document:', error);
            throw error;
        }
    }
    public async findById(refName: string, id: string) {
        try {
            const reference = this.getRef(`${refName}/${id}`)
            // const queryZ = query(reference, orderByChild(opt.filed), equalTo(opt.value));
            const snapshot = await get(reference);
            if (snapshot.exists()) return snapshot.val()
            return null

        } catch (error) {
            console.error('Error finding all by document:', error);
            throw error;
        }
    }
    public async create(refName: string, data: any, id?: string) {
        try {
            let reference;
            if (id) reference = this.getRef(`${refName}/${id}`)
            else reference = push(this.getRef(refName),)
            await set(reference, data);
            return reference.key!;

        } catch (error) {
            console.error('Error creating document:', error);
            throw error;
        }
    }
    public async update(refName: string, id: string, data: any) {
        try {
            const reference = this.getRef(`${refName}/${id}`)
            await update(reference, data);
            return reference.key;

        } catch (error) {
            console.error('Error updating document:', error);
            throw error;

        }
    }
    public async delete(refName: string, id: string) {
        try {
            const reference = this.getRef(`${refName}/${id}`)
            await remove(reference);
            return reference.key;

        } catch (error) {
            console.error('Error deleting document:', error);
            throw error;
        }
    }
    public subcriber(refName: string, callback: (data: any) => void) {
        try {
            const reference = this.getRef(refName)
            const listener = onValue(reference, (snapshot) => {
                const newData = snapshot.val() || {}
                const res = Object.keys(newData).map((key) => ({ id: key, ...newData[key] }));
                callback(res)
            })
            return () => off(reference, "value", listener);

        } catch (error) {
            console.error('Error deleting document:', error);
            throw error;
        }
    }

}