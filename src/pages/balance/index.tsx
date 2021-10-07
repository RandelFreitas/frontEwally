import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { ptBR } from 'date-fns/locale';
import { parseISO } from 'date-fns';
import { format } from 'date-fns-tz';
import Collapse from '@material-ui/core/Collapse';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import IconButton from '@material-ui/core/IconButton';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MessageDialog from '../../components/universalDialog';
import api from '../../utils/api';
import Layout from '../../components/screen/layout';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  root2: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  balance: {
    minHeight: '94px',
    textAlign: 'center',
    marginBottom: '20px',
    padding: '10px',
    paddingTop: '30px',
  },
  dates: {
    textAlign: 'center',
    marginBottom: '20px',
    padding: '10px',
  },
  card: {
    textAlign: 'center',
    margin: '10px',
    padding: '10px',
  },
});

function createData(
  id: string,
  createdAt: string,
  operationType: string,
  amount: number,
  balance: string,
  cupom: string,
  userLatitude: string,
  userLongitude: string,
) {
  return {
    id,
    createdAt,
    operationType,
    amount,
    balance,
    otherInfo: {
      cupom,
      userLatitude,
      userLongitude,
    },
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{format(parseISO(row.createdAt), 'dd/MM/yyyy HH:mm', { timeZone: 'America/Sao_Paulo' })}</TableCell>
        <TableCell>{row.operationType}</TableCell>
        <TableCell>
          R$
          {' '}
          {(row.amount / 100).toString().replaceAll('.', ',')}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container>
              <Grid item sm={6} xs={12}>
                {row.otherInfo.cupom ? (
                  <Card className={classes.card}>
                    {row.otherInfo
                      ? (row.otherInfo.cupom
                        ? row.otherInfo.cupom.replaceAll('@', '\n') : '') : ''}
                  </Card>
                ) : <></>}
              </Grid>
              <Grid item sm={row.otherInfo.cupom ? 6 : 12} xs={12}>
                <Card className={classes.card}>
                  <iframe
                    title="mapa"
                    src="https://maps.google.com/maps?q=-23.62393516705907,-46.6971381739045&hl=es&z=14&amp;output=embed"
                    width="250"
                    height="200"
                    frameBorder="0"
                    aria-hidden="false"
                  />
                </Card>
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const Balance = () => {
  const classes = useStyles();

  const [msg, setMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [balance, setBalance] = useState(null);
  const [statements, setStatements] = useState(null);
  const [selectedDateFrom, setSelectedDateFrom] = useState(new Date('2019-01-01T21:11:54'));
  const [selectedDateTo, setSelectedDateTo] = useState(new Date('2019-12-31T21:11:54'));

  const handleDialog = () => {
    setOpenAlert(!openAlert);
  };

  const getBalance = async() => {
    await api.get('/account/balance').then((response) => {
      setBalance(response.data);
    }).catch((e) => {
      setMsg(e.response.data.msg);
      setOpenAlert(true);
    });
  };

  const getStatements = async() => {
    const dateFrom = format(selectedDateFrom, 'yyyy-MM-dd');
    const dateTo = format(selectedDateTo, 'yyyy-MM-dd');
    await api.get(`/account/statements?initialDate=${dateFrom}&finalDate=${dateTo}`).then((response) => {
      setStatements(response.data.statement);
    }).catch((e) => {
      setMsg(e.response.data.msg);
      setOpenAlert(true);
    });
  };

  const dateFrom = (date) => {
    setSelectedDateFrom(date);
  };
  const dateTo = (date) => {
    setSelectedDateTo(date);
  };

  useEffect(() => {
    getBalance();
    getStatements();
  }, []);
  useEffect(() => {
    getStatements();
  }, [selectedDateFrom, selectedDateTo]);

  return (
    <div>
      <MessageDialog
        msg={msg}
        open={openAlert}
        onClose={handleDialog}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card className={classes.balance}>
            <Typography gutterBottom variant="h5" component="h2">
              Saldo: R$
              {' '}
              {balance ? (balance.balance / 100).toString().replace('.', ',') : 'Carregando...'}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Card className={classes.dates}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
              <Grid container justifyContent="space-around">
                <Grid item xs={12} sm={5}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    label="De:"
                    value={selectedDateFrom}
                    onChange={dateFrom}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    label="A:"
                    value={selectedDateTo}
                    onChange={dateTo}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </Card>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Data</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statements ? statements.map((row) => (
              <Row key={row.id} row={row} />
            )) : <TableRow />}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

Balance.Layout = Layout;

export default Balance;
