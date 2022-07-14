import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScrapimagesService } from './scrapimages.service';
import { SharpModule } from 'nestjs-sharp';
import { Scrap, ScrapSchema } from './scrap.schema';
//import {UrlGateway} from './url.gateway';

@Module({
  imports: [SharpModule,
    MongooseModule.forFeature([{ name: Scrap.name, schema: ScrapSchema }]),],
  controllers: [],
  providers: [ScrapimagesService],
  exports: [ScrapimagesService]

})
export class ScrapimagesModule { }
