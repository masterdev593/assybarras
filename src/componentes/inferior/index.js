import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  footer: {
    padding: '30px 0 !important',
    borderTop: '3px solid #ffde31',
    marginTop: 'auto',
    backgroundColor: '#000'
  }
}));

export default function Inferior() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <Typography variant="body2" style={{ color: '#F8f8f8' }}>
          {'Copyright © '}
          <Link
            color="secondary"
            href="https://idfimportadora.com/"
            target="_blank"
            rel="noopener"
          >
            {'IDF Importadora '}
          </Link>
          {new Date().getFullYear()}
          {'. Todos los derechos reservados. Por '}
          <Link
            color="secondary"
            href="https://desarrollonodejs.pro/"
            target="_blank"
            rel="noopener"
          >
            Desarrollo Web NodeJS
          </Link>
        </Typography>
      </Container>
    </footer>
  );
}
