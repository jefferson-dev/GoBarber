import { hash } from 'bcrypt';

import AppError from '@shared/errors/AppError';

import User from '@users/infra/typeorm/entities/User';
import IUsersRepository from '@users/repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private userRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const emailExists = await this.userRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('Email já cadastrado.');
    }

    const encryptPass = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: encryptPass,
    });

    return user;
  }
}

export default CreateUserService;
