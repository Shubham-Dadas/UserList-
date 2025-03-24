import React from "react";
import { shallow } from "enzyme";
import ActionModal from "./ActionModal";
import { mockUser, } from "../../../stub";
import { handleEditModal, onCloseActionModal } from "../../../stub";
describe("ActionModal Component", () => {
  
  const component = shallow(
    <ActionModal
      user={mockUser}
      onCloseActionModal={onCloseActionModal}
      handleEditModal={handleEditModal}
    />
  );

  it("Snapshot test", () => {
    //@ts-ignore
    expect(component).toMatchSnapshot();
  });

  it("should call handleEditModal and onClose function when clicked on Edit button", () => {
    component.find("li").at(0).simulate("click");
    expect(handleEditModal).toHaveBeenCalledTimes(1);
    expect(onCloseActionModal).toHaveBeenCalled();
  });
});
