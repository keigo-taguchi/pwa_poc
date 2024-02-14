import axios from "axios";
import { WHEREBY_API_URL } from "../util/contracts";
export type MeetingUrl = {
  meetingId: string;
  hostRooUrl: string;
  guestRoomUrl: string;
};

export const createMeeting = async (): Promise<MeetingUrl> => {
  try {
    // APIリクエスト
    const response = await axios.post(WHEREBY_API_URL, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status !== 200) {
      console.error(response.data.error);
      throw new Error(response.data.error);
    }
    console.log("Whereby API レスポンス:", response.data);
    // レスポンスデータ
    return {
      meetingId: response.data.response.meetingId,
      hostRooUrl: response.data.response.hostRoomUrl,
      guestRoomUrl: response.data.response.roomUrl,
    };
  } catch (error) {
    console.error("Whereby API エラー:", error);
    // setErrorMessage("ミーティングの作成に失敗しました。");
    return { meetingId: "", hostRooUrl: "", guestRoomUrl: "" };
  }
};

export const deleteMeetingRooms = async (deleteId: string) => {
  try {
    // APIリクエスト
    const response = await axios.post(WHEREBY_API_URL + "/delete", {
      headers: { "Content-Type": "application/json" },
      data: { meetingId: deleteId },
    });
    if (response.status !== 200) {
      throw new Error(response.data.error);
    }
    // レスポンスデータ
    return response.data;
  } catch (error) {
    console.error("Whereby API エラー:", error);
    return "";
    // setErrorMessage("ミーティングの作成に失敗しました。");
  }
};

export const getMeetingRooms = async (meetingId: string) => {
  try {
    // APIリクエスト
    const response = await axios.post(
      WHEREBY_API_URL + `?meetingId=${meetingId}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status !== 200) {
      throw new Error(response.data.error);
    }
    // レスポンスデータ
    return response.data.response.roomUrl;
  } catch (error) {
    console.error("Whereby API エラー:", error);
    return "";
  }
};
