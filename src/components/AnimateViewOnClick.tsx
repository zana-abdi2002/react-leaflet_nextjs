import { useMapEvent } from "react-leaflet";

/**
 * Listens to map clicks and moves the map to the clicked location
 * with an animation.
 */
function AnimateViewOnClick() {
  useMapEvent("click", (e) => {
    e.target.setView(e.latlng, e.target.getZoom(), { animate: true });
  });

  return null;
}

export default AnimateViewOnClick;
