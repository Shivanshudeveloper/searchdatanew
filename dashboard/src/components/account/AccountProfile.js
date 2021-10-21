import moment from "moment";
import React, { useState, useEffect } from "react";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Dropzone from "react-dropzone";
import { v4 as uuid4 } from "uuid";
import { auth, storage } from "../../firebase/index";

const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
  timezone: "GTM-7",
};

const AccountProfile = (props) => {
  const [file, setFile] = useState([]);
  const [message, setMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const handleClickSnack = () => {
    setOpenSnack(true);
  };
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  useEffect(() => {
    if (file.length > 0) {
      onSubmit();
    }
  }, [file]);

  const handleDrop = async (acceptedFiles) => {
    setFile(acceptedFiles.map((file) => file));
  };

  const onSubmit = () => {
    if (file.length > 0) {
      file.forEach((file) => {
        const timeStamp = Date.now();
        var uniquetwoKey = uuid4();
        uniquetwoKey = uniquetwoKey + timeStamp;
        const uploadTask = storage
          .ref(`pictures/products/${uniquetwoKey}/${file.name}`)
          .put(file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            handleClickSnack();
            setMessage(`Uploading ${progress} %`);
          },
          (error) => {
            setMessage(error);
            handleClickSnack();
          },
          async () => {
            // When the Storage gets Completed
            const fp = await uploadTask.snapshot.ref.getDownloadURL();
            // setFilePath(fp);
            // setFormData({ ...formData, filePath: fp });
            var user = auth.currentUser;
            user
              .updateProfile({ photoURL: fp })
              .then((res) => {
                handleClickSnack();
                setMessage("File Uploaded");
                window.location.reload();
              })
              .catch((res) => console.log(res));

            // handleClickSnack();
            // setMessage("File Uploaded");
            // // window.location.reload();
          }
        );
      });
    } else {
      setMessage("No File Selected Yet");
    }
  };
  return (
    <Card {...props}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleCloseSnack}
        message={message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnack}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 100,
              width: 100,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {user.name}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <Button color="primary" fullWidth variant="text">
              Upload Website Photo
            </Button>
          </div>
        )}
      </Dropzone>
    </Card>
  );
};

export default AccountProfile;
