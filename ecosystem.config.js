module.exports = {
  apps: [
    {
      name: 'insuredmine-api',
      script: 'src/server.js',
      instances: 1,
      autorestart: true,
      watch: false
    }
  ]
};
