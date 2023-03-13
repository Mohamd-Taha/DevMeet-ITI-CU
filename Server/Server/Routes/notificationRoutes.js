const router = require('express').Router()
// const auth = require('../MiddleWares/authMW')
const notifyCtrl = require('../Controllers/notificationController')

router.post('/notification', notifyCtrl.createNotify)

router.delete('/notification/:id',notifyCtrl.removeNotify)

router.get('/notifications',   notifyCtrl.getNotifies)

router.patch('/isReadNotification/:id',  notifyCtrl.isReadNotify)

router.delete('/deleteAllnotification', notifyCtrl.deleteAllNotifies)
/** 
router.post('/notification', auth, notifyCtrl.createNotify)

router.delete('/notification/:id', auth, notifyCtrl.removeNotify)

router.get('/notifications', auth, notifyCtrl.getNotifies)

router.patch('/isReadNotification/:id', auth, notifyCtrl.isReadNotify)

router.delete('/deleteAllnotification', auth, notifyCtrl.deleteAllNotifies)
*/


module.exports = router