import React from "react";
import Dashboard from "../../../../pages/dashboard";
import { shallow, mount } from "enzyme";
import { Button } from "react-bootstrap";
// import { BrowserRouter as Router } from "react-router-dom";
// import TestRenderer from "react-test-renderer";
// import * as redux from "react-redux";
import { defaultProps } from "./defaultProps";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "../../../../actions/dashboard_action";
// import { withHooks } from "jest-react-hooks-shallow";

const mockDispatch = jest.fn();
useDispatch.mockImplementation(() => mockDispatch);

// const initialState = {
//   dashboard: { events: [] },
//   authentication: {
//     isLoggedIn: true,
//   },
// };

const initialState = {
  events: [],
  isLoggedIn: true,
};

describe("Dashboard test", () => {
    
//   let container;
  const container = mount(<Dashboard {...defaultProps} />);

  beforeAll(() => {
    useSelector.mockImplementation(() => ({ ...initialState }));
    const children = { children: [{ disabled: false }] };
    jest.spyOn(document, "querySelector").mockImplementation((selector) => {
      switch (selector) {
        case `div[name="select-event-dropdown"]`:
          return children;
        // case ".productNavDataContainer":
        //   return mDataHeader;
      }
    });
  });

  //   beforeEach(() => {
  //     container = wrapper.find("Dashboard");
  //   });

  afterAll(() => {
    container.unmount();
  });

  it("check props", () => {
    // console.log("container", container);
    // console.log("container props", container.props());
    // console.log("container text", container.text());
    // console.log("container Button", container.find("Button"));
    // withHooks(() => {

    expect(container.props().location.pathname).toBe("/");
    // })
  });

  test("check button", () => {
      
    expect(container.find("button")).toHaveLength(0);
  });

  test("check button", () => {
    expect(container.text()).toBe("");
  });

  test("check fetchEvents action", () => {
    expect(mockDispatch).toBeCalledTimes(0);
    // expect(mockDispatch).toBeCalledWith(fetchEvents(""));
  });
});
