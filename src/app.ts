import express from 'express';

import { activationCodeValidate } from './service';

const app = express();
const port = 9000;

app.use(express.json());

app.post('/', activationCodeValidate);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
