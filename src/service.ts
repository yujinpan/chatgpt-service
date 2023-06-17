import * as process from 'process';

import type { RequestHandler } from 'express';

import {
  generateActivationCode,
  getActivationCodeItem,
  saveActivationCodeItem,
} from './api';

/**
 * code - activation code
 * @example
 * request.post('/api', {
 *   code: '123'
 * });
 */
export const activationCodeValidate: RequestHandler = (req, res) => {
  const code = req.body.code;

  if (!code) return res.status(401).send('Activation code is required.');

  return getActivationCodeItem(code)
    .then((codeData) => {
      if (codeData) {
        if (codeData.count > 0) {
          codeData.count--;
          saveActivationCodeItem(codeData);
          res.send({
            count: codeData.count,
          });
        } else {
          return res.status(403).send('Activation code has been used up.');
        }
      } else {
        res.status(403).send('Activation code is mismatch.');
      }
    })
    .catch((e) => {
      res.status(500).send(e);
    });
};

/**
 * password - generate password
 * count - use count
 * @example
 * request.post('/api', {
 *   password: '123',
 *   count: '123'
 * });
 */
export const activationCodeGenerate: RequestHandler = (req, res) => {
  const password = req.body.password;

  if (!password || password !== process.env.GENERATE_ACTIVATION_CODE_PASSWORD) {
    return res.status(400).send('Password invalid.');
  }

  return generateActivationCode(req.body.count)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};
