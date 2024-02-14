import React, { useEffect, useState } from "react";
import "./Whereby.css";
import {
  createMeeting,
  deleteMeetingRooms,
  getMeetingRooms,
} from "../logic/whereby-api";
import { useNavigate } from "react-router";

export const Whereby: React.FC = () => {
  const navigate = useNavigate();

  const [guestMeetingUrl, setGuestMeetingUrl] = useState(
    sessionStorage.getItem("guestMeetingUrl") || ""
  );
  const [hostMeetingUrl, setHostMeetingUrl] = useState(
    sessionStorage.getItem("hostMeetingUrl") || ""
  );
  const [meetingId, setMeetingId] = useState(
    sessionStorage.getItem("meetingId") || ""
  );
  const [text, setText] = useState("");
  const [disabledButtons, setDisabledButtons] = useState([
    false,
    true,
    true,
    true,
    true,
  ]);
  const createMeetingRoom = async () => {
    console.log("部屋を作成します");
    const meetingUrl = await createMeeting();
    console.log("部屋を作成しました", meetingUrl);
    setGuestMeetingUrl(meetingUrl.guestRoomUrl);
    setHostMeetingUrl(meetingUrl.hostRooUrl);
    setMeetingId(meetingUrl.meetingId);
  };
  useEffect(() => {
    console.log("Whereby", meetingId);
    console.log("Whereby", hostMeetingUrl);
    console.log("Whereby", guestMeetingUrl);
    sessionStorage.setItem("hostMeetingUrl", hostMeetingUrl);
    sessionStorage.setItem("guestMeetingUrl", guestMeetingUrl);
    sessionStorage.setItem("meetingId", meetingId);
  }, [meetingId, hostMeetingUrl, guestMeetingUrl]);

  const joinMeetingHost = () => {
    alert(`ミーティングに参加します。ミーティングID: ${meetingId}`);
    console.log("ミーティングに参加します", hostMeetingUrl);
    navigate("/pwa_poc/whereby-meeting", {
      state: { url: hostMeetingUrl },
    });
  };

  const joinMeetingGuest = () => {
    alert(`ミーティングに参加します。ミーティングID: ${meetingId}`);
    console.log("ミーティングに参加します", guestMeetingUrl);
    navigate("/pwa_poc/whereby-meeting", {
      state: { url: guestMeetingUrl },
    });
  };

  const joinMeetingId = async () => {
    alert("ミーティングに参加します");
    console.log("ミーティングに参加します", guestMeetingUrl);
    const meetUrl = await getMeetingRooms(text);
    navigate("/pwa_poc/whereby-meeting", {
      state: { url: meetUrl },
    });
  };

  const deleteMeeting = async () => {
    await deleteMeetingRooms(meetingId);
    setMeetingId("");
    setHostMeetingUrl("");
    setGuestMeetingUrl("");
  };

  useEffect(() => {
    setDisabledButtons([
      meetingId !== "",
      hostMeetingUrl === "",
      guestMeetingUrl === "",
      meetingId === "",
      text === "",
    ]);
  }, [meetingId, hostMeetingUrl, guestMeetingUrl, text]);

  return (
    <div className="Container">
      <div className="ButtonContainer">
        <button
          className="Button"
          onClick={createMeetingRoom}
          disabled={disabledButtons[0]}
        >
          <div className="ButtonText">部屋を作成する</div>
        </button>
        <button
          className="Button"
          onClick={joinMeetingHost}
          disabled={disabledButtons[1]}
        >
          <div className="ButtonText">ホストで参加する</div>
        </button>
        <button
          className="Button"
          onClick={joinMeetingGuest}
          disabled={disabledButtons[2]}
        >
          <div className="ButtonText">ゲストで参加する</div>
        </button>
        <button
          className="Button"
          onClick={deleteMeeting}
          disabled={disabledButtons[3]}
        >
          <div className="ButtonText">ミーティングスペースを削除する</div>
        </button>
        <button
          className="Button"
          onClick={joinMeetingId}
          disabled={disabledButtons[4]}
        >
          <div className="ButtonText">ミーティングIdを指定して参加する</div>
        </button>
        <input className="InputBox" onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};
