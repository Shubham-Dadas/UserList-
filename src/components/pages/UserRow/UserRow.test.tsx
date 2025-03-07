import React from "react";
import UserRow from "./UserRow";
import { shallow } from "enzyme";
import { Gender, Status } from "../UserList/model";

const mockUser = {
  id: 7705369,
  name: "Shubham Dadas",
  email: "shubham.dadas@15ce.com",
  gender: Gender.male,
  status: Status.active,
};

it("userRow snapshot matching", () => {
  const component = shallow(<UserRow user={mockUser} />);
  //@ts-ignore
  expect(component).toMatchSnapshot();
});
