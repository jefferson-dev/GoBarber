import hbs from 'handlebars';
import fs from 'fs';

import IParseMailTemplate from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTempalteDTO';
import IMailTempleteProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

export default class HandlebarMailTemplateProvider
  implements IMailTempleteProvider {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = hbs.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
