import ISendEmailDTO from '@shared/container/providers/MailProvider/dtos/ISendEmailDTO';
import IMailProvider from '../models/IMailProvider';

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendEmailDTO[] = [];

  public async sendMail(message: ISendEmailDTO): Promise<void> {
    this.messages.push(message);
  }
}
