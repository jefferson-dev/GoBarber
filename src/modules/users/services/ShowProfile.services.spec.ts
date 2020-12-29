import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@users/repositories/fakes/FakeUsersRepository';
import ShowProfileServices from './ShowProfile.services';

let fakeUsersRepository: FakeUsersRepository;
let showProfileServices: ShowProfileServices;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfileServices = new ShowProfileServices(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const profile = await showProfileServices.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@mail.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      showProfileServices.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
