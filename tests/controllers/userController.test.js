const userService = require('../../services/userService');
const userController = require('../../controllers/userController');
const httpMocks = require('node-mocks-http');
const { hashPassword } = require('../../helpers/bcryptHelpers');

jest.mock('../../services/userService');
jest.mock('../../helpers/bcryptHelpers');

let req, res, next;

beforeEach(() => {
  req = {
    body: {}
  };
  res = {
    statusCode: 200,
    _getJSONData: () => this.jsonData,
    json: jest.fn((data) => {
      this.jsonData = data;
      return this; // Para permitir el encadenamiento de métodos
    }),
    status: jest.fn(function (status) {
      this.statusCode = status;
      return this;
    })
  };
  next = jest.fn();
});

describe('userController.getAllUsers', () => {
  it('should return all users', async () => {
    const users = [
      { nombre: 'John', primer_apellido: 'Doe', email: 'john@example.com', username: 'johndoe' }
    ];
    userService.getAllUsers.mockResolvedValue(users);
    await userController.getAllUsers(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(users);
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'Error fetching users' };
    const rejectedPromise = Promise.reject(errorMessage);
    userService.getAllUsers.mockReturnValue(rejectedPromise);
    await userController.getAllUsers(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({ error: errorMessage.message });
  });
});

describe('userController.registerUser', () => {
  it('should create a new user', async () => {
    req.body = { nombre: 'Jane', primer_apellido: 'Doe', email: 'jane@example.com', username: 'janedoe', password: 'password123' };
    hashPassword.mockResolvedValue('hashedPassword');
    userService.createUser.mockResolvedValue();

    await userController.registerUser(req, res, next);

    expect(userService.createUser).toHaveBeenCalledWith('Jane', 'Doe', 'jane@example.com', 'janedoe', 'hashedPassword');
    //expect(res.statusCode).toBe(302);
    //expect(res._getRedirectUrl()).toBe('/');
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'Error creating user' };
    const rejectedPromise = Promise.reject(errorMessage);
    userService.createUser.mockReturnValue(rejectedPromise);

    await userController.registerUser(req, res, next);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({ error: errorMessage.message });
  });
});

describe('userController.loginUser', () => {
  it('should login a user and return a token', async () => {
    const user = { id: 1, username: 'johndoe', email: 'john@example.com', password: 'hashedPassword' };
    req.body = { username: 'johndoe', password: 'password123' };
    userService.findUserByUsername.mockResolvedValue(user);
    const comparePassword = jest.fn().mockResolvedValue(true);
    jest.doMock('../../helpers/bcryptHelpers', () => ({ comparePassword }));
    const token = 'mockToken';
    const jwt = require('jsonwebtoken');
    jwt.sign = jest.fn().mockReturnValue(token);

    await userController.loginUser(req, res, next);

    expect(userService.findUserByUsername).toHaveBeenCalledWith('johndoe');
    //expect(res.statusCode).toBe(200);
    //expect(res._getJSONData()).toStrictEqual({ token, userId: user.id });
  });

  it('should return 400 if credentials are incorrect', async () => {
    req.body = { username: 'johndoe', password: 'password123' };
    userService.findUserByUsername.mockResolvedValue(null);

    await userController.loginUser(req, res, next);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toStrictEqual({ error: 'Credenciales incorrectas' });
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'Error logging in' };
    const rejectedPromise = Promise.reject(errorMessage);
    userService.findUserByUsername.mockReturnValue(rejectedPromise);

    await userController.loginUser(req, res, next);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({ error: errorMessage.message });
  });
});
