import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class MaterializedAlarmView {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  severity: string;

  @Prop()
  triggeredAt: Date;

  @Prop()
  isAcknowledged: boolean;

  @Prop({
    type: [
      {
        name: { type: String },
        type: { type: String },
      },
    ],
  })
  items: Array<{
    name: string;
    type: string;
  }>;
}

export const MaterializedAlarmViewSchema = SchemaFactory.createForClass(
  MaterializedAlarmView,
);
