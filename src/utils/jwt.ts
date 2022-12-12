import jwt from 'jsonwebtoken';

const options = {
  kid: process.env.NEXT_PUBLIC_KID,
  alg: process.env.NEXT_PUBLIC_ALG,
  typ: process.env.NEXT_PUBLIC_TYPE,
};

export default {
  encodeJWT(payload) {
    return jwt.sign(payload, process.env.NEXT_PUBLIC_SECRET, { header: options });
  },
};
