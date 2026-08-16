import { useState, useEffect } from 'react';

export default function ScrollButton() {
    const [isVisible, setIsVisible] = useState(false);
    

    useEffect(() => {  // scroll 
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth"});
    };

return (
    <button
      onClick={scrollToTop}
      id="navBtn"
      title="Navigation button"
      style={{ display: isVisible ? "block" : "none" }}
    >
      Scroll button
    </button>
  );
}
