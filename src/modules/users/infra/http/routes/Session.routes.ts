import { Router } from 'express';

import UsersRepository from '@users/infra/typeorm/repositories/UsersRepository';
import CreateSessionService from '@users/services/CreateSession.services';

import DeletePassword from '@users/mappers/DeletePassword.mappers';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = new UsersRepository();
  const createSessionService = new CreateSessionService(usersRepository);

  const { user, token } = await createSessionService.execute({
    email,
    password,
  });

  const userWithoutPassword = DeletePassword.toDTO(user);

  return response.json({ user: userWithoutPassword, token });
});

export default sessionRouter;
