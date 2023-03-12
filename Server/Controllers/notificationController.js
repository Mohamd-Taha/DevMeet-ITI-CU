const Notifies = require('../Models/notificationModel')


const notifyCtrl = {
    createNotify: async (req, res) => {
        try {
            // console.log("INSIDE CREATE NOTIFY")
            // console.log(req.body)
            // console.log("before destructing")
            const { id, recipients, url, text, content, image,user,isRead } = req.body
            // console.log(id)
            // console.log(recipients)
            // console.log(text)
            // console.log(content)
            //if(recipients.includes(req.user._id.toString())) return;

            const notify = new Notifies({
                id, recipients, url, text, content, image, user,isRead
            })
            //user: req.user._id
            // console.log("before save in create notify")
            console.log(notify)
            
            await notify.save();

            return res.json(notify)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    removeNotify: async (req, res) => {
        try {
            const notify = await Notifies.findOneAndDelete({
                id: req.params.id, url: req.query.url
            })
            
            return res.json({notify})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getNotifies: async (req, res) => {
        try {
            console.log("from get notifics")
            console.log(req.query.id)
            //const notifies = await Notifies.findById(req.query.id);

            const notifies = await Notifies.find({recipients: req.query.id})
            .sort('-createdAt').populate('user', 'profilePicture firstName lastName')

            // let notificationToClient={id:notifies.id,isRead:}
            
            return res.json({notifies})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    isReadNotify: async (req, res) => {
        try {
            const notifies = await Notifies.findOneAndUpdate({_id: req.params.id}, {
                isRead: true
            })

            return res.json({notifies})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteAllNotifies: async (req, res) => {
        try {
            const notifies = await Notifies.deleteMany({recipients: req.user._id})
            
            return res.json({notifies})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}


module.exports = notifyCtrl