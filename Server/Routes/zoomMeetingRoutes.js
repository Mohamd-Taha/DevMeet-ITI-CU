
const express = require('express');
const router = express.Router();
const {
    createZoomMeeting,
    getZoomMeetings,
    getZoomMeetingById,
    updateZoomMeeting,
    deleteZoomMeeting,
} = require('../controllers/zoomMeetingController');

router.post('meetup/', createZoomMeeting);
router.get('meetup/', getZoomMeetings);
router.get('meetup/:id', getZoomMeetingById);
router.put('meetup/:id', updateZoomMeeting);
router.delete('meetup/:id', deleteZoomMeeting);

module.exports = router;