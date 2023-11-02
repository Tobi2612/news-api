import crypto from "crypto";
import logger from "../utils/logger";

if (!process.env.ENCRYPTION_KEY) {
    logger.error("process.env.ENCRYPTION_KEY is not defined");
}

if (!process.env.ENCRYPTION_ALGORITHM) {
    logger.error("process.env.ENCRYPTION_ALGORITHM is not defined");
}

class Encryption {
        private secret = process.env.ENCRYPTION_KEY;
        private algorithm = process.env.ENCRYPTION_ALGORITHM; //Using AES encryption
        private ivLength = 16;
        private saltLength = 32;
        private pbkdf2Iterations = 100000;

        private encryptedPosition = this.saltLength + this.ivLength;

        private getKey(salt:Buffer) {
            return crypto.pbkdf2Sync(this.secret as string, salt, this.pbkdf2Iterations, 32, "sha512");
        }

        private isObject(value:any) {
            return Object.prototype.toString.call(value) === "[object Object]";
        }

        private turnObjectToString(value:any) {
            return JSON.stringify(value);
        }

        private turnStringToObject(value:string) {
            return JSON.parse(value);
        }

        public encrypt(value:any):string {
            if (value == null) {
                throw new Error("value must not be null or undefined");
            }

            if (!this.isObject(value)) {
                throw new Error("Only objects can be encrypted");
            }

            const stringValue = this.turnObjectToString(value);

            const iv = crypto.randomBytes(this.ivLength);
            const salt = crypto.randomBytes(this.saltLength);

            const key = this.getKey(salt);

            const cipher = crypto.createCipheriv(this.algorithm as string, key, iv);
            const encrypted = Buffer.concat([cipher.update(stringValue, "utf8"), cipher.final()]);

            return Buffer.concat([salt, iv, encrypted]).toString("hex");
        };

        decrypt(value :any) {
            if (value == null) {
                throw new Error("value must not be null or undefined");
            }

            const stringValue = Buffer.from(String(value), "hex");

            const salt = stringValue.slice(0, this.saltLength);
            const iv = stringValue.slice(this.saltLength, this.encryptedPosition);
            const encrypted = stringValue.slice(this.encryptedPosition);

            const key = this.getKey(salt);

            const decipher = crypto.createDecipheriv(this.algorithm as string, key, iv);

            const decipherValue = decipher.update(encrypted) + decipher.final("utf8");

            return this.turnStringToObject(decipherValue);
        };
    
    
}

export default new Encryption();

