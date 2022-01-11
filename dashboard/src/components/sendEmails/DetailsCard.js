import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

const DetailsCard = (props) => {
  const { title, count, bg } = props
  return (
    <Card sx={{ backgroundColor: `${bg}` }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          height: 100,
        }}
      >
        <Typography component='h1' variant='h2' sx={{ color: 'white' }}>
          {title}
        </Typography>
        <Typography component='h1' variant='h1' sx={{ color: 'white' }}>
          {count}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default DetailsCard
