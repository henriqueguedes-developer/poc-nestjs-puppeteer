import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapimagesModule } from './scrapimages/scrapimages.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import envConfig from './env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get('mongoUrl'),
      }),
      inject: [ConfigService],
    }),
    ScrapimagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
