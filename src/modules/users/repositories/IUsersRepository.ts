import User from '@users/infra/typeorm/entities/User';
import ICreateUserDTO from '@users/dtos/ICreateUserDTO';
import IFindAllProviderDTO from '@users/dtos/IFindAllProviderDTO';

export default interface IUsersRepository {
  findAllProvider(data: IFindAllProviderDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
