import React from "react";
import EventPage from "../../../../pages/eventpage";
import { PureEventPage } from "../../../../pages/eventpage";
import { mount, shallow } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { defaultProps, fileAsInput } from "./defaultProps";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { withoutHooks } from "jest-react-hooks-shallow";

const mockStore = configureMockStore();
const store = mockStore({
  event: { success: true },
  /* here you can create a mock object for the reducer */
});

describe("Event page snapshot", () => {
  let spy = spyConsole();

  //   beforeEach(() => {
  //     defaultProps.createEvents = jest.fn();
  //     defaultProps.changeSuccess = jest.fn();
  //     defaultProps.success = false;
  //   });

  it("renders without crashing", () => {
    withoutHooks(() => {
      const tree = renderer.create(<PureEventPage {...defaultProps} />);
      // console.log(tree);
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});

describe("Event page snapshot", () => {
  let spy = spyConsole();
  let mockEvent;
  let wrapper;
  beforeAll(() => {
    mockEvent = { preventDefault: () => {}, target: { files: null } };
  });

  beforeEach(() => {
    defaultProps.createEvents = jest.fn();
    defaultProps.changeSuccess = jest.fn();
    defaultProps.success = false;
  });
  it("simulate submit", () => {
    withoutHooks(() => {
      wrapper = mount(<PureEventPage {...defaultProps} />);
      const spyOnEvent = jest.spyOn(wrapper.instance(), "submitHandler");
      wrapper.instance().submitHandler(mockEvent);
      //   wrapper.find('[type="submit"]').first().simulate("submit", mockEvent);
      expect(spyOnEvent).toBeCalledWith(mockEvent);
    });
  });

  it.skip("simulate onChange file", () => {
    withoutHooks(() => {
      wrapper = mount(<PureEventPage {...defaultProps} />);
      const spyOnEvent = jest.spyOn(wrapper.instance(), "handleOnChange");
      // let fileInput = wrapper.find("input").find('[type="file"]');
      // fileInput.getDOMNode().files = [fileAsInput];
      fileInput.simulate("change", mockEvent);
      expect(spyOnEvent).toBeCalledWith(mockEvent);
    });
  });

  it("simulate onChange value", () => {
    withoutHooks(() => {
      wrapper = mount(<PureEventPage {...defaultProps} />);
      const spyOnEvent = jest.spyOn(wrapper.instance(), "handleOnChange");
      let input = wrapper.find("input").find('[type="text"]').first();
      // fileInput.getDOMNode().files = [fileAsInput];
      input.instance().value = "abhi";
      mockEvent = { ...mockEvent, target: { value: "abhi" } };
      wrapper.instance().handleOnChange(mockEvent);
      wrapper.update();
      input.simulate("change", mockEvent);
      expect(spyOnEvent).toBeCalled();
      expect(spyOnEvent).lastCalledWith(mockEvent);

    });
  });
});

function spyConsole() {
  // https://github.com/facebook/react/issues/7047
  let spy = {};

  beforeAll(() => {
    spy.console = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    spy.console.mockRestore();
  });

  return spy;
}
