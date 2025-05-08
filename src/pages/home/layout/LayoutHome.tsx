import Header from "../header/Header";
import Card from "../card/Card";
import css from "./layout.module.scss";
import axios from "axios";
import { URL_POKEMON } from "../../../api/apiRest";
import { useEffect, useState } from "react";

export default function LayoutHome() {
  const [arrayPokemon, setArrayPokemon] = useState([]);

  useEffect(() => {
    const api = async () => {
      const apiPoke = await axios.get(`${URL_POKEMON}`);

      setArrayPokemon(apiPoke.data.results);
    };
    api();
  }, []);

  return (
    <div className={css.layout}>
      <Header />

      <div className={css.card_content}>
        {arrayPokemon.map((card, index) => {
          return <Card key={index} card={card} />;
        })}
      </div>
    </div>
  );
}
