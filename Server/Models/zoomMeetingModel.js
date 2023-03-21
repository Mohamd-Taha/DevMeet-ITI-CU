// models/zoomMeetingModel.js

const mongoose = require('mongoose');

const zoomMeetingSchema = new mongoose.Schema({
  topic:{ 
    type: String,
    required: true 
  },
  userId:{
    type:[mongoose.Schema.Types.ObjectId]
  },
  start_time: { 
    type: Date, 
    required: true 
  },
  duration: { 
    type: Number, 
    required: true 
  },
  join_url: { 
    type: String 
  },
});

module.exports = mongoose.model('ZoomMeetingModel', zoomMeetingSchema);
