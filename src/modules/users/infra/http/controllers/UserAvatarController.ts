import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@users/services/UpdateUserAvatarService';

import DeletePassword from '@users/mappers/DeletePassword.mappers';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    const userWithoutPassword = DeletePassword.toDTO(user);

    return response.json(userWithoutPassword);
  }
}
