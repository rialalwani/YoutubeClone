import { Server } from "socket.io";
import Group from "./Models/Group.js";

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: true,
  });
  //const userIdToSocketId = new Map();
  //const socketIdToUserId = new Map();
  io.on("connection", (socket) => {
    console.log("Socket connected", socket.id);

    socket.on("join_group", (groupId) => {
      socket.join(groupId);
    });

    // Send message
    socket.on("send_message", async (data) => {
      try {
        console.log(data);
        const group = await Group.findById(data.groupId);
        console.log(group);

        if (!group) return;
        
          group.messages.push({senderId:data.senderId,text:data.text});
          console.log({senderId:data.senderId,text:data.text});
         
          await group.save();

        io.to(data.groupId).emit("receive_message", {senderId:data.senderId,text:data.text});
      } catch (err) {
        console.error(err);
      }
    });

    // In your socket.io setup (wherever you have join_group, send_message etc.)

socket.on("call_started", ({ groupId, username }) => {
  socket.to(groupId).emit("call_active", { username, active: true });
});

socket.on("call_ended", ({ groupId, username }) => {
  socket.to(groupId).emit("call_active", { username, active: false });
});

    /*socket.on("room:join",data=>{
            const {email,room}=data
            console.log(email,room)

            emailToSocketIdMap.set(email,socket.id)
            socketIdToMap.set(socket.id,email)
            socket.join(room)
            io.to(room).emit("user:joined",{email,id:socket.id})//sending event and data to all users in room
            io.to(socket.id).emit("room:join",data)//sending event and data to only sender
        })*/

    /*socket.on("get-online", ({ userid }) => {
      userIdToSocketId.set(userid, socket.id);
      socketIdToUserId.set(socket.id, userid);
    });

    socket.on("user:call", ({ to, offer, roomId }) => {
      console.log("to:", to);
      console.log(socket.id);
      if (userIdToSocketId.has(to)) {
        let receiverId = userIdToSocketId.get(to);
        io.to(receiverId).emit("incomming:call", {
          from: socket.id,
          offer,
          roomId,
        });
      } else {
        socket.emit("receiver-not-available");
      }
    });

    socket.on("call:accepted", ({ to, ans }) => {
      console.log(to, ans);
      io.to(to).emit("call:accepted", { from: to, ans });
    });

    socket.on("peer:nego:needed", ({ to, offer }) => {
      io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    });

    socket.on("peer:nego:done", ({ to, ans }) => {
      io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });*/

    
    /*socket.on("call:end", ({ to }) => {
      io.to(to).emit("call:ended");
    });*/
  });
};

export default initializeSocket;
