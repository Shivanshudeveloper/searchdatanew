import React from 'react'
import {
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons'

const FilterAccordion = (props) => {
  const { setFilter, filterValue, title } = props
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth
          type='text'
          placeholder={title}
          variant='outlined'
          sx={{ backgroundColor: 'white' }}
          value={filterValue}
          onChange={(e) => setFilter(e.target.value)}
        />
      </AccordionDetails>
    </Accordion>
  )
}

export default FilterAccordion
