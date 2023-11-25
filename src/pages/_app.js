import "../app/styles/globals.css";

import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
