import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  Stack,
  Typography,
} from '@material-ui/core'
import { ArrowForwardIos, ArrowBackIos } from '@material-ui/icons'
import { parseInt } from 'lodash'
import axios from 'axios'
import { API_SERVICE } from '../config/url'

const SavedList = () => {
  const [page, setPage] = useState(1)
  const [start, setStart] = useState(0)
  const [tableData, setTableData] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [fetchedData, setFetchedData] = useState([])

  const userEmail = sessionStorage.getItem('userEmail')
    ? sessionStorage.getItem('userEmail')
    : null

  useEffect(() => {
    if (fetchedData !== null) {
      const pageCount = parseInt(fetchedData.length / 15)

      if (fetchedData.length % 15 === 0) {
        setTotalPages(pageCount)
      } else {
        setTotalPages(pageCount + 1)
      }
    }
  }, [fetchedData])

  useEffect(() => {
    if (fetchedData !== null) {
      const currData = fetchedData.slice(start, start + 15)
      setTableData(currData)
    }
  }, [page, fetchedData])

  useEffect(async () => {
    try {
      const { data } = await axios.get(
        `${API_SERVICE}/api/v1/main/savedDetails/${userEmail}`
      )
      setFetchedData(data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const moveForward = () => {
    setStart(start + 15)
    setPage(page + 1)
  }

  const moveBack = () => {
    setStart(start - 15)
    setPage(page - 1)
  }

  return (
    <Box sx={{ py: 8, px: 2 }}>
      <Typography component='h1' variant='h3' sx={{ my: 3 }}>
        Saved List
      </Typography>
      <Card sx={{ py: 4 }}>
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell align='center'>Last Name</TableCell>
                  <TableCell align='center'>Company</TableCell>
                  <TableCell align='center'>Job Role</TableCell>
                  <TableCell align='center'>Email</TableCell>
                  <TableCell align='center'>Phone</TableCell>
                  <TableCell align='center'>Linkedin</TableCell>
                  <TableCell align='center'>Country</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow
                    key={row.email}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox color='primary' />
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {row.firstName}
                    </TableCell>
                    <TableCell align='center'>{row.lastName}</TableCell>
                    <TableCell align='center'>{row.company}</TableCell>
                    <TableCell align='center'>{row.jobRole}</TableCell>
                    <TableCell align='center'>{row.email}</TableCell>
                    <TableCell align='center'>{row.phoneNumber}</TableCell>
                    <TableCell align='center'>{row.linkedinProfile}</TableCell>
                    <TableCell align='center'>{row.country}</TableCell>
                    <TableCell align='center'>
                      <Button>Save</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <Stack direction='row' justifyContent='center' sx={{ mt: 4 }}>
          {start === 0 ? (
            <IconButton disabled sx={{ mr: 4 }} onClick={() => moveBack()}>
              <ArrowBackIos />
            </IconButton>
          ) : (
            <IconButton sx={{ mr: 4 }} onClick={() => moveBack()}>
              <ArrowBackIos />
            </IconButton>
          )}
          {page === totalPages ? (
            <IconButton disabled onClick={() => moveForward()}>
              <ArrowForwardIos />
            </IconButton>
          ) : (
            <IconButton onClick={() => moveForward()}>
              <ArrowForwardIos />
            </IconButton>
          )}
        </Stack>
      </Card>
    </Box>
  )
}

export default SavedList
