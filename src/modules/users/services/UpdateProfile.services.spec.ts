import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@users/repositories/fakes/FakeUsersRepository';
import UpdateProfileServices from './UpdateProfile.services';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileServices: UpdateProfileServices;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileServices = new UpdateProfileServices(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const updatedUser = await updateProfileServices.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@mail.com',
    });

    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('johntre@mail.com');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateProfileServices.execute({
        user_id: 'non-existing-user-id',
        name: 'test',
        email: 'test@exemple.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'test@mail.com',
      password: '123456',
    });

    await expect(
      updateProfileServices.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johndoe@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const updatedUser = await updateProfileServices.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@mail.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await expect(
      updateProfileServices.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@mail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await expect(
      updateProfileServices.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@mail.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
