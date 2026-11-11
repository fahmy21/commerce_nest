import { Types } from "mongoose";
import { genderEnum, providerEnum, roleEnum } from '../enums/user.enums.js'

export interface IUser{
    Name:string,
    email:string,
    password?:string,
    phone?:string,
    confirmEmail:boolean,
    gender:genderEnum,
    provider:providerEnum,
    role:roleEnum
}
