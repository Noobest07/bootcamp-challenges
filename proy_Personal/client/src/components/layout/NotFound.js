import React from 'react';

const NotFound = () => {
  return (
    <section className="container">
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle" /> Página no encontrada
      </h1>
      <p className="large">Lo sentimos, esta página no existe</p>
    </section>
  );
};

export default NotFound;
