module.exports = {
  target: 'web',
  entry: {
    app: ['./index.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('awesome-typescript-loader'),
            options: {
              // compile with typescript, then transpile to Babel
              useBabel: true,
            },
          },
        ],
      },
    ],
  },
  devtool: '#sourcemap',
  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'),
    },
  },
};
