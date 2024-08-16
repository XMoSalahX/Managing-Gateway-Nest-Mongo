import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class RemoveDeviceDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  deviceId: number;
}
