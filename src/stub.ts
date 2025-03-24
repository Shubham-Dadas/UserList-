import { User, Gender, Status } from "./Model/model";

export const mockUser: User = {
  id: 7705369,
  name: "Shubham Dadas",
  email: "shubham.dadas@15ce.com",
  gender: Gender.male,
  status: Status.active,
};

export const users = [
  {
    id: 7705369,
    name: "Shubham Dadas",
    email: "shubham.dadas@15ce.com",
    gender: Gender.male,
    status:Status.active,
  },
  {
    id: 7704657,
    name: "Bankim Nambeesan",
    email: "nambeesan_bankim@waelchi.example",
    gender: Gender.male,
    status: Status.active,
  },
  {
    id: 7704656,
    name: "Chaturaanan Malik",
    email: "chaturaanan_malik@wilkinson.example",
    gender: Gender.female,
    status: Status.inactive,
  },
];


export const handleModalClose = jest.fn()
export const handleUserAddOrEdit = jest.fn()
export const handleNotification=jest.fn()

export const onCloseActionModal = jest.fn()
export const handleEditModal=jest.fn()