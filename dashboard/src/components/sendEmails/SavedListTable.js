import React, { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@material-ui/core'

const emailList = []

const CustomCheckBox = (props) => {
  const { item, setEmailList } = props
  const [checked, setChecked] = useState(false)

  const handleChange = (e) => {
    if (e.target.checked) {
      setChecked(true)
      const index = emailList.indexOf(item)
      if (index === -1) {
        emailList.push(item)
        setEmailList(emailList)
      }
    } else {
      setChecked(false)
      const index = emailList.indexOf(item)
      if (index !== -1) {
        emailList.splice(index, 1)
      }
    }
  }

  return (
    <div>
      <Checkbox checked={checked} onChange={(e) => handleChange(e)} />
    </div>
  )
}

const SavedListTable = (props) => {
  const { list, setEmailList } = props

  return (
    <Box>
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
            {list.map((row) => (
              <TableRow
                key={row.email}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell padding='checkbox'>
                  <CustomCheckBox
                    item={row.email}
                    setEmailList={setEmailList}
                  />
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
      {/* <CustomCheckBox  item={item.email} /> */}
      {list.length === 0 && (
        <Typography
          textAlign='center'
          component='h1'
          variant='h4'
          sx={{ mt: 3 }}
        >
          There is no list, please create a list first
        </Typography>
      )}
    </Box>
  )
}

export default SavedListTable
