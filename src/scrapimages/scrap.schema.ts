import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()

export class Scrap extends Document {

  @Prop()
  domain: string;

  @Prop()
  url: string;

}

export const ScrapSchema = SchemaFactory.createForClass(Scrap);

