module.exports = {
  apps: [
    {
      name: 'pdfmaster-server',
      script: './server/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
    },
    {
      name: 'pdfmaster-client',
      script: 'node_modules/next/dist/bin/next',
      args: 'start ./client',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
