// import notificationController from './Controllers/notificationController'
// import notificationModel from './Models/notificationModel'
const notificationModel = require("./Models/notificationModel");
const notificationController = require("./Controllers/notificationController");
const userAuth = require("./Models/userAuthModel");

//array of {id,socketID,followers}
let users = [];
var notifyCreator;

const EditData = (data, id, call) => {
  const newData = data.map((item) =>
    item.id === id ? { ...item, call } : item
  );
  return newData;
};

const SocketServer = (socket, io) => {
  // socket.on('notify', data => {
  //     console.log(data);
  // })
  socket.on("test", () => {
    socket.emit("recieveTest", "done");
  });
  // Connect - Disconnect
  socket.on("joinUser", (user) => {
    const ifExist = users.filter((elm) => {
      user._id == elm.id;
    });
    if (ifExist.length == 0) {
      users.push({
        id: user._id,
        socketId: socket.id,
        followers: user.followers,
      });
    }
    console.log("joinUser emit recieved");
    console.log(socket.id);
    console.log(users);
  });

  socket.on("disconnect", () => {
    const data = users.find((user) => user.socketId === socket.id);
    if (data) {
      const clients = users.filter((user) =>
        data.followers.find((item) => item._id === user.id)
      );

      if (clients.length > 0) {
        clients.forEach((client) => {
          socket.to(`${client.socketId}`).emit("CheckUserOffline", data.id);
        });
      }

      if (data.call) {
        const callUser = users.find((user) => user.id === data.call);
        if (callUser) {
          users = EditData(users, callUser.id, null);
          socket.to(`${callUser.socketId}`).emit("callerDisconnect");
        }
      }
    }

    users = users.filter((user) => user.socketId !== socket.id);
  });

  // Notification
  socket.on("notify", (msg) => {
    console.log(users);
    console.log("***********notify emit recieved on server ************");
    console.log(msg);
    var reciIds = msg.recipients.map((e) => e.id);
    console.log(
      "🚀 ~ file: notifySocket.js:71 ~ socket.on ~ reciIds:",
      reciIds
    );
    const client = users.filter((user) => reciIds.includes(user.id));
    console.log("🚀 ~ file: notifySocket.js:74 ~ socket.on ~ client:", client);

    for (let x = 0; x < client.length; x++) {
      io.to(client[x].socketId).emit("createNotifyToClient", msg);
    }
  });

  socket.on("removeNotify", (msg) => {
    const client = users.find((user) => msg.recipients.includes(user.id));
    client && socket.to(`${client.socketId}`).emit("removeNotifyToClient", msg);
  });
};

module.exports = SocketServer;
