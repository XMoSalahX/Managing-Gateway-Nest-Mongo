import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FindOneGatewayDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
