import { useState, useEffect, useRef } from "react"; 

export default function useScrollReveal(options = {threshold: 0.2}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersection) {
                setIsVisible(true);
                observer.unobserver(entry.target);
            }
        }, options);

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return [ref, isVisible];
}
