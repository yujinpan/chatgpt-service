import type { RequestHandler } from 'express';

import { getActivationCodeItem, saveActivationCodeItem } from './api';

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
