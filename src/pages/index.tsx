import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { Button, CircularProgress } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Avatar from '@material-ui/core/Avatar';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cookie from 'js-cookie';

import MessageDialog from '../components/universalDialog';
import api from '../utils/api';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 300,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  link: {
    textAlign: 'end',
  },
  title: {
    flexGrow: 1,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  center: {
    paddingTop: 20,
    textAlign: 'center',
  },
  enter: {
    marginTop: 20,
  },
}));

const Login = () => {
  const classes = useStyles();

  const router = useRouter();
  const [msg, setMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [progress, setProgress] = useState(false);

  const auth = async(login) => {
    await api.post('/user/login', login).then((response) => {
      Cookie.set('token', response.data.token);
      router.replace('/balance');
    }).catch((e) => {
      setMsg(e.response.data.msg);
      setOpenAlert(true);
    });
  };

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required('Usuário obrigatório'),
      password: Yup.string()
        .required('Senha obrigatória'),
    }),
    onSubmit: (login) => {
      setProgress(!progress);
      auth(login);
    },
  });

  const handleDialog = () => {
    setOpenAlert(!openAlert);
    setProgress(!progress);
  };

  return (
    <div>
      <MessageDialog
        msg={msg}
        open={openAlert}
        onClose={handleDialog}
      />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Ewally
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.container} component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form noValidate onSubmit={formik.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              placeholder="Usuário"
              name="username"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBoxIcon />
                  </InputAdornment>
                ),
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              placeholder="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              className={classes.enter}
              type="submit"
              size="large"
              fullWidth
              variant="contained"
              color="primary"
            >
              Entrar
            </Button>
            <div className={classes.center} hidden={!progress}>
              <CircularProgress />
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
