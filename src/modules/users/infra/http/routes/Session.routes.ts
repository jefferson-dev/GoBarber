import { Router } from 'express';
import { container } from 'tsyringe';

import CreateSessionService from '@users/services/CreateSession.services';

import DeletePassword from '@users/mappers/DeletePassword.mappers';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createSessionService = container.resolve(CreateSessionService);

  const { user, token } = await createSessionService.execute({
    email,
    password,
  });

  const userWithoutPassword = DeletePassword.toDTO(user);

  return response.json({ user: userWithoutPassword, token });
});

export default sessionRouter;
