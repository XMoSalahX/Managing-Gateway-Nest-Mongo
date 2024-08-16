import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseAbstractRepository } from '../utils/base.abstract.repository';
import { Gateway, GatewayDocument } from './entities/gateway.entity';
import { CreateDeviceDto } from '../devices/dto/create-device.dto';
import { IGatewayValidation } from './interfaces/gatewayValidaion';

@Injectable()
export class GatewayRepository extends BaseAbstractRepository<Gateway> {
  constructor(
    @InjectModel(Gateway.name)
    private gatewayModel: Model<GatewayDocument>,
  ) {
    super(gatewayModel);
  }

  async validateGateway(gatewayId: Types.ObjectId, deviceDto: CreateDeviceDto): Promise<IGatewayValidation[]> {
    // validate if the gateway has more than 10 devices and all devices have unique UIDs
    return await this.gatewayModel.aggregate([
      {
        $match: {
          _id: gatewayId,
        },
      },

      {
        $project: {
          _id: 0,
          devices: {
            $filter: {
              input: '$devices',
              as: 'device',
              cond: { $eq: ['$$device.uid', deviceDto.uid] },
            },
          },

          isDeviceCountLessThanTen: { $lt: [{ $size: '$devices' }, 10] },
        },
      },
    ]);
  }

  async findOneAndUpdate(gatewayId: Types.ObjectId, deviceDto: CreateDeviceDto): Promise<Gateway> {
    return await this.gatewayModel.findOneAndUpdate(
      { _id: gatewayId },
      {
        $push: {
          devices: deviceDto,
        },
      },
      {
        new: true,
      },
    );
  }

  async findOneAndRemove(gatewayId: Types.ObjectId, deviceId: number): Promise<Gateway> {
    return await this.gatewayModel.findOneAndUpdate(
      { _id: gatewayId },
      {
        $pull: { devices: { uid: deviceId } },
      },
      {
        new: true,
      },
    );
  }
}
