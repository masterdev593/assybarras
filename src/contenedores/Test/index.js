import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

function Partes({ partez }) {
  if (!isLoaded(partez)) {
    return <div>Cargando...</div>;
  }
  if (isEmpty(partez)) {
    return <div>Partes esta vacia</div>;
  }

  const var1 = Object.keys(partez).map((key, id) => (
    <li id={id} key={key}>
      {partez[key].parte} + {partez[key].descripcion}
    </li>
  ));
  return (
    <div>
      <h1>Partes</h1>
      <ol>{var1}</ol>
    </div>
  );
}

const enhance = compose(
  firebaseConnect(['partez']),
  connect(state => ({
    partez: state.firebase.data.partez
  }))
);

Partes.propTypes = {
  firebase: PropTypes.object.isRequired,
  partez: PropTypes.object
};

export default enhance(Partes);
