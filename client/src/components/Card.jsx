import React from 'react';

const Card = ({ title, description, inglist, inslist }) => {

  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <ul>
        {Array.isArray(inglist) && inglist.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <ol>
        {Array.isArray(inslist) && inslist.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
};

export default Card;
