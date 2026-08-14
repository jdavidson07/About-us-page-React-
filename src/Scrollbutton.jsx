import { useState, useEffect } from 'react';

export default function ScrollButton() {
    const [isVisible, setIsVisible] = useState(false);
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth"});

    useEffect(() => {  // scroll 
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
  
    
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
