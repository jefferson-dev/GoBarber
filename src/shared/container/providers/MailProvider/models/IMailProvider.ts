import ISendEmailDTO from '@shared/container/providers/MailProvider/dtos/ISendEmailDTO';

export default interface IMailProvider {
  sendMail(data: ISendEmailDTO): Promise<void>;
}
