import React, { useReducer, useEffect } from 'react';
import "./Styles.css";

import { reducer, initialState } from '../Reducers/Reducer';
import Hotel from './Hotel';
import spinner from "../ajax-loader.gif";
import Buscar from './Buscar';

// DATOS LOCALES: Ya no dependemos de ninguna URL externa
const DATA_LOCAL = [
  { "name": "Hotel Click Clack Medellin", "stars": 4, "price": 1500, "image": "https://picsum.photos/200/300?random=1" },
  { "name": "Hotel Estelar Milla de Oro", "stars": 5, "price": 2500, "image": "https://picsum.photos/200/300?random=2" },
  { "name": "Hotel Dann Carlton", "stars": 5, "price": 2200, "image": "https://picsum.photos/200/300?random=3" },
  { "name": "Hotel Ibis Medellin", "stars": 3, "price": 800, "image": "https://picsum.photos/200/300?random=4" },
  { "name": "Hotel Nutibara", "stars": 3, "price": 600, "image": "https://picsum.photos/200/300?random=5" },
  { "name": "Hotel San Fernando Plaza", "stars": 4, "price": 1800, "image": "https://picsum.photos/200/300?random=6" }
];

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Carga inicial usando los datos locales
  useEffect(() => {
    dispatch({
      type: "BUSCAR_HOTELES_SUCCESS",
      payload: DATA_LOCAL
    });
  }, []);

  // Función de búsqueda filtrando el arreglo local
  const search = stars => {
    dispatch({ type: "BUSCAR_HOTELES_REQUEST" });

    // Filtramos los datos que tenemos en la variable DATA_LOCAL
    const filtrados = DATA_LOCAL.filter(h => h.stars === parseInt(stars));

    if (filtrados.length === 0) {
      dispatch({
        type: "BUSCAR_HOTELES_FAILURE",
        error: `No se encontraron hoteles con ${stars} estrellas.`
      });
    } else {
      dispatch({
        type: "BUSCAR_HOTELES_SUCCESS",
        payload: filtrados
      });
    }
  };

  const { hotels, errorMessage, loading } = state;

  return (
    <div className="App">
      <h4>Buscar Hoteles por numero de Estrellas (1 a 5)</h4>
      <Buscar search={search} />
      <p className="App-intro">Lista de Hoteles</p>
      <div className="hoteles-contenedor">
        {loading && !errorMessage ? (
          <img className="spinner" src={spinner} alt="Loading spinner" />
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          hotels.map((hoteles, index) => (
            <Hotel key={`${index}-${hoteles.name}`} hoteles={hoteles} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;