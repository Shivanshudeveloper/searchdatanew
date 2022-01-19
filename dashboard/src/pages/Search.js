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
  TextField,
  Stack,
  InputAdornment,
  SvgIcon,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@material-ui/core'
import { ArrowForwardIos, ArrowBackIos } from '@material-ui/icons'
import { Search as SearchIcon } from 'react-feather'
import { filter, parseInt } from 'lodash'
import axios from 'axios'
import SnackMessage from 'src/components/SnackMessage'
import { API_SERVICE } from 'src/config/url'
import FilterAccordion from 'src/components/search/FilterAccordion'
import Slide from '@mui/material/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const Search = () => {
  const [page, setPage] = useState(1)
  const [start, setStart] = useState(0)
  const [tableData, setTableData] = useState([])
  const [filteredTableData, setFilteredTableData] = useState([])
  const [text, setText] = useState('')
  const [totalPages, setTotalPages] = useState(0)
  const [fetchedData, setFetchedData] = useState(null)
  const [variant, setVariant] = useState(null)
  const [message, setMessage] = useState(null)
  const [snackOpen, setSnackOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [firstNameFilter, setFirstNameFilter] = useState('')
  const [lastNameFilter, setLastNameFilter] = useState('')
  const [jobFilter, setJobFilter] = useState('')
  const [companyFilter, setCompanyFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [industryFilter, setIndustryFilter] = useState('')

  const count = 1500

  const userEmail = sessionStorage.getItem('userEmail')
    ? sessionStorage.getItem('userEmail')
    : null

  const dialogClose = () => {
    setDialogOpen(false)
  }

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
        `${API_SERVICE}/api/v1/main/random/${count}`
      )
      setFetchedData(data)
    } catch (error) {
      console.log(error.message)
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

  const addtoSaveList = async (rowData) => {
    try {
      const value = { ...rowData, userEmail: userEmail }

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const body = {
        body: value,
      }

      const { data } = await axios.post(
        `${API_SERVICE}/api/v1/main/savedDetails/add`,
        body,
        config
      )

      if (data.success) {
        setMessage('User Added to Saved List')
        setVariant('success')
        setSnackOpen(true)
      } else {
        setMessage('User with this email already exist')
        setVariant('error')
        setSnackOpen(true)
      }
    } catch (error) {
      setMessage(error)
      setVariant('error')
      setSnackOpen(true)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackOpen(false)
  }

  const applyFilter = async () => {
    if (
      firstNameFilter === '' &&
      lastNameFilter === '' &&
      jobFilter === '' &&
      companyFilter === '' &&
      locationFilter === '' &&
      industryFilter === ''
    ) {
      setMessage('Select Atleat one filter to apply')
      setVariant('error')
      setSnackOpen(true)
      return
    }
    try {
      const { data } = await axios.get(
        `${API_SERVICE}/api/v1/main/filter/${count}?firstName=${firstNameFilter}
        &lastName=${lastNameFilter}&country=${locationFilter}&jobRole=${jobFilter}
        &company=${companyFilter}&industry=${industryFilter}`
      )

      setFetchedData(data)
    } catch (error) {
      setMessage(error)
      setVariant('error')
      setSnackOpen(true)
    }
  }

  const search = async () => {
    try {
      if (text.length <= 3) {
        setDialogOpen(true)
        return
      }

      const { data } = await axios.get(
        `${API_SERVICE}/api/v1/main/filter/${count}?firstName=${text}`
      )
      setFetchedData(data)
    } catch (error) {
      setMessage(error)
      setVariant('error')
      setSnackOpen(true)
    }
  }

  return (
    <>
      <Grid container>
        <Grid item sm={2.5}>
          <Box sx={{ py: 2, pl: 2 }}>
            <FilterAccordion
              filterValue={firstNameFilter}
              setFilter={setFirstNameFilter}
              title='First Name'
            />
            <FilterAccordion
              filterValue={lastNameFilter}
              setFilter={setLastNameFilter}
              title='Last Name'
            />
            <FilterAccordion
              filterValue={jobFilter}
              setFilter={setJobFilter}
              title='Job Titles'
            />
            <FilterAccordion
              filterValue={companyFilter}
              setFilter={setCompanyFilter}
              title='Company'
            />
            <FilterAccordion
              filterValue={locationFilter}
              setFilter={setLocationFilter}
              title='Location'
            />
            <FilterAccordion
              filterValue={industryFilter}
              setFilter={setIndustryFilter}
              title='Industry'
            />
            <Button
              sx={{ my: 2, py: 1.3 }}
              fullWidth
              variant='contained'
              onClick={() => applyFilter()}
            >
              Apply Filter
            </Button>
          </Box>
        </Grid>

        <Grid item sm={9.5}>
          <Box sx={{ py: 2, px: 2, mr: 2 }}>
            <Stack direction='row' alignItems='center'>
              <TextField
                fullWidth
                type='text'
                placeholder='Search '
                variant='outlined'
                sx={{ backgroundColor: 'white' }}
                value={text}
                onChange={(e) => setText(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SvgIcon fontSize='small' color='action'>
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                sx={{ px: 4, ml: 2, py: 1.2 }}
                variant='contained'
                onClick={() => search()}
              >
                Search
              </Button>
            </Stack>

            <Card sx={{ py: 4, mt: 5 }}>
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
                        <TableCell align='center'>Industry</TableCell>
                        <TableCell align='center'>Email</TableCell>
                        <TableCell align='center'>Phone</TableCell>
                        <TableCell align='center'>Linkedin</TableCell>
                        <TableCell align='center'>Country</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {tableData.length !== 0
                        ? tableData.map((row) => (
                            <TableRow
                              key={row.email}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell padding='checkbox'>
                                <Checkbox color='primary' />
                              </TableCell>
                              <TableCell component='th' scope='row'>
                                {row.firstName}
                              </TableCell>
                              <TableCell align='center'>
                                {row.lastName}
                              </TableCell>
                              <TableCell align='center'>
                                {row.company}
                              </TableCell>
                              <TableCell align='center'>
                                {row.jobRole}
                              </TableCell>
                              <TableCell align='center'>
                                {row.industry}
                              </TableCell>
                              <TableCell align='center'>{row.email}</TableCell>
                              <TableCell align='center'>
                                {row.phoneNumber}
                              </TableCell>
                              <TableCell align='center'>
                                {row.linkedinProfile}
                              </TableCell>
                              <TableCell align='center'>
                                {row.country}
                              </TableCell>
                              <TableCell align='center'>
                                <Button onClick={() => addtoSaveList(row)}>
                                  Save
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        : filteredTableData.map((row) => (
                            <TableRow
                              key={row.email}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell padding='checkbox'>
                                <Checkbox color='primary' />
                              </TableCell>
                              <TableCell component='th' scope='row'>
                                {row.firstName}
                              </TableCell>
                              <TableCell align='center'>
                                {row.lastName}
                              </TableCell>
                              <TableCell align='center'>
                                {row.company}
                              </TableCell>
                              <TableCell align='center'>
                                {row.jobRole}
                              </TableCell>
                              <TableCell align='center'>
                                {row.industry}
                              </TableCell>
                              <TableCell align='center'>{row.email}</TableCell>
                              <TableCell align='center'>
                                {row.phoneNumber}
                              </TableCell>
                              <TableCell align='center'>
                                {row.linkedinProfile}
                              </TableCell>
                              <TableCell align='center'>
                                {row.country}
                              </TableCell>
                              <TableCell align='center'>
                                <Button onClick={() => addtoSaveList(row)}>
                                  Save
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
              <Stack direction='row' justifyContent='center' sx={{ mt: 4 }}>
                {start === 0 ? (
                  <IconButton
                    disabled
                    sx={{ mr: 4 }}
                    onClick={() => moveBack()}
                  >
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
            <SnackMessage
              variant={variant}
              message={message}
              snackOpen={snackOpen}
              handleSnackClose={handleClose}
            />
            <Dialog
              open={dialogOpen}
              TransitionComponent={Transition}
              keepMounted
              onClose={dialogClose}
            >
              <DialogContent
                sx={{ width: 300, display: 'flex', justifyContent: 'center' }}
              >
                <DialogContentText>No Data Found</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDialogOpen(false)}>Close</Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Search
