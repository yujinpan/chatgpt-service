import COS from 'cos-nodejs-sdk-v5';
import * as process from 'process';

export type ActivationCodeData = {
  code: string;
  count: number;
};

const cos = new COS({
  SecretId: process.env.SECRET_ID,
  SecretKey: process.env.SECRET_KEY,
});
const baseInfo = {
  Bucket: 'app-1301154847',
  Region: 'ap-shanghai',
  Key: 'activation-code.json',
};
const initData: ActivationCodeData[] = [
  { code: 'hello', count: 100 },
  { code: 'world', count: 100 },
];

function initActivationCode() {
  return saveActivationCode(initData);
}

let cache;
export function getActivationCode(): Promise<ActivationCodeData[]> {
  if (cache) return Promise.resolve(JSON.parse(cache));

  return cos
    .getObject(baseInfo)
    .then(
      (res) => {
        return JSON.parse((cache = res.Body.toString()));
      },
      (e) => {
        if (e.statusCode === 404) {
          return initActivationCode().then((res) => {
            cache = JSON.stringify(res);
            return res;
          });
        } else {
          return Promise.reject(e);
        }
      },
    )
    .then((res) => {
      // 缓存 2s，避免频繁的读取数据库
      setTimeout(() => {
        cache = null;
      }, 2000);

      return res;
    });
}

export function saveActivationCode(data): Promise<ActivationCodeData[]> {
  return cos
    .putObject({
      ...baseInfo,
      Body: JSON.stringify(data),
    })
    .then(() => {
      return data;
    });
}

export function getActivationCodeItem(code): Promise<ActivationCodeData> {
  return getActivationCode().then((res) => {
    return res.find((item) => item.code === code);
  });
}

export function saveActivationCodeItem(data) {
  return getActivationCode().then((res) => {
    const find = res.find((item) => item.code === data.code);
    Object.assign(find, data);

    return saveActivationCode(res);
  });
}
