export enum Gender {
  male = "male",
  female = "female",
}

export enum Status {
  active = "active",
  inactive = "inactive",
}

export interface User {
  id?: number;
  name: string;
  email: string;
  gender: Gender;
  status: Status;
}
