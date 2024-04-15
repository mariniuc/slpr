import {Inject, Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import Stripe from "stripe";
import {PaymentCreateChargeDto} from "../dto/payment.dto";
import {NOTIFICATIONS_SERVICE} from "@app/common";
import {ClientProxy} from "@nestjs/microservices";

@Injectable()
export class PaymentService {
    private readonly stripe = new Stripe(
        this.configService.get('STRIPE_SECRET_KEY'),
        {
            apiVersion: '2024-04-10',
        },
    );

  constructor(
      private readonly configService: ConfigService,
      @Inject(NOTIFICATIONS_SERVICE)
      private readonly notificationsService: ClientProxy,
      ) {
  }

    //If not working use createCharge() commented method down bellow

    // async createCharge({ card, amount, email }: PaymentCreateChargeDto) {
    //     const paymentMethod = await this.stripe.paymentMethods.create({
    //         type: 'card',
    //         card,
    //     });
    //
    //     const paymentIntent = await this.stripe.paymentIntents.create({
    //         payment_method: paymentMethod.id,
    //         amount: amount * 100,
    //         confirm: true,
    //         payment_method_types: ['card'],
    //         currency: 'usd',
    //     });
    //
    //     this.notificationsService.emit('notify_email', {
    //         email,
    //         text: `Your payment of $${amount} has completed successfully.`,
    //     });
    //
    //     return paymentIntent;
    // }

    async createCharge({ card, amount, email }: PaymentCreateChargeDto) {
        const paymentIntent = await this.stripe.paymentIntents.create({
            payment_method: 'pm_card_visa',
            amount: amount * 100,
            confirm: true,
            currency: 'usd',
        });

        // this.notificationsService.emit('notify_email', {
        //     email,
        //     text: `Your payment of $${amount} has completed successfully.`,
        // });

        return paymentIntent;
    }
}
