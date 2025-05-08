import { useEffect, useState } from "react";
import Header from "../header/Header";
import Card from "../card/Card";
import css from "./layout.module.scss";
import axios from "axios";
import * as FaIcon from "react-icons/fa";
import { URL_POKEMON } from "../../../api/apiRest";

interface Pokemon {
  name: string;
  url: string;
}

export default function LayoutHome() {
  const [arrayPokemon, setArrayPokemon] = useState<Pokemon[]>([]);
  const [globalPokemon, setGlobalPokemon] = useState<Pokemon[]>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const api = async () => {
      const limit = 15;
      const xp = (page - 1) * limit;
      const apiPoke = await axios.get(
        `${URL_POKEMON}/?offset=${xp}&limit=${limit}`
      );

      setArrayPokemon(apiPoke.data.results);
    };
    api();
    getGlobalPokemon();
  }, [page]);

  const getGlobalPokemon = async () => {
    const res = await axios.get(`${URL_POKEMON}/?offset=0&limit=1000`);
    const promises = res.data.results.map((pokemon: Pokemon) => {
      return pokemon;
    });

    const results: Pokemon[] = await Promise.all(promises);
    setGlobalPokemon(results);
  };

  const filterPokemon: Pokemon[] =
    search.length > 0
      ? globalPokemon.filter((pokemon) => pokemon.name.includes(search))
      : arrayPokemon;

  const obtenerSearch = (e: string) => {
    const texto = e.toLowerCase();
    setSearch(texto);
    setPage(1);
  };

  return (
    <div className={css.layout}>
      <Header getSearch={obtenerSearch} />

      <section className={css.section_pagination}>
        <div className={css.div_pagination}>
          <span
            className={css.item_izquierdo}
            onClick={() => {
              if (page === 1) {
                return console.log("No puedo retroceder");
              }
              setPage(page - 1);
            }}
          >
            <FaIcon.FaAngleLeft />
          </span>
          <span className={css.item}> {page} </span>
          <span className={css.item}> DE </span>
          <span className={css.item}>
            {Math.round(globalPokemon.length / 15)}
          </span>
          <span
            className={css.item_derecho}
            onClick={() => {
              if (page === 67) {
                return console.log("Es el ultimo");
              }
              setPage(page + 1);
            }}
          >
            <FaIcon.FaAngleRight />
          </span>
        </div>
      </section>

      <div className={css.card_content}>
        {filterPokemon.map((card, index) => {
          return <Card key={index} card={card} />;
        })}
      </div>
    </div>
  );
}
