import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@users/services/UpdateProfile.services';
import ShowProfileService from '@users/services/ShowProfile.services';

import DeletePassword from '@users/mappers/DeletePassword.mappers';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    const userWithoutPassword = DeletePassword.toDTO(user);

    return response.json(userWithoutPassword);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    const userWithoutPassword = DeletePassword.toDTO(user);

    return response.json(userWithoutPassword);
  }
}
