import { useState, useEffect, useRef } from "react";
import useScrollReveal from "./useScrollReveal";
import { useSearch } from "./SearchContext";
import Accordion from "./Accordion";
import MilestoneTracker from "./MilestoneTracker";

const SECTIONS = [
  {
    id: "hero",
    text: "StressLess was made by students, for students. We understand deeply the stress that comes with coursework, exams and deadlines in the university experience."
  },
  {
    id: "who-we-are",
    text: "StressLess is a student-focused health and wellbeing site, created to tackle the pressures of academic life. We provide users with evidence-based knowledge, coping tools and techniques, and external resources."
  },
  {
    id: "stories",
    text: "Adrian - Computing Science at Ulster University, Belfast. I turned to StressLess when I was discouraged and needed to alleviate pressure in managing coursework, exams, studying and balancing social life. I used their grounding techniques such as focusing on my breathing and the 3-3-3 rule."
  }
];

export default function AboutUs() {
  const [whoWeAreRef, whoWeAreVisible] = useScrollReveal();
  const [storiesRef, storiesVisible] = useScrollReveal();
  const { searchTerm } = useSearch();

  const sectionRefs = useRef([]);
  const [matchedId, setMatchedId] = useState(null);

  useEffect(() => {
    if (searchTerm.length > 2) {
      const lower = searchTerm.toLowerCase();
      const foundIndex = SECTIONS.findIndex(section =>
        section.text.toLowerCase().includes(lower)
      );

      if (foundIndex !== -1) {
        const matchedSectionId = SECTIONS[foundIndex].id;
        setMatchedId(matchedSectionId);

        sectionRefs.current[foundIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

        const timer = setTimeout(() => setMatchedId(null), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [searchTerm]);

  return (
    <>
      <div className="header-wrapper">
        <div className="site-branding">
          <img src="/images/new_stressless_logo.png" alt="StressLess logo" className="site-logo" />
          <p className="gradient-text">Stress Less, Learn more</p>
        </div>
      </div>

      <div className="top-content-row">
        <div
          className={`center-column ${matchedId === "hero" ? "search-match" : ""}`}
          ref={el => (sectionRefs.current[0] = el)}
        >
          <h2 className="about-us-title">ABOUT OUR BRAND</h2>
          <div className="top-box">
            <p>
              <strong>StressLess was made by students, for students.</strong> We
              understand deeply the stress that comes with coursework, exams and
              deadlines in the university experience. We feel that personal health
              and wellbeing matter most when navigating these challenges in our
              everyday lives, which is why we created this service to improve your
              wellbeing.
            </p>
          </div>
        </div>

        <div className="student-image-column">
          <img src="/images/student-support.jpg" className="student-support" alt="Student talking to staff in a support session" />
        </div>
      </div>

      <div className="middle-content">
        <div
          className={`who-we-are-container ${whoWeAreVisible ? "reveal-active" : ""} ${matchedId === "who-we-are" ? "search-match" : ""}`}
          ref={el => {
            whoWeAreRef.current = el;
            sectionRefs.current[1] = el;
          }}
        >
          <h2 className="who-we-are">Who we are:</h2>
          <div className="text-block-1">
            <p>
              StressLess is a student-focused <b>health and wellbeing</b> site,
              created to <b>tackle the pressures</b> of academic life that students
              face, because we believe students shouldn't feel <b>overwhelmed</b> when
              achieving their university degree.
            </p>
            <p>
              We provide users with <b> evidence-based knowledge</b>,
              <b>coping tools and techniques</b>, and external resources for your
              <b>full support</b>. We know your mental health journey is personal, and as such we promise to deliver expert, science-led advice using
              <b>cognitive reframing methods</b> to help you stay in control of your <b>wellbeing</b>.
            </p>
          </div>
        </div>

        <div
          className={`stories-container ${storiesVisible ? "reveal-active" : ""} ${matchedId === "stories" ? "search-match" : ""}`} //search and scroll
          ref={el => {
            storiesRef.current = el;
            sectionRefs.current[2] = el;
          }}
        >
          <h3 className="student-stories">Student Stories:</h3>
          <h4 className="student-title">Adrian - Computing Science at Ulster University, Belfast.</h4>
          <div className="text-block-2">
            <p>
              After hearing recommendations from some of my mates, I turned to
              <b>StressLess</b> when I was discouraged and needed to alleviate
              pressure in managing coursework, exams, studying and balancing social
              life. I used their <b>grounding techniques</b> such as focusing on my
              breathing and the <b>3-3-3 rule</b> which helped me stay in the moment
              and relieve my <b>anxiety</b>.
            </p>
            <p>
              StressLess also provided me with additional resources including
              <b>guided meditation</b> and personal <b>1-1 counselling</b> sessions
              in the future. Ultimately, this site aided me in clearing my mind,
              leaving me being more present in life.
            </p>
          </div>
        </div>
      </div>

      <div className="quote-wrapper">
        <div className="quote-container">
          <i className="fa fa-quote-left quote-icon"></i>
          <p className="quote-text">
            Having things in my life that I enjoy doing reduces the worries that I
            get - <i>Adrian</i>
          </p>
          <i className="fa fa-quote-right quote-icon"></i>
        </div>
      </div>

      <div className="page-divider2"></div>

      <div className="bottom-section-container">
        <div className="flex-row">
          <Accordion />
          <MilestoneTracker />
        </div>
      </div>
    </>
  );
}