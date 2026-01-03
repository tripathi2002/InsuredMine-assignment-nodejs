const cron = require('node-cron');
const ScheduledMessage = require('../models/scheduledMessage.model');

exports.scheduleMessage = async (req, res) => {
  try {
    const { message, day, time } = req.body;

    if (!message || !day || !time) {
      return res
        .status(400)
        .json({ message: 'message, day and time are required' });
    }

    const scheduledAt = new Date(`${day}T${time}:00`);

    if (isNaN(scheduledAt.getTime())) {
      return res.status(400).json({ message: 'Invalid date or time format' });
    }

    cron.schedule(
      `${scheduledAt.getMinutes()} ${scheduledAt.getHours()} ${scheduledAt.getDate()} ${
        scheduledAt.getMonth() + 1
      } *`,
      async () => {
        await ScheduledMessage.create({
          message,
          scheduledAt
        });
      }
    );

    res.status(200).json({
      message: 'Message scheduled successfully',
      scheduledAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
