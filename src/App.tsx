import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PokemonColection from "./components/PokemonColection";
import { Detail, Pokemon, Pokemons } from "./interface";

const App: React.FC = () => {
  const [pokemons, setPokemon] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [load, setLoad] = useState<boolean>(true);
  const [viewDetail, setViewDetail] = useState<Detail>({
    id: 0,
    isOpen: false,
  });
  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
      );
      setNextUrl(res.data.next);
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setPokemon((p) => [...p, poke.data]);
        setLoad(false);
      });
    };

    getPokemon();
  }, []);
  const next = async () => {
    setLoad(true);
    let res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setPokemon((p) => [...p, poke.data]);
      setLoad(false);
    });
  };
  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonColection
          pokemons={pokemons}
          viewDetail={viewDetail}
          setViewDetail={setViewDetail}
        />
        <div onClick={next}>
          <button>{load ? "Loading..." : "Load more"}</button>
        </div>
      </div>
    </div>
  );
};

export default App;
