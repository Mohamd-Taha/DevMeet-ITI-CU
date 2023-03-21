// controllers/zoomMeetingController.js

const ZoomMeeting = require('../Models/zoomMeetingModel');
// const zoomus = require('zoomus')({
//   key: '5okzhDEVQaCa6LpQVfoQBA',
//   secret:'b3dlXftU7zWgHWBU1AhqiMu4sWcyVLqcRksL',
// });

exports.createZoomMeeting = async (req, res) => {
  try {
    const { topic, start_time, duration, userId} = req.body;
    // const { data } = await zoomus.meeting.create({
    //   topic,
    //   start_time,
    //   duration,
    // });
    // const join_url = data.join_url;
    const zoomMeeting = new ZoomMeeting({
      topic,
      start_time,
      duration,
      userId
    });
    await zoomMeeting.save();
    res.status(201).json(zoomMeeting);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getZoomMeetings = async (req, res) => {
  try {
    const zoomMeetings = await ZoomMeeting.find();
    res.status(200).json(zoomMeetings);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getZoomMeetingById = async (req, res) => {
  try {
    const { userId } = req.params;
    const zoomMeeting = await ZoomMeeting.find({userId: {$in:userId}});
    if (!zoomMeeting) {
      return res.status(404).send('Zoom meeting not found');
    }
    res.status(200).json(zoomMeeting);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.updateZoomMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const { topic, start_time, duration } = req.body;
    const zoomMeeting = await ZoomMeeting.findById(id);
    if (!zoomMeeting) {
      return res.status(404).send('Zoom meeting not found');
    }
    zoomMeeting.topic = topic;
    zoomMeeting.start_time = start_time;
    zoomMeeting.duration = duration;
    await zoomMeeting.save();
    res.status(200).json(zoomMeeting);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.deleteZoomMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const zoomMeeting = await ZoomMeeting.findById(id);
    if (!zoomMeeting) {
      return res.status(404).send('Zoom meeting not found');
    }
    await zoomus.meeting.delete({ id: zoomMeeting.zoom_id });
    await zoomMeeting.remove();
    res.status(200).json({ msg: 'Zoom meeting deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
    }
};