import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { Gateway, GatewaySchema } from './entities/gateway.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewayRepository } from './gateway.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Gateway.name,
        schema: GatewaySchema,
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [GatewayService, GatewayRepository],
})
export class GatewayModule {}
