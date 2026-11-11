import { Types } from "mongoose";

export interface IBrand{
    name:string,
    slug:string,
    logo:string,
    createdBy:Types.ObjectId,
    createdAt?:Date,
    updatedAt?:Date,
    deletedAt?:Date,
    restoredAt?:Date

}