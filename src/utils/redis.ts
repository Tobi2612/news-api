import { setKey, getByKey, deleteKey } from "../config/redis";

export async function setValue(key:string, value:any, validity:number) {
    await setKey(key, value);

    return true;
}

export async function getValue(key:string) {
    return await getByKey(key);
}

export async function deleteValue(key:string) {
    await deleteKey(key);

    return true;
}

