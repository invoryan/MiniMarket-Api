import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvValidationConfig } from './config/env.validation';
import { TypeOrmConfig } from './config/typeorm.config';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal:true,
      validationOptions: EnvValidationConfig
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: TypeOrmConfig
    }),
    UserModule
  ],
})
export class AppModule {}
