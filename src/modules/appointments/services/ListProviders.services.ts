import { injectable, inject } from 'tsyringe';

import User from '@users/infra/typeorm/entities/User';
import IUsersRepository from '@users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.userRepository.findAllProvider({
      except_user_id: user_id,
    });

    return users;
  }
}
