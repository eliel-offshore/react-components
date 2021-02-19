import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
export function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

export const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  invalid: {
    background: 'lightgray'
  },
  negative: {
    color: 'red'
  }
}));

export default function Orders({ initialState = rows }) {
  const classes = useStyles();
  
  const [data, setData] = useState([])

  useEffect(() => {
    setData(initialState)
  }, [initialState]);

  function isValidAmount(num) {
    return typeof num == 'number'
  }


  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
            const numClass = !isValidAmount(row.amount) ? classes.invalid : row.amount < 0 ? classes.negative : ``

            return (
              <TableRow key={row.id} data-testid='list-row'>
                <TableCell data-testid='list-date'>{row.date}</TableCell>
                <TableCell data-testid='list-name'>{row.name}</TableCell>
                <TableCell data-testid='list-shipTo'>{row.shipTo}</TableCell>
                <TableCell data-testid='list-paymentMethod'>{row.paymentMethod}</TableCell>
                <TableCell data-testid='list-amount' align="right" className={`amount ${numClass}`}>{!isValidAmount(row.amount) ? '--' : row.amount}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}