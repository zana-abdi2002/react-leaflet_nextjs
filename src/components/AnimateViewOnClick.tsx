import { useMapEvent } from "react-leaflet";

function AnimateViewOnClick() {
  useMapEvent("click", (e) => {
    e.target.setView(e.latlng, e.target.getZoom(), { animate: true });
  });

  return null;
}

export default AnimateViewOnClick;
