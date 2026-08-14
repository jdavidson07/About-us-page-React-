import { useState, useEffect, useRef } from 'react';
import useScrollReveal from "./useScrollReveal";
import { useSearch } from "./SearchContext";

const QUESTIONS = [
    {
        q: "I feel stressed out all the time",
        a: "This is an issue many people face, don't worry. To help, you can use the 3-2-1 Grounding Technique, outlined in our resource page. Acknowledge 5 things you see, 4 you can touch, 3 you hear, 2 you can smell, and 1 you can taste."
    },
    {
        q: "I feel stuck by a deadline", 
        a: "Deadlines can be pressuring and stressful. To reduce this anxiety, find a relaxing environment where you are most comfortable. Focus on a single task at a time, creating healthy work habits. Remember, pace yourself and take a few minutes, an hour or a whole day. Once refreshed, it will be much easier to work on."
    },
    {
        q: "Im having a hard time focusing lately",
        a: null, 
        pomodoroList: true 
    },
    {
        q: "I feel guilty about taking a break", 
        a: "This feeling can come when you're under a lot of stress. For your best productivity, take scheduled breaks in the day so that your mind and body can get the rest it needs. This not only prevents burnout, but improves focus and overall well-being. Remember, breaks are necessary."
    },
    {
        q: "I'm under a lot of pressure right now", 
        a: "Feeling anxious and stressed can be managed effectively by practicing mindfulness, eating and sleeping well and ensuring you get exercise. Use our Box breathing technique found in the Coping tools and Techniques page!",
        crisisText: true 
    }
];

export default function Accordion() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [matchedIndex, setMatchedIndex] = useState(null);
    const [titleRef, titleVisible] = useScrollReveal();
    const { searchTerm } = useSearch();
    const itemsRefs = useRef([]); 

    useEffect(() => {  //Search bar 
        if (searchTerm.length > 2) { 
            const lower = searchTerm.toLowerCase();
            const foundIndex = QUESTIONS.findIndex(item => item.q.toLowerCase().includes(lower) || (item.a && item.a.toLowerCase().includes(lower)));

            if (foundIndex !== -1) {
                setMatchedIndex(foundIndex);
                setActiveIndex(foundIndex);
                
                itemsRefs.current[foundIndex]?.scrollIntoView({
                    behavior: "smooth", 
                    block: "center"
                });

                const timer = setTimeout(() => setMatchedIndex(null), 2000);
                return () => clearTimeout(timer);
            }
        }
    }, [searchTerm]);
    
        


    const toggleAccordion = (index) => {
        setActiveIndex(prev => (prev === index ? null : index));
    };

    return (
        <div className="accordion-wrapper">
            <h2 className="accordion-title">How are you feeling?</h2>
            <h2 ref={titleRef} className={`accordion-title ${titleVisible ? "fade-in-visible" : ""}`}></h2>

            <div className="accordion-description"> 
                <p> <b> We know university life is challenging. Click on a student response below to explore science-backed tips to help you stay in control of your wellbeing. </b> </p>
            </div>
            
            <div id="accordion-questions"> 
                {QUESTIONS.map((item, index) => (
                    <div key={index} 
                        ref={el => (itemsRefs.current[index] = el)}
                        className={`accordion-item ${matchedIndex === index ? "search-match" : ""}`}
                    >
                        <h4 
                        onClick={() => toggleAccordion(index)}
                        className={activeIndex === index ? "active" : ""}
                        >
                            "{item.q}"
                        </h4>

                        {activeIndex === index && (
                            <div> 
                                {item.pomodoroList ?
                                <>
                                <p> A popular technique used by many university students is the Pomodoro Technique. Below we have outlined how it works, try it out!</p>
                                <ul> 
                                    <li>Set a 25-minute timer, dedicated for focused work.</li>
                                    <li> Focus on the task at hand, phone switched off</li>
                                     <li>After the time is complete, take a 5 minute break e.g going for a walk or getting a drink</li>
                                     <li>Repeat the steps, ensuring your brain gets a break</li>
                                </ul>
                                </>
                                : ( 
                            <p>
                                {item.a}
                                {item.crisisText && (
                                    <mark> Important: If you feel you are in crisis: please seek immediate help and contact 111 for NHS support or 116 123 for Samaritans.</mark>
                                )}
                                </p> 
                            )}
                            </div>
                        )}
                        </div>
                     ))}
                     </div> 
                </div> 
            );
         } 

                   
        
    

