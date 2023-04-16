import React, { useState, useEffect } from "react";
import "./pokemon.css";
import { Detail } from "../interface";
interface Props {
  viewDetail: Detail;
  setViewDetail: React.Dispatch<React.SetStateAction<Detail>>;
  name: string;
  id: number;
  image: string;
  abilities:
    | {
        name: string;
        ability: string;
      }[]
    | undefined;
}
const PokemonList: React.FC<Props> = (props) => {
  const { name, id, image, abilities, viewDetail, setViewDetail } = props;
  const [isSelect, setSelect] = useState(false);

  useEffect(() => {
    setSelect(id === viewDetail?.id);
  }, [viewDetail]);
  const exit = () => {
    setViewDetail({
      id: 0,
      isOpen: false,
    });
  };
  return (
    <div>
      {isSelect ? (
        <section className="pokemon-list-detailed">
          <div className="detail-container">
            <p className="detail-close" onClick={exit}>
              x
            </p>
            <div className="detail-infor">
              <img src={image} alt="pokemon" />
              <p className="detail-name">{name}</p>
            </div>
            <div className="detail-skill">
              <p className="detial-ability">Abilities:</p>
              {abilities?.map((ab: any) => {
                return <div>{ab.ability.name}</div>;
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="pokemon-list-container">
          <p className="pokemon-name">{name}</p>
          <img src={image} alt="pokemon" />
        </section>
      )}
    </div>
  );
};

export default PokemonList;
