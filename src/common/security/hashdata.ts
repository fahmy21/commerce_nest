import bcrypt from "bcrypt"
import { env } from "../../config/env.service.js"



export const hashData =async(data:string):
 Promise<string> =>{
    return bcrypt.hash(data,Number(env.saltRound))
}
export const verifyData =async(plainText:string,sypherTexr:string)
:Promise<boolean> =>{
    return await bcrypt.compare(plainText,sypherTexr)

}