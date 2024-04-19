import { Controller, Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentCreateChargeDto } from '../dto/payment.dto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern('create_charge')
  @UsePipes(new ValidationPipe())
  async createCharge(@Payload() data: PaymentCreateChargeDto) {
    Logger.log('Request fo create charge with data: ' + data);
    return this.paymentService.createCharge(data);
  }
}
