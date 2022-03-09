import jwt from 'jsonwebtoken';
import util from 'util';

exports.sign =  util.promisify(jwt.sign);
exports.verify = util.promisify(jwt.verify);