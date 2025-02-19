import React from "react";
import UserRow from "./UserRow";
import { shallow } from "enzyme";

jest.mock("../../../services/service", () => ({
  getUsers: jest.fn(),
}));

 const mockUser = {
   id: 7705369,
   name: "Shubham Dadas",
   email: "shubham.dadas@15ce.com",
   gender: "male",
   status: "active",
 };


it("userRow snapshot matching", () => {
    const component = shallow(<UserRow user={mockUser} />)
    //@ts-ignore
    expect(component).toMatchSnapshot();
})
