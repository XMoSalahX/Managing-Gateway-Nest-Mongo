import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { Gateway } from './entities/gateway.entity';
import { GatewayRepository } from './gateway.repository';
import { Types } from 'mongoose';
import { CreateDeviceDto } from '../devices/dto/create-device.dto';

@Injectable()
export class GatewayService {
  constructor(private readonly gatewayRepos: GatewayRepository) {}

  async create(createGatewayDto: CreateGatewayDto): Promise<Gateway> {
    try {
      return await this.gatewayRepos.create(createGatewayDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Serial number must be unique');
      } else {
        throw error;
      }
    }
  }

  async findAllGateways(): Promise<Gateway[]> {
    return await this.gatewayRepos.find();
  }

  async findGatewayById(id: Types.ObjectId): Promise<Gateway> {
    return await this.gatewayRepos.findOne({ _id: id });
  }

  async addDeviceToGateway(gatewayId: Types.ObjectId, deviceDto: CreateDeviceDto): Promise<Gateway> {
    // validate if the gateway has more than 10 devices and all devices have unique UIDs and if gateway exists

    const gatewayValidaion = (await this.gatewayRepos.validateGateway(gatewayId, deviceDto))[0];

    if (!gatewayValidaion) {
      throw new BadRequestException('Gateway not found');
    }

    if (gatewayValidaion.devices.length > 0) {
      throw new BadRequestException('Device UID must be unique');
    }

    if (!gatewayValidaion.isDeviceCountLessThanTen) {
      throw new BadRequestException('Gateway can not have more than 10 devices');
    }

    return await this.gatewayRepos.findOneAndUpdate(gatewayId, deviceDto);
  }

  async removeDeviceFromGateway(gatewayId: Types.ObjectId, deviceId: number): Promise<Gateway> {
    const gateway = await this.gatewayRepos.findOneAndRemove(gatewayId, deviceId);

    if (!gateway) {
      throw new BadRequestException('Gateway not found');
    }

    return gateway;
  }
}
