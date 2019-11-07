// Dead Simple Handle Change Function
/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';

export default function App() {
  const [state, setState] = React.useState({
    firstName: '',
    lastName: '',
    bio: '',
    hooks: true,
    level: 'master',
    version: '16.5'
  });

  function handleChange(evt) {
    const value =
      evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  return (
    <div className='app'>
      <form>
        <label>
          <div className='heading'>First Name</div>
          <input
            name='firstName'
            onChange={handleChange}
            type='text'
            value={state.firstName}
          />
        </label>
        <label>
          <div className='heading'>Last Name</div>
          <input
            name='lastName'
            onChange={handleChange}
            type='text'
            value={state.lastName}
          />
        </label>
        <label>
          <div className='heading'>Bio</div>
          <textarea name='bio' onChange={handleChange} value={state.bio} />
        </label>
        <label>
          <div className='heading'>With hooks</div>
          <input
            checked={state.hooks}
            name='hooks'
            onChange={handleChange}
            type='checkbox'
          />
        </label>
        <div>
          <div className='heading'>Level</div>
          <label>
            Acolyte
            <input
              checked={state.level === 'acolyte'}
              name='level'
              onChange={handleChange}
              type='radio'
              value='acolyte'
            />
          </label>
          <label>
            Master
            <input
              checked={state.level === 'master'}
              name='level'
              onChange={handleChange}
              type='radio'
              value='master'
            />
          </label>
        </div>
        <label>
          <div className='heading'>Favorite version</div>
          <select name='version' onChange={handleChange} value={state.version}>
            <option value='16.8'>v16.8.0</option>
            <option value='16.7'>v16.7.0</option>
            <option value='16.6'>v16.6.0</option>
            <option value='16.5'>v16.5.0</option>
          </select>
        </label>
      </form>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
