module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(axios)/)'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
};
