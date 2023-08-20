import { Document } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import { User } from 'shared';
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
