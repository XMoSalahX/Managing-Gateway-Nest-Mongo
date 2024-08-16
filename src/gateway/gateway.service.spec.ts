import { Test, TestingModule } from '@nestjs/testing';
import { GatewayService } from './gateway.service';
import { GatewayRepository } from './gateway.repository';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { BadRequestException } from '@nestjs/common';
import { FindOneGatewayDto } from './dto/findOneGateway.dto';
import { Types } from 'mongoose';

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

const mockData = {
  create: jest.fn(() => gatWayDocumnet),
  find: jest.fn(() => [gatWayDocumnet]),
  findOne: jest.fn(() => gatWayDocumnet),
  validateGateway: jest.fn(() => [gatWayDocumnet]),
  findOneAndUpdate: jest.fn(() => gatWayDocumnet),
  findOneAndRemove: jest.fn(() => gatWayDocumnet),
};

const mockGatewayRepository = {
  create: jest.fn().mockResolvedValue(gatWayDocumnet),
  find: jest.fn().mockResolvedValue([gatWayDocumnet]),
  findOne: jest.fn().mockResolvedValue(gatWayDocumnet),
  validateGateway: jest.fn().mockResolvedValue(gatWayDocumnet),
  findOneAndUpdate: jest.fn().mockResolvedValue(gatWayDocumnet),
  findOneAndRemove: jest.fn().mockResolvedValue(gatWayDocumnet),
};

describe('GatewayService', () => {
  let service: GatewayService;
  let gatewayRepository: GatewayRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GatewayService, { provide: GatewayRepository, useValue: mockGatewayRepository }],
    }).compile();

    service = module.get<GatewayService>(GatewayService);
    gatewayRepository = module.get<GatewayRepository>(GatewayRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(gatewayRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new gateway', async () => {
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

      expect(await service.create(createGatewayDto)).toEqual(gatWayDocumnet);
    });

    it('should throw BadRequestException if serial number is not unique', async () => {
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

      mockGatewayRepository.create.mockRejectedValue({ code: 11000 });

      expect(service.create(createGatewayDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAllGateways', () => {
    it('should return all gateways', async () => {
      expect(await service.findAllGateways()).toEqual([gatWayDocumnet]);
    });
  });

  describe('findGatewayById', () => {
    it('should return a gateway by id', async () => {
      const findOneGatewayDto: FindOneGatewayDto = {
        id: '66bd6dd9db7c12dbed863b6c',
      };
      expect(await service.findGatewayById(new Types.ObjectId(findOneGatewayDto.id))).toEqual(gatWayDocumnet);
    });
  });

  describe('addDeviceToGateway', () => {
    it('should add a device to the gateway', async () => {
      const gatewayId = new Types.ObjectId('66bd6dd9db7c12dbed863b6c');
      const deviceDto = {
        status: 'ONLINE',
        uid: 0,
        vendor: 'string',
        dateCreated: new Date('2024-08-15T02:29:35.478+00:00'),
      };

      jest
        .spyOn(gatewayRepository, 'validateGateway')
        .mockResolvedValue([{ devices: [], isDeviceCountLessThanTen: true }]);

      const result = await service.addDeviceToGateway(gatewayId, deviceDto);

      expect(result).toEqual(gatWayDocumnet);
    });

    it('should throw BadRequestException if gateway has more than 10 devices', async () => {
      const gatewayId = new Types.ObjectId('66bd6dd9db7c12dbed863b6c');
      const deviceDto = {
        status: 'ONLINE',
        uid: 0,
        vendor: 'string',
        dateCreated: new Date('2024-08-15T02:29:35.478+00:00'),
      };

      jest
        .spyOn(gatewayRepository, 'validateGateway')
        .mockResolvedValue([{ devices: [], isDeviceCountLessThanTen: false }]);

      await expect(service.addDeviceToGateway(gatewayId, deviceDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('removeDeviceFromGateway', () => {
    it('should remove the device from the gateway', async () => {
      const gatewayId = new Types.ObjectId();
      const deviceId = 1;

      expect(await service.removeDeviceFromGateway(gatewayId, deviceId)).toEqual(gatWayDocumnet);
    });

    it('should throw BadRequestException if gateway is not found', async () => {
      const gatewayId = new Types.ObjectId();
      const deviceId = 1;

      jest.spyOn(gatewayRepository, 'findOneAndRemove').mockResolvedValue(null);

      await expect(service.removeDeviceFromGateway(gatewayId, deviceId)).rejects.toThrow(BadRequestException);
    });
  });
});
