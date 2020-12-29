// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@users/repositories/fakes/FakeUsersRepository';
import ListProvidersServices from './ListProviders.services';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersServices: ListProvidersServices;

describe('ListProvider', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProvidersServices = new ListProvidersServices(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'johntre@mail.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@mail.com',
      password: '123456',
    });

    const providers = await listProvidersServices.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
