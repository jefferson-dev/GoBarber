import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

import User from '@users/infra/typeorm/entities/User';
import IUsersRepository from '@users/repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionService {
  constructor(private userRepository: IUsersRepository) {}

  public async execute({
    email,
    password,
  }: IRequest): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email/Password Invalido.');
    }

    const checkPass = await compare(password, user.password);
    if (!checkPass) {
      throw new AppError('Email/Password Invalido.');
    }

    const token = sign({}, 'teste', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default CreateSessionService;
