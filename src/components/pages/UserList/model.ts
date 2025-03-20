export enum Gender {
  male = "male",
  female = "female",
}

export enum Status {
  active = "active",
  inactive = "inactive",
}

export enum MessageType {
  success = "success",
  error = "error",
}

export enum ActionType {
  add = "add",
  edit = "edit",
  delete = "delete",
}
export interface ModalState {
  type: ActionType|null;
  user: User | null
}

export interface User {
  id?: number;
  name: string;
  email: string;
  gender: Gender;
  status: Status;
}
