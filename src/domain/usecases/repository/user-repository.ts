import { User } from '../../params/user';

export interface UserRepository {
  create(value: User): Promise<User>;
  get(id: number): Promise<User>;
  update(value: User): Promise<User>;
  delete(id: number): Promise<boolean>;
  list(): Promise<User[]>;
}
