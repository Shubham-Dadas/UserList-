import React from "react";
import toJson from "enzyme-to-json";
import { shallow, mount } from "enzyme";
import App from "./App";

describe("App component", () => {
  it("test component", () => {
    const component = mount(<App />);
    // @ts-ignore
    expect(toJson(component)).toMatchSnapshot();
    expect(1 + 2).toBe(3);
  });
});
