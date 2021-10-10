import { Helmet } from "react-helmet";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Chip,
} from "@material-ui/core";
import { v4 as uuid } from "uuid";
import moment from "moment";

const invoices = [
  {
    id: uuid(),
    ref: "CDD1049",
    amount: 30.5,
    customer: {
      name: "Ekaterina Tankova",
    },
    createdAt: 1555016400000,
    status: "pending",
  },
];

const Subscription = () => (
  <>
    <Helmet>
      <title>Customers | Client Portal</title>
    </Helmet>
    <Box sx={{ p: 10 }}>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>INVOICE</TableCell>
              <TableCell>SERVICE</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>NEXT PAYMENT</TableCell>
              <TableCell align="center">STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices?.map((inv) => (
              <TableRow hover key={inv.id}>
                <TableCell style={{ color: "blue" }}>{inv.ref}</TableCell>
                <TableCell>Unlimited Requests</TableCell>
                <TableCell>
                  {moment(inv.createdAt).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell align="center">
                  <Chip color="primary" label={inv.status} size="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  </>
);

export default Subscription;
