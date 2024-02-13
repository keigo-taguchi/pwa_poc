import "@whereby.com/browser-sdk/embed";
import { useLocation, useNavigate } from "react-router-dom";

export const WherebyMeeting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const whereby = document.querySelector("whereby-embed");

  if (whereby) {
    whereby.addEventListener("leave", () => {
      console.log("ミーティング終了");
      navigate("/pwa_poc/whereby", location.state);
    });
  }
  const { url } = location.state as { url: string };
  console.log("WherebyMeeting", url, location);
  return (
    (url && <whereby-embed room={url} />) || <div>URLが指定されてません</div>
  );
};
