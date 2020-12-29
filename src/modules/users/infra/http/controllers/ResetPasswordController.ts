import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@users/services/ResetPassword.services';

// import DeletePassword from '@users/mappers/DeletePassword.mappers';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({
      password,
      token,
    });

    // const userWithoutPassword = DeletePassword.toDTO(user);

    return response.status(204).json();
  }
}
