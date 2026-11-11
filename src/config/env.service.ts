import dotenv from "dotenv"
import path from "node:path"


dotenv.config({path:['.env.dev','.env.prod']})

// const env_mood=process.env.ENV_MOOD


// const googleEmail =process.env.GOOGLE_ACOUNCT_EMAIL
// const googleAppPassword= process.env.GOOGLE_APP_PASSWORD
// const serverUrl=process.env.SERVER_URL

// const client_Id=process.env.CLIENT_ID

// const accessKey_AWS=process.env.ACCESS_KEY_AWS
// const secret_AccessKey_AWS=process.env.SECRET_ACCESS_KEY_AWS
// const AWS_Bucket_Name=process.env.AWS_BUCKET_NAME
export const env ={
    get port(){
        return process.env.PORT || 3000
    },
    get dataBaseUrl(){
        return process.env.DATABASEURL as string
    },
    get userSignature(){
        return process.env.USER_SIGNATURE as string
    },
    get adminSignature(){
       return process.env.ADMIN_SIGNATURE as string
    },
    get refreshUserToken(){
       return process.env.REFRESH_USER_TOKEN as string
    },
    get RefreshAdminToken(){
       return process.env.REFRESH_ADMIN_TOKEN as string
    },
    get redisUrl(){
        return process.env.REDIS_URL as string
    },
    get saltRound (){
        return process.env.SALTROUND as string
    },
    get cloud_name(){
        return process.env.CLOUD_NAME as string
    },
    get api_key(){
        return process.env.API_KET  as string
    },
    get api_secret(){
        return process.env.API_SECRET  as string
    }

}