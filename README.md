# ChatGPT service

## API

- `/` activation code validate

```ts
request.post('/', {
  code: '123'
});
```

- `/generate` generate new activation code

```ts
request.post('/generate', {
  password: '123',
  count: '123'
});
```