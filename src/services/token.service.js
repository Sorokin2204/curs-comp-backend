// const jwt = require('jsonwebtoken');
// const db = require('../models');
// const Token = db.tokens;
// class TokenService {
//   generateTokens(payload) {
//     const accessToken = jwt.sign(payload, 'access-secret', { expiresIn: '15s' });
//     const refreshToken = jwt.sign(payload, 'refresh-secret', { expiresIn: '30s' });
//     return {
//       accessToken,
//       refreshToken,
//     };
//   }

//   //   validateAccessToken(token) {
//   //     try {
//   //       const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
//   //       return userData;
//   //     } catch (e) {
//   //       return null;
//   //     }
//   //   }

//   //   validateRefreshToken(token) {
//   //     try {
//   //       const userData = jwt.verify(token, 'refresh-secret');
//   //       return userData;
//   //     } catch (e) {
//   //       return null;
//   //     }
//   //   }

//   async saveToken(userId, refreshToken) {
//     const tokenData = await Token.findOne({ where: { userId: userId } });
//     if (tokenData) {
//       tokenData.refreshToken = refreshToken;
//       Token.update({ refreshToken }, { where: { userId: userId } });
//       return tokenData.save();
//     }
//     const token = await Token.create({ userId: userId, refreshToken });
//     return token;
//   }

//   //   async removeToken(refreshToken) {
//   //     const tokenData = await tokenModel.deleteOne({ refreshToken });
//   //     return tokenData;
//   //   }

//   //   async findToken(refreshToken) {
//   //     const tokenData = await tokenModel.findOne({ refreshToken });
//   //     return tokenData;
//   //   }
// }

// module.exports = new TokenService();
