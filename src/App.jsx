// import { useState } from "react";
// import Preloader from "./components/Preloader";
// import ComingSoon from "./ComingSoon";

// export default function App() {
//   const [ready, setReady] = useState(false);

//   return (
//     <>
//       <ComingSoon />
//       <Preloader onFinish={() => setReady(true)} visible={!ready} />
//     </>
//   );
// }
import { useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import ComingSoon from "./ComingSoon";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (replace with real loading later)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ComingSoon />
      <Preloader visible={loading} />
    </>
  );
}
