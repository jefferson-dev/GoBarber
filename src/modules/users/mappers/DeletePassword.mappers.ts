import User from '@users/infra/typeorm/entities/User';

interface IUserDTO {
  id: string;
  name: string;
  email: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
}

export default class DeletePassword {
  public static toDTO(user: User): IUserDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
