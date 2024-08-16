import { Test, TestingModule } from '@nestjs/testing';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { Types } from 'mongoose';
import { FindOneGatewayDto } from './dto/findOneGateway.dto';
import { RemoveDeviceDto } from '../devices/dto/remove-device.dto';
import { CreateDeviceDto } from '../devices/dto/create-device.dto';

const gatWayDocumnet = {
  ipv4: '192.168.1.1',
  serialNumber: '099024',
  name: 'string',
  _id: '123',
  devices: [
    {
      status: 'ONLINE',
      uid: 0,
      vendor: 'string',
      dateCreated: new Date('2024-08-15T02:29:35.478+00:00'),
      _id: '123',
    },
  ],
};

const CreateMockGateWayData = {
  create: jest.fn().mockResolvedValue(gatWayDocumnet),
  findAllGateways: jest.fn().mockResolvedValue([gatWayDocumnet]),
  findGatewayById: jest.fn().mockResolvedValue(gatWayDocumnet),
  addDeviceToGateway: jest.fn().mockResolvedValue(gatWayDocumnet),
  removeDeviceFromGateway: jest.fn().mockResolvedValue(gatWayDocumnet),
};

describe('GatewayController', () => {
  let controller: GatewayController;
  let gatewayService: GatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatewayController],
      providers: [GatewayService],
    })
      .overrideProvider(GatewayService)
      .useValue(CreateMockGateWayData)
      .compile();

    controller = module.get<GatewayController>(GatewayController);
    gatewayService = module.get<GatewayService>(GatewayService);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  it('Should be create GateWay', async () => {
    const createGatewayDto: CreateGatewayDto = {
      ipv4: '192.168.1.1',
      serialNumber: '099024',
      name: 'string',
      devices: [
        {
          status: 'ONLINE',
          uid: 0,
          vendor: 'string',
          dateCreated: new Date('2024-08-15T02:29:35.478+00:00'),
        },
      ],
    };

    const result = await controller.create(createGatewayDto);

    expect(result).toEqual(gatWayDocumnet);

    expect(gatewayService.create).toHaveBeenCalledWith(createGatewayDto);
  });

  it('Should be get all GateWay', async () => {
    const result = await controller.findAllGateways();

    expect(result).toEqual([gatWayDocumnet]);

    expect(gatewayService.findAllGateways).toHaveBeenCalled();
  });

  it('Should be get one GateWay', async () => {
    const dto: FindOneGatewayDto = {
      id: '66bd6dd9db7c12dbed863b6c',
    };

    const result = await controller.findGatewayById(dto);

    expect(result).toEqual(gatWayDocumnet);

    expect(gatewayService.findGatewayById).toHaveBeenCalledWith(new Types.ObjectId(dto.id));
  });

  it('Should be add device to GateWay', async () => {
    const findOneGatewayDto: FindOneGatewayDto = {
      id: '66bd6dd9db7c12dbed863b6c',
    };

    const createDeviceDto: CreateDeviceDto = {
      status: 'ONLINE',
      uid: 0,
      vendor: 'string',
      dateCreated: new Date('2024-08-15T02:29:35.478+00:00'),
    };

    const result = await controller.addDeviceToGateway(findOneGatewayDto, createDeviceDto);

    expect(result).toEqual(gatWayDocumnet);

    expect(gatewayService.addDeviceToGateway).toHaveBeenCalledWith(
      new Types.ObjectId(findOneGatewayDto.id),
      createDeviceDto,
    );
  });

  it('Should be remove device from GateWay', async () => {
    const removeDeviceDto: RemoveDeviceDto = {
      id: '66bd6dd9db7c12dbed863b6c',
      deviceId: 1,
    };

    const result = await controller.removeDeviceFromGateway(removeDeviceDto);

    expect(result).toEqual(gatWayDocumnet);

    expect(gatewayService.removeDeviceFromGateway).toHaveBeenCalledWith(
      new Types.ObjectId(removeDeviceDto.id),
      removeDeviceDto.deviceId,
    );
  });
});
