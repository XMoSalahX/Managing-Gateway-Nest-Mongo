import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreateDeviceDto } from '../../devices/dto/create-device.dto';
import { ConflictException } from '@nestjs/common';

@ValidatorConstraint({ async: true })
class UniqueKeysConstraint implements ValidatorConstraintInterface {
  async validate(keys: CreateDeviceDto[], args: ValidationArguments) {
    const value = args.object[args.property];

    const uids = value.map((key: CreateDeviceDto) => key.uid);

    if (new Set(uids).size !== uids.length) throw new ConflictException('Devices must have unique UID');

    return true;
  }
}

export function UniqueKeys(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueKeysConstraint,
    });
  };
}
