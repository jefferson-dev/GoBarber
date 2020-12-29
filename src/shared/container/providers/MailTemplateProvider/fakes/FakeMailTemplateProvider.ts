import IParseMailTemplate from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTempalteDTO';
import IMailTempleteProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailTempleteProvider {
  public async parse({ template }: IParseMailTemplate): Promise<string> {
    return template;
  }
}
