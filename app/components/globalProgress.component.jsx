import { useEffect, useRef } from "react";
import { useTransition } from "@remix-run/react";
import "../styles/components/globalProgress.css";

export function useProgress() {
  const el = useRef();
  const timeout = useRef();
  const { location } = useTransition();

  useEffect(() => {
    if (!location || !el.current) {
      return;
    }

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    el.current.style.width = `0%`;

    let updateWidth = (ms) => {
      timeout.current = setTimeout(() => {
        let width = parseFloat(el.current.style.width);
        let percent = !isNaN(width) ? 10 + 0.9 * width : 0;

        el.current.style.width = `${percent}%`;

        updateWidth(100);
      }, ms);
    };

    updateWidth(300);

    return () => {
      clearTimeout(timeout.current);

      if (el.current.style.width === `0%`) {
        return;
      }

      el.current.style.width = `100%`;
      timeout.current = setTimeout(() => {
        if (el.current?.style.width !== "100%") {
          return;
        }

        el.current.style.width = ``;
      }, 200);
    };
  }, [location]);

  return el;
}

function Progress() {
  const progress = useProgress();

  return (
    <div className="wrapper">
      <div ref={progress} />
    </div>
  );
}

export default Progress;
