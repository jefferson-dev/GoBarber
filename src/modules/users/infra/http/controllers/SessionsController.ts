import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSessionService from '@users/services/CreateSession.services';

import DeletePassword from '@users/mappers/DeletePassword.mappers';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionService = container.resolve(CreateSessionService);

    const { user, token } = await createSessionService.execute({
      email,
      password,
    });

    const userWithoutPassword = DeletePassword.toDTO(user);

    return response.json({ user: userWithoutPassword, token });
  }
}
