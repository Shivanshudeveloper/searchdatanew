import React from 'react'
import { Link } from 'react-router-dom'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from '@mui/material'
import { Delete } from '@material-ui/icons'

const CampaignTable = (props) => {
  /* eslint no-underscore-dangle: 0 */
  const { campaign, deleteCampaign } = props
  let i = 0

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>S.No</TableCell>
              <TableCell align='center'>Campaign Name</TableCell>
              <TableCell align='center'>Created On</TableCell>
              <TableCell align='center'>Action</TableCell>
              <TableCell align='center'>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaign.map((row, index) => (
              <TableRow
                key={i++}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center' component='th' scope='row'>
                  {index + 1}
                </TableCell>
                <TableCell align='center'>{row.campaignName}</TableCell>
                <TableCell align='center'>{row.createdAt}</TableCell>
                <TableCell align='center'>
                  <Link to={`/app/sendemails/${row._id}`}>
                    <Button>View</Button>
                  </Link>
                </TableCell>
                <TableCell align='center'>
                  <IconButton
                    color='error'
                    onClick={() => deleteCampaign(row._id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default CampaignTable
