import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  gender: 'Male' | 'Female' | 'Other';

  @Prop()
  how_hear: 'LinkedIn' | 'Friends' | 'Job Portal' | 'Others';

  @Prop()
  how_hear_other: string;

  @Prop()
  country: string;

  @Prop()
  state: string;

  @Prop()
  city: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
