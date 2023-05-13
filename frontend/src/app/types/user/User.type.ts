import type { UserFormData } from './UserFormData.type';
import type { UserAdditionalData } from './UserAdditionalData.type';

export type User = { _id: string } & UserFormData & UserAdditionalData;
