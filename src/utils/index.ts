import bcrypt from "bcrypt";

export async function hash(param :string) {
    return await bcrypt.hash(param, 12);
}

export async function verifyHash(param :string, hashedPram:string) {
    return await bcrypt.compare(param, hashedPram);
}
