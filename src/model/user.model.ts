import { genderEnum } from '../common/enums/user.enums.js';
import { hashData } from '../common/security/hashdata.js';
import { IUser } from './../common/interFace/user.inerface.js';
import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps:true,
   toJSON:{ virtuals:true},
    toObject:{ virtuals:true}
})
export class User {
       userName:string
         @Prop({
        type:String,
        minLength:2,
        maxLength:20,
        trim:true
    })
       firstName:string
         @Prop({
        type:String,
        minLength:2,
        maxLength:20,
        trim:true
    })
       lastName:string
       @Prop({
        type:String,
        required:true,
        unique:true,
        trim:true
       })
        email:string
        @Prop({
            type:String,
            required:true
        })
        password:string
        @Prop({
            type:String,

        })
        phone:string
        @Prop({
            type:Boolean,
            default:false
        })
        confirmEmail:boolean
        @Prop({
            type:String,
            enum:{
                values:Object.values(genderEnum),
                message:'{VALUE} is not a valid gender'
            },
            default:genderEnum.Male
        })
        gender:string
        @Prop({
                    type:Number,
                    enum:{
                        values:Object.values(genderEnum),
                        message:'{VALUE} is not a valid gender'
                    },
                    default:genderEnum.Male
                })
        role:number

}
const userSchema=SchemaFactory.createForClass(User)
userSchema.pre("save",async function(){
    if (this.isModified("password")) {
        this.password=await hashData(this.password)
    }
})
userSchema.virtual('userName').get(function(this:any){
    return this.firstName + '-' +this.lastName
}).set(function(this:any,value:string){
   let [firstName,lastName]=value.split(' ')
   this.firstName=firstName
   this.lastName=lastName
})
const userModel=MongooseModule.forFeature([{name:User.name,schema:userSchema}])