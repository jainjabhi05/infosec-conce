import { useEffect, useState } from "react";
import styles from "../styles/Countdown.module.css";

const Countdown = () => {
  // Set the future date to 30 days (1 month) from now
  const futureTime = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;

  let [time, setTime] = useState(0);

  // Update time function, subtracting the current time from the future time
  let updateTime = () => setTime(Math.max(futureTime - Date.now() / 1000, 0));

  useEffect(() => {
    if (time === 0) updateTime();
    const interval = setInterval(updateTime, 5000);

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [time]);

  return (
    <div className={styles.timerContainer}>
      <ul className={styles.timer}>
        <CountdownRing time={time / 86400} label={"days"} max={30} />
        <CountdownRing time={(time % 86400) / 3600} label={"hours"} max={24} />
        <CountdownRing
          time={((time % 86400) % 3600) / 60}
          label={"minutes"}
          max={60}
        />
      </ul>
    </div>
  );
};

const CountdownRing = ({ time, label, max }) => {
  max = time > max ? time + 0.001 : max;
  const radius = 50 / Math.sqrt(2);
  const offset = 50 - radius;
  const angle = (time / max) * 2 * Math.PI;
  const large = angle > Math.PI ? 1 : 0;
  const sweep = angle > 0 ? 1 : 0;
  const startX = offset + radius;
  const startY = offset;
  const endX = offset + radius * (Math.cos(angle - Math.PI / 2) + 1);
  const endY = offset + radius * (Math.sin(angle - Math.PI / 2) + 1);
  return (
    <li>
      <svg viewBox="0,0,100,100" className={styles.countdownArc}>
        <circle cx="50" cy="50" r={radius.toString()} />
        <path
          d={`M ${startX} ${startY} A ${radius} ${radius} 0 ${large} ${sweep} ${endX} ${endY}`}
          visibility={angle == 0 ? "hidden" : "visible"}
        />
        <text x="50%" y="50%">
          {Math.floor(time).toString().padStart(2, "0")}
        </text>
        <text x="50%" y="50%">
          {label}
        </text>
      </svg>
    </li>
  );
};

export default Countdown;
