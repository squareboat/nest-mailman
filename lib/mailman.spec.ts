import { Test, TestingModule } from '@nestjs/testing';
import * as path from 'path';

import { MailmanService } from './service';
import { Mailman } from './mailman';
import { MailData, MailmanOptions } from './interfaces';
import { MailMessage } from './message';
import { map } from './provider.map';
import { MailmanModule } from './index';

const SMTPTransport = require('nodemailer/lib/smtp-transport');

const config: MailmanOptions = {
  host: 'xx',
  port: 1234,
  username: 'xx',
  password: 'xx',
  from: 'xx',
  path: path.join(__dirname, '../lib/views/mail'),
};

async function getMailerServiceForOptions(
  options: MailmanOptions
): Promise<MailmanService> {
  const module: TestingModule = await Test.createTestingModule({
    imports: [MailmanModule.register(config)],
    providers: [
      {
        provide: map.MAILABLE_OPTIONS,
        useValue: options,
      },
    ],
  }).compile();

  const service = module.get<MailmanService>(MailmanService);
  return service;
}

describe('MailerService', () => {
  let sampleMailMessage: MailMessage;

  describe('Module Initialization', () => {
    /** TESTING TRANSPORTER CONFIGURATION via register*/
    it('should accept smtp transport options', async () => {
      const service = await getMailerServiceForOptions(config);
      expect(service).toBeDefined();
    });
    /** ===================== */

    /** TESTING TRANSPORTER CONFIGURATION via registerAsync */
    it('should accept smtp transport options configured aynchronously', async () => {
      const module = await Test.createTestingModule({
        imports: [
          MailmanModule.registerAsync({
            useFactory: () => {
              return config;
            },
          }),
        ],
        providers: [
          {
            provide: map.MAILABLE_OPTIONS,
            useValue: config,
          },
        ],
      }).compile();
      const service = module.get<MailmanService>(MailmanService);

      expect(service).toBeDefined();
    });
    /** ===================== */
  });

  /** TESTS RELATED TO CONSTRUCTING MAIL MESSAGE */

  describe('MailMessage', () => {
    /** VIEW BASED MAILS  */
    it('should compile view based mails', async () => {
      let mailBody: MailData;

      const mailMessage = MailMessage.init();
      mailMessage
        .subject('Testing 1')
        .view('test-plain', { message: 'Hello World' });
      mailBody = await mailMessage.getMailData();
      sampleMailMessage = mailMessage;

      expect(mailBody.subject).toBe('Testing 1');
      expect(mailBody.html).toBe('<p>The message is Hello World</p>');
      expect(await mailMessage.render()).toBe(
        '<p>The message is Hello World</p>'
      );
    });

    /** === RAW MAILS === */
    it('should compile mails that are constructed via template', async () => {
      let mailBody: MailData;

      const mailMessage = MailMessage.init();
      mailMessage
        .subject('Testing 2')
        .raw('<p>This is a plain text mail with content: <%= message %></p>', {
          message: 'Hello from payload',
        });

      mailBody = await mailMessage.getMailData();

      expect(mailBody.subject).toBe('Testing 2');
      expect(mailBody.html).toBe(
        '<p>This is a plain text mail with content: Hello from payload</p>'
      );
    });

    /** === GENERIC MAIL === */
    it('should compile mails that are constructed via mail builder', async () => {
      let mailBody: MailData;

      const mailMessage = MailMessage.init();
      mailMessage
        .subject('Testing 2')
        .greeting('Hello Sarah,')
        .line("You've received a new enquiry")
        .line(
          'Summary: The product looks promising! would love to setup a call to discuss more'
        )
        .action('View Enquiry', 'https://app.test.in/admin/queries/123');

      mailBody = await mailMessage.getMailData();

      expect(mailBody.subject).toBe('Testing 2');
    });

    /** ==== ACCEPT MARKDOWN MAILS ==== */

    /** TESTS RELATED TO TRANSPORTING MAILs */
    it('should accept mailmessage', async () => {
      let sentMailData = { html: '', attachments: [], from: '' };

      jest
        .spyOn(SMTPTransport.prototype, 'send')
        .mockImplementation((mailData: any) => {
          sentMailData = mailData.data;
        });

      const mailMan = Mailman.init();
      mailMan
        .to(['hello@gmail.com', 'test@gmail.com'])
        .cc('admin@gmail.com')
        .bcc('admin_desk@gmail.com')
        .send(sampleMailMessage)
        .then(() => {
          expect(sentMailData.html).toBe('<p>The message is Hello World</p>');
        });

      mailMan
        .to(['hello@gmail.com', 'test@gmail.com'])
        .from('oveeridden@gmail.com')
        .cc('admin@gmail.com')
        .bcc('admin_desk@gmail.com')
        .send(sampleMailMessage)
        .then(() => {
          expect(sentMailData.from).toBe('oveeridden@gmail.com');
        });
    });
    /** ===================== */
  });
  /** ===================== */
});
