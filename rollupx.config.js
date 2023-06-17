module.exports = {
  banner:
    '/*!\n' +
    ` * chatgpt-service ${require('./package.json').version}\n` +
    ` * (c) 2023-${new Date().getFullYear()}\n` +
    ' */\n',

  aliasConfig: {
    '@': 'src',
  },

  formats: [
    {
      format: 'cjs',
      inputFiles: ['**/*'],
      outputDir: 'scf',
      outputFile: '[name][ext]',
    },
  ],

  node: true,
};
