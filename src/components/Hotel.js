import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE = "https://picsum.photos/200/300?random=0";

const Hotel = ({ hoteles }) => {
  // Verificamos si existe la imagen, si no, ponemos una por defecto
  const poster = hoteles.image === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : hoteles.image;

  return (
    <div className="hotel">
      <h2>{hoteles.name}</h2>
      <div>
        <img
          width="200"
          alt={`Hotel: ${hoteles.name}`}
          src={poster}
        />
      </div>
      <p>Estrellas: {hoteles.stars}</p>
      <p>Precio por noche: ${hoteles.price}</p>
    </div>
  );
}
console.log("Busqueda encontrada con exito");

export default Hotel;