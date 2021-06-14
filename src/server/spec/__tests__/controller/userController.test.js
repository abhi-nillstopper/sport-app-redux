import dbHandler from "../db_handler";
import userController from "../../../controllers/userController";
import User from "../../../models/user";
import bcrypt from "bcrypt";
jest.mock('bcrypt');
import jwt from 'jsonwebtoken';
jest.mock('jsonwebtoken');

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// const { firstName, lastName, password, email } = req.body;

const mockRequest = () => {
  return {
    firstName: "Abhi",
    lastName: "Shah",
    password: "12345",
    email: "abhi@gmail.com",
  };
};

describe("userController tests", () => {
  const req = mockRequest(),
    res = mockResponse();
  it("createUser test", async (done) => {
    let userResponse = await userController.createUser(req, res);
    expect(userResponse).toBeTruthy()
    console.log(userResponse);
    done();
  });
});
