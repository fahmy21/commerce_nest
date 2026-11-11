import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './module/auth/auth.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { tokenModule } from './common/service/token/token.module.js';
import { RedisService } from './common/service/redis/redis.service.js';

@Module({
   
  controllers: [AppController],
  providers: [AppService,RedisService],
  imports: [
    ConfigModule.forRoot({
      envFilePath:['.env.dev','.env.prod'],
      isGlobal:true
    }),
    MongooseModule.forRootAsync({
      inject:[ConfigService],
      useFactory:async (configService:ConfigService)=>({
        uri:configService.get<string>('DB_URL'),
        onConnectionCreate:(connection:Connection)=>{
          connection.on('connected',()=>console.log("data base is connected ")),
          connection.on("error",()=>console.log("error in connection dataBase"))
          return connection
        }

      })
    })

    
    ,AuthModule,tokenModule
  ],
  exports:[RedisService]
})
export class AppModule {}
