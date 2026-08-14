export default function Navbar({ setPage }) {
    return ( 
    <nav className="navbar"> 
        <div className="navbar__container"> 
             <button onClick={() => setPage("home")} id="navbar__logo">STRESS LESS</button>
             <ul className="navbar__menu">
            <li className="navbar__item"><button onClick={() => setPage('home')} className="navbar__link">Home</button></li>
            <li className="navbar__item"><button onClick={() => setPage('about')} className="navbar__links">About Us</button></li>
            <li className="navbar__item"><button onClick={() => setPage('coping')} className="navbar__links">Coping Tools</button></li>
            <li className="navbar__item"><button onClick={() => setPage('resources')} className="navbar__links">Resources</button></li>
            <li className="navbar__item"><button onClick={() => setPage('contact')} className="navbar__links">Contact</button></li>
            </ul>
        </div>
    </nav>
    );
} 
    