import React, { useEffect, useState } from "react";
import "./ComingSoon.css";

export default function ComingSoon() {
  const eventDate = new Date("Feb 5, 2026 00:00:00").getTime();

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [animate, setAnimate] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
  });

  const [loading, setLoading] = useState(true);

  // PRELOADER
  useEffect(() => {
    setTimeout(() => setLoading(false), 600);
  }, []);

  // COUNTDOWN LOGIC
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const dist = eventDate - now;

      const d = Math.floor(dist / (1000 * 60 * 60 * 24));
      const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((dist % (1000 * 60)) / 1000);

      setTime(prev => {
        const newAnimation = {
          days: prev.days !== d,
          hours: prev.hours !== h,
          minutes: prev.minutes !== m,
          seconds: prev.seconds !== s,
        };

        // Execute animation only on changed digit
        setAnimate(newAnimation);

        // Remove animation class automatically after animation ends
        setTimeout(() => {
          setAnimate({
            days: false,
            hours: false,
            minutes: false,
            seconds: false,
          });
        }, 500);

        return { days: d, hours: h, minutes: m, seconds: s };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {loading && (
        <div id="preloader">
          <div className="loader-container">
            {Array.from({ length: 13 }).map((_, i) => (
              <div key={i} className="particle"></div>
            ))}
          </div>
        </div>
      )}

      <div className="main-container">
        <div className="background"></div>
        <div className="gold"></div>
        <div className="flower"></div>
        <div className="vignan-logo"></div>

        <div className="timer">

          <div className="time-unit">
            <div className={`digit ${animate.days ? "change" : ""}`}>
              {time.days}
            </div>
            <div className="label">Days</div>
          </div>

          <div className="time-unit">
            <div className={`digit ${animate.hours ? "change" : ""}`}>
              {time.hours}
            </div>
            <div className="label">Hours</div>
          </div>

          <div className="time-unit">
            <div className={`digit ${animate.minutes ? "change" : ""}`}>
              {time.minutes}
            </div>
            <div className="label">Minutes</div>
          </div>

          <div className="time-unit">
            <div className={`digit ${animate.seconds ? "change" : ""}`}>
              {time.seconds}
            </div>
            <div className="label">Seconds</div>
          </div>

        </div>
      </div>
    </>
  );
}
