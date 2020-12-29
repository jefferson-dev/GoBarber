import IParseMailTemplate from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTempalteDTO';

export default interface IMailTempleteProvider {
  parse(data: IParseMailTemplate): Promise<string>;
}
