// import { useState, useEffect } from "react";
// import "./Preloader.css";

// const Preloader = ({ onFinish }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [progress, setProgress] = useState(0);
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     if (document.readyState === "complete") {
//       finishLoading();
//       return;
//     }

//     const progressInterval = setInterval(() => {
//       setProgress(prev => (prev >= 90 ? prev : prev + Math.random() * 12));
//     }, 200);

//     const handleLoad = () => finishLoading();

//     window.addEventListener("load", handleLoad);

//     const fallback = setTimeout(() => finishLoading(), 5000);

//     function finishLoading() {
//       setProgress(100);
//       setTimeout(() => {
//         setIsLoading(false);
//         setTimeout(() => {
//           setVisible(false);
//           onFinish && onFinish();
//         }, 500); // fade duration
//       }, 300);
//     }

//     return () => {
//       clearInterval(progressInterval);
//       clearTimeout(fallback);
//       window.removeEventListener("load", handleLoad);
//     };
//   }, []);

//   if (!visible) return null;

//   return (
//     <div id="preloader" className={!isLoading ? "fade-out" : ""}>
//       <div className="loader-wrapper">
//         <div className="loader-ring">
//           <div className="loader-ring-inner"></div>
//         </div>

//         <div className="loader-content">
//           <div className="loader-logo">🎉</div>
//           <h2 className="loader-title">Vignan Mahotsav</h2>
//           <p className="loader-subtitle">Preparing the celebration...</p>

//           <div className="progress-bar">
//             <div
//               className="progress-fill"
//               style={{ width: `${progress}%` }}
//             />
//           </div>

//           <span className="progress-text">
//             {Math.round(progress)}%
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Preloader;
import { useEffect, useState } from "react";
import "./Preloader.css";

const Preloader = ({ visible = true, onFinish }) => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => {
        setShouldRender(false);
        onFinish && onFinish();
      }, 600); // matches CSS fade-out
      return () => clearTimeout(timer);
    }
  }, [visible, onFinish]);

  if (!shouldRender) return null;

  return (
    <div className={`preloader ${!visible ? "fade-out" : ""}`}>
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Preloader;
