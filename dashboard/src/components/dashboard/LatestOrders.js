import moment from "moment";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
const orders = [
  {
    id: uuid(),
    ref: "CDD1044",
    amount: 16.76,
    customer: {
      name: "Adam Denisov",
      title: "Employee",
      company: "Apple Cop.",
      location: "Mountview California"
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    ref: "CDD1044",
    amount: 16.76,
    customer: {
      name: "Adam Denisov",
      title: "Employee",
      company: "Apple Cop.",
      location: "Mountview California"
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    ref: "CDD1044",
    amount: 16.76,
    customer: {
      name: "Adam Denisov",
      title: "Employee",
      company: "Apple Cop.",
      location: "Mountview California"
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    ref: "CDD1044",
    amount: 16.76,
    customer: {
      name: "Adam Denisov",
      title: "Employee",
      company: "Apple Cop.",
      location: "Mountview California"
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    ref: "CDD1044",
    amount: 16.76,
    customer: {
      name: "Adam Denisov",
      title: "Employee",
      company: "Apple Cop.",
      location: "Mountview California"
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    ref: "CDD1044",
    amount: 16.76,
    customer: {
      name: "Adam Denisov",
      title: "Employee",
      company: "Apple Cop.",
      location: "Mountview California"
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    ref: "CDD1044",
    amount: 16.76,
    customer: {
      name: "Adam Denisov",
      title: "Employee",
      company: "Apple Cop.",
      location: "Mountview California"
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    ref: "CDD1044",
    amount: 16.76,
    customer: {
      name: "Adam Denisov",
      title: "Employee",
      company: "Apple Cop.",
      location: "Mountview California"
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    ref: "CDD1044",
    amount: 16.76,
    customer: {
      name: "Adam Denisov",
      title: "Employee",
      company: "Apple Cop.",
      location: "Mountview California"
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    ref: "CDD1044",
    amount: 16.76,
    customer: {
      name: "Adam Denisov",
      title: "Employee",
      company: "Apple Cop.",
      location: "Mountview California"
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    ref: "CDD1044",
    amount: 16.76,
    customer: {
      name: "Adam Denisov",
      title: "Employee",
      company: "Apple Cop.",
      location: "Mountview California"
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    ref: "CDD1044",
    amount: 16.76,
    customer: {
      name: "Adam Denisov",
      title: "Employee",
      company: "Apple Cop.",
      location: "Mountview California"
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
];

const LatestOrders = (props) => (
  <Card {...props}>
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>FULL NAME</TableCell>
              <TableCell>TITLE</TableCell>
              <TableCell>COMPANY</TableCell>
              <TableCell>LOCATION</TableCell>
              <TableCell>
                
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow hover key={order.id}>
                <TableCell style={{ color: "blue" }}>{order.ref}</TableCell>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell>{order.customer.title}</TableCell>
                <TableCell>{order.customer.company}</TableCell>
                <TableCell>{order.customer.location}</TableCell>
                <TableCell>
                  <IconButton>
                    <GetAppIcon />
                  </IconButton>
                  <IconButton color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        p: 2,
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
);

export default LatestOrders;
