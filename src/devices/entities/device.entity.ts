import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EnumsDevicesStatus } from '../enums/devices-status';

export type DeviceDocument = Device & Document;

@Schema({
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
    transform: (_, doc: Record<string, unknown>) => {
      delete doc.__v;
      delete doc._id;
      return {
        ...doc,
      };
    },
  },
})
export class Device {
  @Prop({ required: true, type: Number })
  uid: number;

  @Prop({ required: true, type: String })
  vendor: string;

  @Prop({ type: String, enum: Object.values(EnumsDevicesStatus) })
  status: EnumsDevicesStatus;

  @Prop({ required: true, type: Date })
  dateCreated: Date;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
