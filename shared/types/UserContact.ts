import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class UserContact {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  ownerUserId: string;
}
