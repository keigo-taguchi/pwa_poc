import "@whereby.com/browser-sdk/embed";
import { useLocation, useNavigate } from "react-router-dom";
import "./Whereby.css";

export const WherebyMeeting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const whereby = document.querySelector("whereby-embed");
  const { url } = location.state as { url: string; id: string };
  if (whereby) {
    whereby.addEventListener("leave", () => {
      console.log("ミーティング終了");
      navigate("/pwa_poc/whereby", location.state);
    });
  }

  console.log("WherebyMeeting", url, location);
  return (
    (url && <whereby-embed room={url} />) || <div>URLが指定されてません</div>
  );
};
