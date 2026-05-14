import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PublicationDocument = HydratedDocument<Publication>;

@Schema({
  timestamps: true,
})
export class Publication {
  @Prop({
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    required: true,
    trim: true,
  })
  description: string;

  @Prop({
    required: true,
    trim: true,
  })
  author: string;

  @Prop({
    default: true,
  })
  status: boolean;
}

export const PublicationSchema =
  SchemaFactory.createForClass(Publication);