
import {RedisClientType,createClient} from "redis"
import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { env } from '../../../config/env.service.js';


@Injectable()
export class RedisService  {
    private client:RedisClientType
    constructor(){
        this.client=createClient({
            url:env.redisUrl as string
        })
     this.handleConnection()
    //  this.client.flushDb()
    }

    async handleConnection(){ 
     try {
        await this.client.connect()
        console.log('Redis connected successfully'); 
     } catch (error) {
        console.log('redis connection error',error);        
     }
    }
    set =async({key,value,ttl}:{
        key:string,
        value:any,
        ttl?:number
    })=>{
        if (typeof value =='object') {
            value=JSON.stringify(value)
        }
    return ttl?  await this.client.set(key,value,{EX:ttl}) : await this.client.set(key,value)
}
    get =async(key:string)=>{
    return await this.client.get(key)
    }
    mGet=async(...keys:string[])=>{
        return this.client.mGet(keys)
    }
    del=async(key:string)=>{
        return await this.client.del(key)
    }
    ttl=async(key:string)=>{
        return await this.client.ttl(key)
    }
    creatRevokToken=({userID,token}:{
        userID:Types.ObjectId,
        token:string
    })=>{
        return `revokToken::${userID}:${token}`
    }
    key(userId:Types.ObjectId){
        return `user:sockets:${userId}`
    }
    async addSocket(userId:Types.ObjectId,socketId:string){
        return await this.client.sAdd(this.key(userId),socketId)
    }
    async removeSocket(userId:Types.ObjectId,socketId:string){
        return await this.client.sRem(this.key(userId),socketId)
    }
    async getSockets(userId:Types.ObjectId){
        return await this.client.sMembers(this.key(userId))
    }
    async hashSockets(userId:Types.ObjectId){
        return await this.client.sCard(this.key(userId))
    }
    async deletSocket(userId:Types.ObjectId){
        return await this.client.del(this.key(userId))
    }
    
}

