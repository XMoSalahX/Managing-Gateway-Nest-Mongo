import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Device, DeviceSchema } from '../../devices/entities/device.entity';

export type GatewayDocument = Gateway & Document;

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
export class Gateway {
  @Prop({ required: true, unique: true })
  serialNumber: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ipv4: string;

  @Prop({ required: true, type: [DeviceSchema], default: [] })
  devices: Device[];
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
