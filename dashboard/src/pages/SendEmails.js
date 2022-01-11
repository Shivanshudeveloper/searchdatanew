import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Box, Button, Stack, Grid } from '@material-ui/core'
import EmailEditor from 'react-email-editor'
import axios from 'axios'
import SnackMessage from 'src/components/SnackMessage'
import {
  getCampaignDetails,
  updateCampaign,
} from '../store/actions/campaignAction'
import SavedListTable from 'src/components/sendEmails/SavedListTable'
import DetailsCard from 'src/components/sendEmails/DetailsCard'
import { API_SERVICE } from 'src/config/url'

const CampaignDetail = () => {
  const { id } = useParams()

  // states
  const [htmlBody, setHtmlBody] = useState(null)
  const [toEmailList, setToEmailList] = useState([])
  const [toAllEmailList, setToAllEmailList] = useState([])
  const [savedList, setSavedList] = useState(null)
  const [variant, setVariant] = useState(null)
  const [message, setMessage] = useState(null)
  const [snackOpen, setSnackOpen] = useState(false)

  // getting details of content from storage
  const dispatch = useDispatch()
  const campaign = useSelector((state) => state.campaign)
  const campaignDetails = campaign?.campaignDetails

  const userEmail = sessionStorage.getItem('userEmail')
    ? sessionStorage.getItem('userEmail')
    : null

  useEffect(async () => {
    try {
      const { data } = await axios.get(
        `${API_SERVICE}/api/v1/main/savedDetails/${userEmail}`
      )
      setSavedList(data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    if (savedList !== null) {
      const emailList = savedList.map((x) => {
        return x.email
      })

      setToAllEmailList(emailList)
    }
  }, [savedList])

  useEffect(() => {
    dispatch(getCampaignDetails(id))
  }, [dispatch])

  const emailEditorRef = useRef(null)

  const exportHtml = () => {
    saveDesign()
    emailEditorRef.current.editor.exportHtml((data) => {
      const { html } = data
      setHtmlBody(html)
    })
  }

  const saveDesign = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design } = data
      console.log('design', design)
    })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackOpen(false)
  }

  const sendEmail = async (type) => {
    try {
      let to = []

      if (type === 'all') {
        to = toAllEmailList
      } else {
        to = toEmailList
      }

      if (to.length === 0) {
        setMessage('select atleast one email')
        setVariant('error')
        setSnackOpen(true)
        return
      }

      const subject = campaignDetails.campaignName

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const body = {
        to,
        subject,
        html: htmlBody,
      }

      const response = await axios.post(
        `${API_SERVICE}/api/v1/main/sendEmail`,
        body,
        config
      )

      setMessage(response.data.msg)
      setVariant('success')
      setSnackOpen(true)
      dispatch(
        updateCampaign(campaignDetails._id, campaignDetails.mailSend + 1)
      )
    } catch (error) {
      setMessage(error.message)
      setVariant('error')
      setSnackOpen(true)
    }
  }

  return (
    <div style={{ margin: 50 }}>
      {campaignDetails && (
        <>
          <Typography variant='h1'>{campaignDetails.campaignName}</Typography>
          <Grid sx={{ my: 4 }} container>
            <Grid item sm={6} md={3} sx={{ px: 1.5, py: 1.2 }}>
              <DetailsCard
                title='Mail Delivered'
                count={campaignDetails.mailDelivered}
                bg='#00bfff'
              />
            </Grid>
            <Grid item sm={6} md={3} sx={{ px: 1.5, py: 1.2 }}>
              <DetailsCard
                title='Mail Send'
                count={campaignDetails.mailSend}
                bg='green'
              />
            </Grid>
            <Grid item sm={6} md={3} sx={{ px: 1.5, py: 1.2 }}>
              <DetailsCard
                title='Mail Opened'
                count={campaignDetails.Opened}
                bg='orange'
              />
            </Grid>
            <Grid item sm={6} md={3} sx={{ px: 1.5, py: 1.2 }}>
              <DetailsCard
                title='Not Delivered'
                count={campaignDetails.notDelivered}
                bg='#ff4040'
              />
            </Grid>
          </Grid>
        </>
      )}
      <Box
        sx={{
          mt: 5,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <EmailEditor style={{ height: '600px' }} ref={emailEditorRef} />
      </Box>
      <Stack justifyContent='flex-end' direction='row' sx={{ mt: 5 }}>
        <Button variant='contained' onClick={() => sendEmail('selected')}>
          Send Email
        </Button>
        <Button
          sx={{ ml: 2 }}
          variant='contained'
          onClick={() => sendEmail('all')}
        >
          Send To All
        </Button>
        <Button sx={{ ml: 2 }} variant='contained' onClick={exportHtml}>
          Export HTML
        </Button>
      </Stack>
      <Box sx={{ mt: 5 }}>
        {savedList !== null ? (
          <SavedListTable list={savedList} setEmailList={setToEmailList} />
        ) : (
          <SavedListTable list={[]} />
        )}
      </Box>

      <SnackMessage
        variant={variant}
        message={message}
        snackOpen={snackOpen}
        handleSnackClose={handleClose}
      />
    </div>
  )
}

export default CampaignDetail
