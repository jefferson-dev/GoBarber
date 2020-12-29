import IMailTempleteProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailTempleteProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}
