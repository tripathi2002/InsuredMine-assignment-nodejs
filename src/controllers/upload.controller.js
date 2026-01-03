const { Worker } = require('worker_threads');
const path = require('path');

exports.uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'File is required' });
  }

  const worker = new Worker(
    path.join(__dirname, '../workers/upload.worker.js'),
    {
      workerData: {
        filePath: req.file.path
      }
    }
  );

  worker.on('message', (result) => {
    if (result.success) {
      res.status(200).json({ message: 'File processed successfully' });
    } else {
      res.status(500).json({ error: result.error });
    }
  });

  worker.on('error', (err) => {
    res.status(500).json({ error: err.message });
  });

  worker.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Worker exited with code ${code}`);
    }
  });
};
