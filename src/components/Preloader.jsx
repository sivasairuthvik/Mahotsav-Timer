import { useState, useEffect } from 'react';
import './Preloader.css';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if page is already loaded
    if (document.readyState === 'complete') {
      setIsLoading(false);
      return;
    }

    // Simulate progress for network loading
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 200);

    // Wait for window load event (all resources loaded)
    const handleLoad = () => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };

    window.addEventListener('load', handleLoad);

    // Fallback timeout (max 5 seconds)
    const fallbackTimer = setTimeout(() => {
      setProgress(100);
      setIsLoading(false);
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(fallbackTimer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div id="preloader" className={!isLoading ? 'fade-out' : ''}>
      <div className="loader-wrapper">
        <div className="loader-ring">
          <div className="loader-ring-inner"></div>
        </div>
        <div className="loader-content">
          <div className="loader-logo">🎉</div>
          <h2 className="loader-title">Vignan Mahotsav</h2>
          <p className="loader-subtitle">Preparing the celebration...</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="progress-text">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
