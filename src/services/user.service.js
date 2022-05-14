// const db = require('../models');
// const tokenService = require('./token.service');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const User = db.users;

// class UserService {
//   async registration({ login, password, fullName, phone }) {
//     const findUser = await User.findOne({ where: { login } });
//     if (findUser) {
//       throw new Error('Такой пользователь уже существует');
//     }
//     const hashPassword = await bcrypt.hash(password, 3);

//     const user = await User.create({ login, phone, fullName, password: hashPassword });

//     // const userDto = { id: user.id, login: user.login };

//     // const token = jwt.sign(payload, 'access-secret', { expiresIn: '1,' });

//     const accessToken = jwt.sign({ id: user.id, type: 'user' }, 'access-secret', { expiresIn: '1m' });

//     await tokenService.saveToken(userDto.id, tokens.refreshToken);

//     return { token, user: userDto };
//   }

//   //   async login(email, password) {
//   //     const user = await UserModel.findOne({ email });
//   //     if (!user) {
//   //       throw ApiError.BadRequest('Пользователь с таким email не найден');
//   //     }
//   //     const isPassEquals = await bcrypt.compare(password, user.password);
//   //     if (!isPassEquals) {
//   //       throw ApiError.BadRequest('Неверный пароль');
//   //     }
//   //     const userDto = new UserDto(user);
//   //     const tokens = tokenService.generateTokens({ ...userDto });

//   //     await tokenService.saveToken(userDto.id, tokens.refreshToken);
//   //     return { ...tokens, user: userDto };
//   //   }

//   //   async logout(refreshToken) {
//   //     const token = await tokenService.removeToken(refreshToken);
//   //     return token;
//   //   }

//   //   async refresh(refreshToken) {
//   //     if (!refreshToken) {
//   //       throw ApiError.UnauthorizedError();
//   //     }
//   //     const userData = tokenService.validateRefreshToken(refreshToken);
//   //     const tokenFromDb = await tokenService.findToken(refreshToken);
//   //     if (!userData || !tokenFromDb) {
//   //       throw ApiError.UnauthorizedError();
//   //     }
//   //     const user = await UserModel.findById(userData.id);
//   //     const userDto = new UserDto(user);
//   //     const tokens = tokenService.generateTokens({ ...userDto });

//   //     await tokenService.saveToken(userDto.id, tokens.refreshToken);
//   //     return { ...tokens, user: userDto };
//   //   }

//   //   async getAllUsers() {
//   //     const users = await UserModel.find();
//   //     return users;
//   //   }
// }
// module.exports = new UserService();
