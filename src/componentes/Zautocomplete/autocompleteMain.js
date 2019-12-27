/* eslint-disable react/display-name */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import { FixedSizeList } from 'react-window';


function renderRow(props) {
  const { data, index, style } = props;

  return React.cloneElement(data[index], {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      display: 'block',
      ...style
    }
  });
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  // const theme = useTheme();
  // const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const itemCount = Array.isArray(children) ? children.length : 0;
  // const itemSize = smUp ? 36 : 48;
  const outerElementType = React.useMemo(() => {
    return React.forwardRef((props2, ref2) => <div ref={ref2} {...props2} {...other} />);
  }, []);

  return (
    <div ref={ref}>
      <FixedSizeList
        height={150}
        innerElementType='ul'
        itemCount={itemCount}
        itemData={children}
        itemSize={48}
        outerElementType={outerElementType}
        overscanCount={5}
        style={{ padding: 0, maxHeight: 'auto' }}
        width='100%'
        >
        {renderRow}
      </FixedSizeList>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node
};

// HACK: Una funcion para generar letras ramdom
/* function random(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
} */

const useStyles = makeStyles({
  listbox: {
    '& ul': {
      padding: 0,
      margin: 0
    }
  }
});

export default function Virtualize({ catIdf }) {
  const oxtions = catIdf;
  const classes = useStyles();
  const [des, setDes] = useState('');
  const [ubi, setUbi] = useState('');
  function handleOrangeClick(event, value) {
    // Similar a this.setState({ fruit: 'orange' })
    // console.log(value.descripcion);
    setDes(value.descripcion);
    setUbi(value.ubi);
  }
  return (
    <Autocomplete
      classes={classes}
      disableClearable={true}
      disableListWrap
      filterSelectedOptions={true}
      getOptionLabel={option => option.parte}
      id='virtualize-demo'
      ListboxComponent={ListboxComponent}
      noOptionsText={'Parte no encontrada'}
      onChange={handleOrangeClick}
      options={oxtions}
      renderInput={params => (
        <div>
          <TextField {...params}
            fullWidth
            label='Nro. de Parte'
            margin='normal'
            name='parte'
            required={true}
            variant='outlined'
          />
          <TextField
            fullWidth
            label='Descripción'
            margin='normal'
            name='des'
            value={des}
            variant='outlined'
          />
          <TextField
            fullWidth
            label='Ubicación'
            margin='normal'
            name='ubi'
            value={ubi}
            variant='outlined'
          />
        </div>
      )}
      style={{ width: 300 }}
    />
  );
}


Virtualize.propTypes = {
  catIdf: PropTypes.array.isRequired
};
