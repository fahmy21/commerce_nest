import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { transformInterceptor } from './common/interceptor/transform.interceptor.js';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { });
  app.useGlobalInterceptors(new transformInterceptor)
  await app.listen(process.env.PORT ?? 3000,()=>{
    console.log(`sever is running as port : ${process.env.PORT}` );
    
  });
}
await bootstrap();
