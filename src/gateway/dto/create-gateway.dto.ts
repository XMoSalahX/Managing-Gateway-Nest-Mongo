import { ArrayMaxSize, IsNotEmpty, IsString, Matches, ValidateNested } from 'class-validator';
import { CreateDeviceDto } from '../../devices/dto/create-device.dto';
import { Constants } from '../../utils/constants';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UniqueKeys } from '../decorators/uniqkeys';

export class CreateGatewayDto {
  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '192.168.1.1',
  })
  @Matches(Constants.regexIpv4, {
    message: 'Invalid IPv4 format',
  })
  ipv4: string;

  @ValidateNested({ each: true })
  @Type(() => CreateDeviceDto)
  @UniqueKeys({ message: 'Duplicate uids found in the keys array.' })
  @ArrayMaxSize(10)
  devices: CreateDeviceDto[];
}
