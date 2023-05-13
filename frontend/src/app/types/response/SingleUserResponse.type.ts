import type { Response } from './Response.type';
import type { User } from '../user/User.type';

export type SingleUserResponse = Response & { data: User };
