import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" style={{ color: '#F8f8f8' }}>
      {'Copyright © '}
      <Link
        color="secondary"
        href="https://idfimportadora.com/"
        target="_blank"
        rel="noopener"
      >
        IDF Importadora
      </Link>
      {new Date().getFullYear()}
      {'. Todos los derechos reservados. Desarrollado por '}
      <Link
        color="secondary"
        href="https://desarrollonodejs.pro/"
        target="_blank"
        rel="noopener"
      >
        Desarrollo Web NodeJS
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    color: '#f8f8f8'
  },
  footer: {
    padding: '30px 0 !important',
    borderTop: '3px solid #ffde31',
    marginTop: 'auto',
    backgroundColor: '#000'
  }
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom>
          Beta
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Beta2
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero fugiat
          sequi optio. Rerum autem et sint quisquam accusantium dolorem nihil
          corrupti reiciendis dolor, incidunt consequuntur voluptas ducimus
          fugit sunt iusto! Expedita facilis dolorum explicabo corrupti odio,
          omnis sint magni, cupiditate est repudiandae voluptate quas eligendi
          cum atque recusandae! Mollitia similique beatae fugit molestiae
          facilis temporibus quas, reprehenderit eos veniam impedit! Impedit
          nostrum dolore omnis. Accusantium odit ea nemo, aliquid reiciendis in
          quo facere aliquam provident dolores sequi id velit reprehenderit
          eveniet. Adipisci maxime provident architecto similique, molestias
          quae laudantium qui! Quisquam possimus nihil ipsa ex quaerat accusamus
          id labore. Aliquid velit quas doloribus alias unde perferendis dolores
          molestias sapiente ipsa, praesentium adipisci vel natus voluptate,
          officiis architecto temporibus animi earum. Fugit iste voluptatem
          dolores praesentium neque culpa, reiciendis dolorum esse nam nobis
          dicta ut aspernatur, eos perspiciatis ratione dolor obcaecati, enim
          quidem exercitationem doloribus cupiditate! Vero autem sunt fuga
          repellendus. Fugit laborum voluptatibus aspernatur praesentium quis
          obcaecati nesciunt temporibus rerum atque ducimus est dicta deleniti
          maiores officiis illo, deserunt ipsa nulla error perspiciatis quae.
          Eos perferendis ullam quisquam exercitationem totam. Similique unde
          incidunt iure a aliquid iste cupiditate minima, earum, laboriosam
          magnam aliquam omnis repudiandae at nostrum quo? Cumque nam ipsa neque
          nisi blanditiis, rem quod. Incidunt recusandae iure distinctio! Velit
          impedit quas ipsam autem ea? Officiis ipsam, iste enim illo quia
          obcaecati similique odit mollitia qui suscipit porro ab voluptate
          velit pariatur reiciendis odio amet! Ad commodi dolore rerum! Id
          dolore numquam rerum, recusandae quam soluta ea, deleniti eius eos
          est, nobis dignissimos provident alias magnam tempore? Neque labore,
          dolore debitis natus expedita temporibus dolorem nihil repudiandae
          dignissimos incidunt! Optio, eligendi. Reiciendis praesentium magnam
          delectus nulla. Blanditiis, cum? Saepe modi deleniti corporis quod
          delectus excepturi minus, eligendi, reprehenderit blanditiis ipsam
          eveniet ab accusantium laboriosam fugiat veritatis exercitationem
          alias debitis.
        </Typography>
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="md">
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
