import { transformInterceptor } from './../../common/interceptor/transform.interceptor.js';
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from '../../common/utils/multer.utils.js';
import { MulterEnums } from '../../common/enums/multer.enums.js';
import { AuthGuard } from '../../common/auth/auth.guard.js';
import { checkRoleGuard } from '../../common/auth/chekrole.guard.js';
import { Roles } from '../../common/decorators/roles.decorators.js';

// UseInterceptors(LoggingInterceptor)

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('add-image')
  @UseGuards(AuthGuard,checkRoleGuard)
  @Roles(1)
  @UseInterceptors(
    FileInterceptor('image',multerOption({storageKey:MulterEnums.diskStorage})))
  create(@UploadedFile() file:Express.Multer.File ) {
    return file;
  }

  @Get()
  @HttpCode(201)
  // @UseInterceptors(transformInterceptor)
  findAll() {
    return {
      message:"server is ok"
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body:any) {
    return this.authService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
