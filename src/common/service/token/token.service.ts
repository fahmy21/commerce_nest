
import { BadRequestException, Injectable } from "@nestjs/common"
import jwt, { JwtHeader, JwtPayload } from "jsonwebtoken"
import { env } from "../../../config/env.service.js"

@Injectable()
export class TokenService {
    constructor(){
    }
     generateToken(user:any){
        if(!user) throw new BadRequestException("payload is not found")
        let signature
        let refreshSignature
        let aud
        switch (user.role) {
            case 0:
                signature=env.adminSignature
                refreshSignature=env.RefreshAdminToken  
                aud='0'
                break;
        
            default:
                signature=env.userSignature
                refreshSignature=env.refreshUserToken
                aud='1'
                break;
        }
        let accessToken= jwt.sign({id:user._id},signature as string,{
            audience:aud,
            expiresIn:"1y"
        })
        let refreshToken = jwt.sign({id:user._id},refreshSignature as string,{
            audience:aud,
            expiresIn:"1y"
        })
        return {accessToken,refreshToken}
    }
     decodeToken(token:string){
        try {
         let decoded = jwt.decode(token) as JwtPayload
         if(!decoded) throw new BadRequestException('toke is not valid')
         let signature
         switch (decoded.aud) {
            case "0":
                signature=env.adminSignature
                break;
            default:
                signature=env.userSignature
                break;
         }
         let decodeData= jwt.verify(token,signature as string)
         return decodeData          
        } catch (error) {
            throw new BadRequestException('token is not valid or expire',{cause:error})
        }
    }

      decodeRefreshToken(token:string){
        try {
         let decoded = jwt.decode(token) as JwtPayload
         if(!decoded) throw new BadRequestException('toke is not valid')
         let refreshSignature
         switch (decoded.aud) {
            case "0":
                refreshSignature=env.RefreshAdminToken
                break;
            default:
                refreshSignature=env.refreshUserToken
                break;
         }
         let decodeData= jwt.verify(token,refreshSignature as string)
         return decodeData          
        } catch (error) {
            throw new BadRequestException('token is not decoded',{cause:error})
        }
    }
     generateAccessToken(refreshToken:string){
      try {
        let[flag,token]=refreshToken.split(' ')        
         let decoded = jwt.decode(token as string) as JwtPayload
         if(!decoded) throw new BadRequestException('toke is not valid')
         let Signature
         switch (decoded.aud) {
            case "0":
                Signature=env.adminSignature
                break;
            default:
                Signature=env.userSignature
                break;
         }
         let accessToken = jwt.sign({id:decoded.id},Signature as string,{
            audience:decoded.aud,
            expiresIn:"30min"
         })
         return accessToken          
        } catch (error) {
            throw new BadRequestException('token is not decoded',{cause:error})
        }
    }
    

}
