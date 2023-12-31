import React, { useState, useEffect, useContext } from "react";
import "./MemLanding1.css";
import { io } from "socket.io-client";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import RoomList from "../RoomList";
import ChatRoom from "../ChatRoom";
import MemExplore from "./pages/MemExplore";
import MemMemes from "./pages/MemMemes";
import MemTherapists from "./pages/MemTherapists";
import MemProfile from "./pages/MemProfile";
import communication from "./Communication.png";
import cosultauion from "./consultation.png";
import loupe from "./loupe.png";
import happy from "./happy.png";
import exit from "./exit.png";
import listen from "./listen.png";
import profile from "./user.png";

const MemLanding1 = () => {
  const { user, socket, setSocket } = useContext(UserContext);

  const [isReady, setIsReady] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [listener, setListener] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();
  const [senderNames, setSenderNames] = useState({});

  const [info, setInfo] = useState(null);

  const [showChatRoom, setShowChatRoom] = useState(false);
  const [showTherapist, setShowTherapist] = useState(false);
  const [showMemes, setShowMemes] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    console.log("User data changed:", user);
    localStorage.setItem("user", JSON.stringify(user));
    console.log("User data saved in local storage:", user);
  }, [user]);
  useEffect(() => {
    console.log("User data changed:", user);
    localStorage.setItem("user", JSON.stringify(user));
    console.log("User data saved in local storage:", user);
  }, [user]);

  useEffect(() => {
    window.onload = () => {
      setIsReady(true);
    };
  }, []);
  useEffect(() => {
    window.onload = () => {
      setIsReady(true);
    };
  }, []);

  useEffect(() => {
    if (isReady) {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser) {
        console.log("User data retrieved from local storage:", storedUser);
      }
    }
  }, [isReady]);

  // handle joinRoom event
  useEffect(() => {
    console.log("Useffect called");
    if (socket !== null) {
      console.log("If condition satisfied");
      socket.on("joinRoom", (data) => {
        console.log("Join room event received");
        setInfo(data);
        console.log("Data passed to frontend :", data);
        console.log(
          `Joining room ${data.roomName} with listener ${data.listener.listenerUsername}`
        );

        // store the roomName and listener properties in the state
        setRoomName(data.roomName);
        setListener(data.listener);
        setShowPopUp(true);
      });
    }
  }, [socket]);

  // handle roomJoined event
  useEffect(() => {
    if (socket !== null) {
      socket.on("roomJoined", (data) => {
        console.log("Data received by Roomjoined :", data);
        console.log(
          `Joined room ${data.roomName} with listener ${data.listener.listenerUsername}`
        );
        // store the roomName and listener properties in the state
        setRoomName(data.roomName);
        setListener(data.listener);
      });
    }
  }, [socket]);

  const handleFindListener = () => {
    console.log("Find Listener button clicked");
    if (socket === null) {
      const newSocket = io("http://localhost:5000", {
        cors: {
          origin: "http://localhost:3000",
          credentials: true,
        },
      });
      newSocket.on("connect", () => {
        console.log("Socket.IO connection opened");
        console.log("Requesting a listener for user:", user.user.username);
        newSocket.emit("memberDetails", user);

        // Emit the request event to the server with the member details and a message
        newSocket.emit("request", {
          member: user,
          message: "Anxiety",
          socket: newSocket.id,
        });
        //log the socket id
        console.log("Socket ID:", newSocket.id);
        setSocket(newSocket);
      });
    } else {
      console.log("Socket.IO connection already open");
      console.log("Requesting a listener for user:", user.user.username);
      socket.emit("memberDetails", user);
      console.log("Emitting request event to server");
      socket.emit("request", {
        member: user,
        message: "Anxiety",
        socket: socket.id,
      });
    }
  };

  const handleSenderNameUpdate = (senderId, senderName) => {
    setSenderNames((prevSenderNames) => ({
      ...prevSenderNames,
      [senderId]: senderName,
    }));
  };

  const handleJoinRoomClick = (roomName) => {
    console.log("Join Room button clicked");
    setShowPopUp(false);
    console.log("Room name:", roomName);
    socket.emit("roomJoined", { roomName, info });
    console.log("Emitting roomJoined event to server");
    setShowChatRoom(true); // set showChatRoom state to true
    setShowChatRoom(true);
    setShowExplore(false);
    setShowMemes(false);
    setShowTherapist(false);
    setShowProfile(false);
  };

  // const handleRoomSelect = (room) => {
  //   console.log("Room selected and changed:", room);
  //   setSelectedRoom({ ...room, roomName });
  //   console.log("selectedRoom:", selectedRoom);
  //   setShowChatRoom(true);
  // };

  const handleRoomSelect = (room) => {
    console.log("Room selected and changed:", room);
    setSelectedRoom(room); // Set selectedRoom to the selected room object
    setShowChatRoom(true);
    setShowExplore(false);
    setShowMemes(false);
    setShowTherapist(false);
    setShowProfile(false);
  };

  const handleTherapistClick = () => {
    setShowTherapist(true);
    setShowMemes(false);
    setShowExplore(false);
    setShowChatRoom(false);
    setShowProfile(false);
  };

  const handleMemesClick = () => {
    setShowTherapist(false);
    setShowMemes(true);
    setShowExplore(false);
    setShowChatRoom(false);
    setShowProfile(false);
  };

  const handleExploreClick = () => {
    console.log("Explore clicked");
    setShowTherapist(false);
    setShowMemes(false);
    setShowExplore(true);
    setShowChatRoom(false);
    setShowProfile(false);
  };

  const handleProfileClick = () => {
    setShowTherapist(false);
    setShowMemes(false);
    setShowExplore(false);
    setShowChatRoom(false);
    setShowProfile(true);
  };

  return (
    <div>
      <div className="flex h-screen ">
        <div className="w-3/12 flex bg-[#E6E6FA]">
          <div className=" w-3/12 ">
            <button
              className="relative bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] rounded-full p-5 mt-20 ml-2 w-16 h-16 mb-4 shadow-lg hover:shadow-2xl hover:scale-110 active:bg-opacity-80 active:scale-100"
              onClick={handleFindListener}
            >
              <img
                src={communication}
                alt="logo"
                className="about2_icon about2_oppIcon ml_icon"
              />
            </button>

            <button
              className="relative bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] rounded-full p-5 ml-2 w-16 h-16 mb-4 shadow-2xl hover:shadow-2xl hover:scale-110 active:bg-opacity-80 active:scale-100"
              onClick={handleTherapistClick}
            >
              <img
                src={cosultauion}
                alt="therapist"
                className="about2_icon about2_oppIcon"
              />
            </button>
            <button
              className="relative bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] rounded-full p-5 ml-2 w-16 h-16 mb-4 shadow-lg hover:shadow-2xl hover:scale-110 active:bg-opacity-80 active:scale-100"
              onClick={handleExploreClick}
            >
              <img
                src={loupe}
                alt="explore"
                className="about2_icon about2_oppIcon"
              />
            </button>
            <button
              className="relative bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] rounded-full p-5 ml-2 w-16 h-16 mb-4 shadow-lg hover:shadow-2xl hover:scale-110 active:bg-opacity-80 active:scale-100"
              onClick={handleMemesClick}
            >
              <img
                src={happy}
                alt="meme"
                className="about2_icon about2_oppIcon"
              />
            </button>
            <button
              className="relative bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] rounded-full p-5 ml-2 w-16 h-16 mb-4 shadow-lg hover:shadow-2xl hover:scale-110 active:bg-opacity-80 active:scale-100"
              onClick={handleProfileClick}
            >
              <img
                src={profile}
                alt="profile"
                className="about2_icon about2_oppIcon"
              />
            </button>
            <button className="relative bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] rounded-full p-5 ml-2 w-16 h-16 mb-4 shadow-lg hover:shadow-2xl hover:scale-110 active:bg-opacity-80 active:scale-100">
              <img
                src={exit}
                alt="meme"
                className="about2_icon about2_oppIcon"
              />
            </button>
          </div>
          <div className="w-9/12 pt-20">
            <RoomList onRoomSelect={handleRoomSelect} />
          </div>
        </div>
        <div className="w-9/12 bg-gray-100 p-4 ">
          {showChatRoom &&
            selectedRoom && ( // Updated condition
              <ChatRoom roomName={selectedRoom.roomName} /> // Pass the correct prop
            )}
          {showTherapist && <MemTherapists />}
          {showMemes && <MemMemes />}
          {showExplore && <MemExplore />}
          {showProfile && <MemProfile />}
          {!showChatRoom &&
            !showTherapist &&
            !showMemes &&
            !showExplore &&
            !showProfile && (
              <div className="ml1_container">
                <div className="ml1_title">
                  <h1> {user.user.username}</h1>
                  <h1>Get Yourself someone who will listen to you!!</h1>
                </div>
                <div className="ml1_text">
                  <p>Send a request to a listener of your choice.</p>
                  <p>Chat with listeners previously chosen by you.</p>
                </div>
                <div className="mem1Btn_area">
                  <div className="mem1_btn">
                    <button onClick={() => setShowChatRoom(!showChatRoom)}>
                      Text Listener
                    </button>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
      {showPopUp && (
        <div className="popup-main">
          <div className="pop-up pop-up absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-lg">
            <h2>Chat with {listener.listenerUsername}</h2>
            <p>Do you want to join the chat room?</p>
            <div className="pop-up-buttons">
              <button
                className="cancelBtn_ml p-2 mx-1"
                onClick={() => setShowPopUp(false)}
              >
                Cancel
              </button>
              <button
                className="joinBtn_ml p-2 mx-1"
                onClick={() => handleJoinRoomClick(roomName)}
              >
                Join Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemLanding1;
