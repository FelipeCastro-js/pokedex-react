import css from "./header.module.scss";
import logo from "../../../assets/pokemon.png";
import * as FaIcons from "react-icons/fa";
import { FC } from "react";

interface HeaderProps {
  getSearch: (value: string) => void;
}

const Header: FC<HeaderProps> = ({ getSearch }) => {
  return (
    <nav className={css.header}>
      <div className={css.div_header}>
        <div className={css.div_logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={css.div_search}>
          <div>
            <FaIcons.FaSearch />
          </div>
          <input
            type="search"
            placeholder="Escribe el nombre de tu pokemon favorito"
            onChange={(e) => getSearch(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
