# ChatGPT service

## API

- `/activationCode` activation code validate

```ts
request.post('/activationCode', {
  code: '123'
});
```

- `/activationCode/generate` generate new activation code

```ts
request.post('/activationCode/generate', {
  password: '123',
  count: 123
});
```