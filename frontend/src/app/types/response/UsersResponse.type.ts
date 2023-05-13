import type { Response } from './Response.type';
import type { User } from '../user/User.type';

export type UsersResponse = Response & { data: User[] };
