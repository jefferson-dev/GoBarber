import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUser from './CreateUser.services';
import CreateSessionService from './CreateSession.services';

describe('autheticatedUser', () => {
  it('should be able to autheticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
    const createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    });

    const response = await createSession.execute({
      email: 'johndoe@exemple.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to autheticate with exitting user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      createSession.execute({
        email: 'johndoe@exemple.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with the invalid password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
    const createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    });

    expect(
      createSession.execute({
        email: 'johndoe@exemple.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
