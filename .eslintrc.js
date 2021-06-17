module.exports = {
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
