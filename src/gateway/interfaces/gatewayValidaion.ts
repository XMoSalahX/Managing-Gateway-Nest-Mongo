import { Device } from '../../devices/entities/device.entity';

export interface IGatewayValidation {
  devices: Device[];
  isDeviceCountLessThanTen: boolean;
}
