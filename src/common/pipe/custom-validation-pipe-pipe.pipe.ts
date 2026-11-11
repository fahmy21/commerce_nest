import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { error } from 'console';
import { ZodType } from 'zod';
@Injectable()
export class CustomValidationPipePipePipe implements PipeTransform {
  constructor(private sckema:ZodType){

  }
  transform(value: any, metadata: ArgumentMetadata) {
    const result=this.sckema.safeParse(value)
    let validationError=[]
    if (!result.success) {
      validationError.push({
        error:value.error,
        issue:value.error.issues
      }
    )
     throw new BadRequestException('Validation failed',{cause:validationError})
    } 
    return value;
  }
}
