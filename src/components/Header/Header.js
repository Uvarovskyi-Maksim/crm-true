import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <nav>
      <div>Текущая роль:{location.pathname} </div>
      <Link to="/manager">
        <button>manager</button>
      </Link>
      <Link to="/admin">
        <button>admin</button>
      </Link>
      <Link to="/director">
        <button>director</button>
      </Link>
    </nav>
  );
};

export default Header;
