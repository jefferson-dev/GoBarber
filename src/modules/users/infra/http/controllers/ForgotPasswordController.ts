import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@users/services/SendForgotPasswordEmail.services';

// import DeletePassword from '@users/mappers/DeletePassword.mappers';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgotPasswordEmail.execute({
      email,
    });

    // const userWithoutPassword = DeletePassword.toDTO(user);

    return response.status(204).json();
  }
}