import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@users/services/CreateUser.services';

import DeletePassword from '@users/mappers/DeletePassword.mappers';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({ name, email, password });

    const userWithoutPassword = DeletePassword.toDTO(user);

    return response.json(userWithoutPassword);
  }
}
