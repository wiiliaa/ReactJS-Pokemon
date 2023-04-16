import React from "react";
import { Detail, PokemonDetail } from "../interface";
import PokemonList from "./PokemonList";
import "./pokemon.css";

interface Props {
  pokemons: PokemonDetail[];
  viewDetail: Detail;
  setViewDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonColection: React.FC<Props> = (props) => {
  const { pokemons, viewDetail, setViewDetail } = props;

  const select = (id: number) => {
    if (!viewDetail.isOpen) {
      setViewDetail({
        id: id,
        isOpen: true,
      });
    }
  };
  return (
    <section className="collection-container">
      {pokemons.map((pokemon) => {
        return (
          <div onClick={() => select(pokemon.id)}>
            <PokemonList
              viewDetail={viewDetail}
              setViewDetail={setViewDetail}
              key={pokemon.id}
              name={pokemon.name}
              id={pokemon.id}
              abilities={pokemon.abilities}
              image={pokemon.sprites.front_default}
            />
          </div>
        );
      })}
    </section>
  );
};

export default PokemonColection;
