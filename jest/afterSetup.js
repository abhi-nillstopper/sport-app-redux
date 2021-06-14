import enableHooks from "jest-react-hooks-shallow";

// enableHooks(jest, { dontMockByDefault: true });
enableHooks(jest);

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
