import { Prop, Schema } from "@nestjs/mongoose";


@Schema()
export class Brand{
    @Prop({type:String,required:true,unique:true})
    name:string

    @Prop()
    slug:string
}