const os = require('os');

setInterval(() => {
  const usedMemory =
    ((os.totalmem() - os.freemem()) / os.totalmem()) * 100;

  if (usedMemory > 70) {
    console.error('High memory usage detected. Restarting server...');
    process.exit(1); // PM2 will restart
  }
}, 5000);
