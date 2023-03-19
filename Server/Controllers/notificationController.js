// const Notifies = require("../Models/notificationModel");

// const notifyCtrl = {
//   createNotify: async (req, res) => {
//     try {
//       console.log("INSIDE CREATE NOTIFY");
//       const {
//         id,
//         recipients,
//         url,
//         text,
//         content,
//         image,
//         user,
//         flaglike = "true",
//       } = req.body;
//       //if(recipients.includes(req.user._id.toString())) return;

//       //handle like case
//       if (!(text == "like your post." && flaglike == true)) {
//         const notify = new Notifies({
//           id,
//           recipients,
//           url,
//           text,
//           content,
//           image,
//           user,
//         });
//         //user: req.user._id
//         // console.log("before save in create notify")
//         console.log(notify);
//         await notify.save();
//         return res.json(notify);
//       } else {
//         console.log("this like notification already exists");
//         console.log("find notify + flag like true");
//         var monotify = await Notifies.find({ id: id, text: text, url: url });
//         console.log(monotify);
//         await Notifies.deleteOne({ id: id, text: text, url: url });
//         console.log("delete the previous like notifcation succesfully");
//       }
//     } catch (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
//   removeNotify: async (req, res) => {
//     try {
//       const notify = await Notifies.findOneAndDelete({
//         id: req.params.id,
//         url: req.query.url,
//       });

//       return res.json({ notify });
//     } catch (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
//   getNotifies: async (req, res) => {
//     try {
//       console.log("from get notifics");
//       console.log(req.query.id);
//       //const notifies = await Notifies.findById(req.query.id);

//       // const notifies = await Notifies.find({ recipients: {$elemMatch :{id:req.query.id}} },'id user ')
//       const notifies = await Notifies.find({
//         "recipients.id": { $in: req.query.id },
//       }).sort("-createdAt");
//       // .populate("user", "profilePicture firstName lastName");

//       return res.json(notifies);
//     } catch (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
//   isReadNotify: async (req, res) => {
//     try {
//       const notifies = await Notifies.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//           isRead: true,
//         }
//       );

//       return res.json({ notifies });
//     } catch (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
//   deleteAllNotifies: async (req, res) => {
//     try {
//       const notifies = await Notifies.deleteMany({ recipients: req.user._id });

//       return res.json({ notifies });
//     } catch (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
// };

// module.exports = notifyCtrl;


const Notifies = require("../Models/notificationModel");

const notifyCtrl = {
  createNotify: async (req, res) => {
    try {
      console.log("INSIDE CREATE NOTIFY");
      const {
        id,
        recipients,
        url,
        text,
        content,
        image,
        user,
        flaglike = "true",
      } = req.body;
      //if(recipients.includes(req.user._id.toString())) return;

      //handle like case
      if (!(text == "like your post." && flaglike == true)) {
        const notify = new Notifies({
          id,
          recipients,
          url,
          text,
          content,
          image,
          user,
        });
        //user: req.user._id
        // console.log("before save in create notify")
        console.log(notify);
        await notify.save();
        return res.json(notify);
      } else {
        console.log("this like notification already exists");
        console.log("find notify + flag like true");
        var monotify = await Notifies.find({ id: id, text: text, url: url });
        console.log(monotify);
        await Notifies.deleteOne({ id: id, text: text, url: url });
        console.log("delete the previous like notifcation succesfully");
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  removeNotify: async (req, res) => {
    try {
      const notify = await Notifies.findOneAndDelete({
        id: req.params.id,
        url: req.query.url,
      });

      return res.json({ notify });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getNotifies: async (req, res) => {
    try {
      console.log("from get notifics");
      console.log(req.query.id);
      //const notifies = await Notifies.findById(req.query.id);

      // const notifies = await Notifies.find({ recipients: {$elemMatch :{id:req.query.id}} },'id user ')
      const notifies = await Notifies.find({
        "recipients.id": { $in: req.query.id },
      }).sort("-createdAt");
      // .populate("user", "profilePicture firstName lastName");
      // return res.json("result")
      return res.json(notifies);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  isReadNotify: async (req, res) => {
    try {
      const notifies = await Notifies.findOneAndUpdate(
        { _id: req.params.id },
        {
          isRead: true,
        }
      );

      return res.json({ notifies });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteAllNotifies: async (req, res) => {
    try {
      const notifies = await Notifies.deleteMany({ recipients: req.user._id });

      return res.json({ notifies });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = notifyCtrl;



