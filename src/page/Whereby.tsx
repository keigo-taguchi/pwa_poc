import React, { useEffect, useState } from "react";
import "./Whereby.css";
import { createMeeting, deleteMeetingRooms } from "../logic/whereby-api";
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
  const [disabledButtons, setDisabledButtons] = useState([
    false,
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
    alert("ミーティングに参加します");
    console.log("ミーティングに参加します", hostMeetingUrl);
    navigate("/pwa_poc/whereby-meeting", {
      state: { url: hostMeetingUrl, id: meetingId },
    });
  };

  const joinMeetingGuest = () => {
    alert("ミーティングに参加します");
    console.log("ミーティングに参加します", guestMeetingUrl);
    navigate("/pwa_poc/whereby-meeting", {
      state: { url: guestMeetingUrl, id: meetingId },
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
    ]);
  }, [meetingId, hostMeetingUrl, guestMeetingUrl]);

  return (
    <div className="Container">
      <div className="ButtonContainer">
        <button onClick={createMeetingRoom} disabled={disabledButtons[0]}>
          <div className="ButtonText">部屋を作成する</div>
        </button>
        <button onClick={joinMeetingHost} disabled={disabledButtons[1]}>
          <div className="ButtonText">ホストで参加する</div>
        </button>
        <button onClick={joinMeetingGuest} disabled={disabledButtons[2]}>
          <div className="ButtonText">ゲストで参加する</div>
        </button>
        <button onClick={deleteMeeting} disabled={disabledButtons[3]}>
          <div className="ButtonText">ミーティングスペースを削除する</div>
        </button>
      </div>
    </div>
  );
};
