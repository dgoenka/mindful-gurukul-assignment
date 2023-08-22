import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true })
  phone: string;

  @Prop()
  password: string;

  @Prop()
  gender: "Male" | "Female" | "Other";

  @Prop()
  how_hear: "LinkedIn" | "Friends" | "Job Portal" | "Others";

  @Prop()
  how_hear_other: string;

  @Prop()
  country: string;

  @Prop()
  state: string;

  @Prop()
  city: string;
}
