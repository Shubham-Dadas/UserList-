import React from "react";
import { shallow } from "enzyme";
import ActionModal from "./ActionModal";
import { Gender, Status, User } from "../UserList/model";

describe("ActionModal Component", () => {
  const mockOnClose = jest.fn();

  const mockHandleEditModal = jest.fn();

  const mockUser: User = {
    id: 1,
    name: "Shubham Dadas",
    email: "shubh@gmail.com",
    gender: Gender.male,
    status: Status.active,
  };

  const component = shallow(
    <ActionModal
      user={mockUser}
      onClose={mockOnClose}
      handleEditModal={mockHandleEditModal}
    />
  );

  it("Snapshot test", () => {
    //@ts-ignore
    expect(component).toMatchSnapshot();
  });

  it("should call handleEditModal and onClose function when clicked on Edit button", () => {
    component.find("li").at(0).simulate("click");
    expect(mockHandleEditModal).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
