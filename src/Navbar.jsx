import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <button id="navbar__logo">STRESS LESS</button>

        <ul className="navbar__menu">
          <li className="navbar__item">
            <button className="navbar__links">Home</button>
          </li>
          <li className="navbar__item">
            <button className="navbar__links">About Us</button>
          </li>
          <li className="navbar__item">
            <button className="navbar__links">Coping Tools</button>
          </li>
          <li className="navbar__item">
            <button className="navbar__links">Resources</button>
          </li>

          <SearchBar />

          <li className="navbar__btn">
            <button className="button">Contact Us</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}