import React from "react";
import { shallow } from "enzyme";
import ActionModal from "./ActionModal";
import { mockUser } from "../../../stub";

const props = {
  user: mockUser,
  onCloseActionModal: jest.fn(),
  handleEditModal:jest.fn()
};


describe("ActionModal Component", () => {
  const component = shallow(
    <ActionModal {...props} />
  );

  it("Snapshot test", () => {
    //@ts-ignore
    expect(component).toMatchSnapshot();
  });

  it("should call handleEditModal and onClose function when clicked on Edit button", () => {
    component.find("li").at(0).simulate("click");
    expect(props.handleEditModal).toHaveBeenCalledTimes(1);
    expect(props.onCloseActionModal).toHaveBeenCalled();
  });
});
