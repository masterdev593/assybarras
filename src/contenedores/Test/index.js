import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

function Todos({ partez }) {
  if (!isLoaded(partez)) {
    return <div>Loading...</div>;
  }
  if (isEmpty(partez)) {
    return <div>Todos List Is Empty</div>;
  }

  return (
    <div>
      <h1>partsssses</h1>
      <div>
        {JSON.stringify(partez, null, 2)}
      </div>
    </div>
  );
}

const enhance = compose(
  firebaseConnect(() => [{ path: 'partez' }]),
  connect(state => ({
    partez: state.firebase.data.partez
  }))
);

Todos.propTypes = {
  firebase: PropTypes.object.isRequired,
  partez: PropTypes.object
};

export default enhance(Todos);
