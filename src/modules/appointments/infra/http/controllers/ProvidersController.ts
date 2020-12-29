import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@appointments/services/ListProviders.services';

export default class ProviderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      user_id,
    });

    return response.json(providers);
  }
}
