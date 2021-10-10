import moment from "moment";

import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
const OrderDetails = ({ orders }) => (
  <Card>
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
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                  >
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    {/* <Box
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
    </Box> */}
  </Card>
);

export default OrderDetails;
