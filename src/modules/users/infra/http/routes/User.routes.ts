import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import uploadConfig from '@config/upload';

import CreateUserService from '@users/services/CreateUser.services';
import UpdateUserAvatarService from '@users/services/UpdateUserAvatarService';

import ensureAuthenticated from '@users/infra/http/middlewares/isAutheticated';

import DeletePassword from '@users/mappers/DeletePassword.mappers';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = container.resolve(CreateUserService);

  const user = await createUserService.execute({ name, email, password });

  const userWithoutPassword = DeletePassword.toDTO(user);

  return response.json(userWithoutPassword);
});

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    const userWithoutPassword = DeletePassword.toDTO(user);

    return response.json(userWithoutPassword);
  },
);

export default userRouter;
