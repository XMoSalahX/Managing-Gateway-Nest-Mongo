import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindOneGatewayDto } from './dto/findOneGateway.dto';
import { CreateDeviceDto } from '../devices/dto/create-device.dto';
import { Types } from 'mongoose';
import { RemoveDeviceDto } from '../devices/dto/remove-device.dto';

@Controller('gateway')
@ApiTags('Gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post()
  async create(@Body() createGatewayDto: CreateGatewayDto) {
    return await this.gatewayService.create(createGatewayDto);
  }

  @Get()
  async findAllGateways() {
    return await this.gatewayService.findAllGateways();
  }

  @Get(':id')
  async findGatewayById(@Param() findOneGatewayDto: FindOneGatewayDto) {
    return await this.gatewayService.findGatewayById(new Types.ObjectId(findOneGatewayDto.id));
  }

  @Patch(':id')
  async addDeviceToGateway(@Param() findOneGatewayDto: FindOneGatewayDto, @Body() createDeviceDto: CreateDeviceDto) {
    return this.gatewayService.addDeviceToGateway(new Types.ObjectId(findOneGatewayDto.id), createDeviceDto);
  }

  @Delete('/devices')
  async removeDeviceFromGateway(@Query() removeDeviceDto: RemoveDeviceDto) {
    const { id, deviceId } = removeDeviceDto;

    return this.gatewayService.removeDeviceFromGateway(new Types.ObjectId(id), deviceId);
  }
}
