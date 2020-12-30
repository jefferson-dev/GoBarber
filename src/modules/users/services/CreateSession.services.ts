import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authJWT from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@users/repositories/IUsersRepository';
import IHashProvider from '@users/providers/HashProvider/models/IHashProvider';

import User from '@users/infra/typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: IRequest): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email/Password Invalido.');
    }

    const checkPass = await this.hashProvider.compareHash(
      password,
      user.password,
    );
    if (!checkPass) {
      throw new AppError('Email/Password Invalido.');
    }

    const token = sign({}, authJWT.jwt.secret, {
      subject: user.id,
      expiresIn: authJWT.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
