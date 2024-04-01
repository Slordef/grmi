import { User } from '../../models/user';

export interface UserRepository {
  create(value: User): Promise<User>;
  get(id: number): Promise<User>;
  update(value: Partial<User>): Promise<User>;
  delete(id: number): Promise<boolean>;
  list(): Promise<User[]>;
}
