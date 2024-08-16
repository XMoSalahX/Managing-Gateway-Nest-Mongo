import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { EnumsDevicesStatus } from '../enums/devices-status';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
  @IsNumber()
  uid: number;

  @IsString()
  vendor: string;

  @IsDate()
  dateCreated: Date;

  @ApiProperty({
    example: 'ONLINE',
  })
  @IsEnum([EnumsDevicesStatus.ONLINE, EnumsDevicesStatus.OFFLINE])
  status: string;
}
