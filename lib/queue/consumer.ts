import { Job } from 'bull';
import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueCompleted,
} from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { MAILMAN_QUEUE, SEND_MAIL } from '../constants';
import { MailmanService } from '../service';

@Injectable()
@Processor(MAILMAN_QUEUE)
export class MailConsumer {
  @OnQueueActive()
  onActive(job: Job) {
    console.log(`🧑‍🏭   ${MAILMAN_QUEUE} [${job.id}] :::: 📧 Processing `);
  }

  @OnQueueCompleted()
  onComplete(job: Job) {
    console.log(`🧑‍🏭   ${MAILMAN_QUEUE} [${job.id}] :::: 📧 Processed`);
  }

  @Process(SEND_MAIL)
  async sendMail(job: Job<any>): Promise<any> {
    await MailmanService.send(job['data']);
    return true;
  }
}
