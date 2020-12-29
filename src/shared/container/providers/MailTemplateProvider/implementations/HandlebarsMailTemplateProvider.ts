import hbs from 'handlebars';

import IParseMailTemplate from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTempalteDTO';
import IMailTempleteProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

export default class HandlebarMailTemplateProvider
  implements IMailTempleteProvider {
  public async parse({
    template,
    variables,
  }: IParseMailTemplate): Promise<string> {
    const parseTemplate = hbs.compile(template);

    return parseTemplate(variables);
  }
}
