import React, { Component, Fragment } from "react";
import { NGROK, URL } from "./Constants";
import ActiveStorageProvider from "react-activestorage-provider";
import { withRouter } from "react-router-dom";
import Resume from "./Resume";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      fileName: "",
      currUser: {}
    };
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.setState((prevState, prevProps) => ({
        currUser: prevProps.location.state.currUser
      }));
    }
  }
  handleSuccess = e => {
    console.log("In Handle Success!");
  };

  handleSubmit = e => {
    console.log("In Handle Submit!");
  };
  render() {
    return (
      <div>
        <Resume />
        <ActiveStorageProvider
          endpoint={{
            path: `http://localhost:3000/api/v1/users/${
              this.state.currUser.id
            }`,
            model: "User",
            host: NGROK,
            attribute: "avatar",
            method: "POST"
          }}
          onSubmit={user => {
            console.log("user", user);
            this.setState({ avatar: user.avatar });
          }}
          render={({ handleUpload, uploads, ready }) => (
            <div>
              <input
                type="file"
                disabled={!ready}
                onChange={e => handleUpload(e.currentTarget.files)}
              />
              {uploads.map(upload => {
                switch (upload.state) {
                  case "waiting":
                    return (
                      <p key={upload.id}>
                        Waiting to upload {upload.file.name}
                      </p>
                    );
                  case "uploading":
                    return (
                      <p key={upload.id}>
                        Uploading {upload.file.name}: {upload.progress}%
                      </p>
                    );
                  case "error":
                    return (
                      <Fragment>
                        <p key={upload.id}>
                          Error uploading {upload.file.name}: {upload.error}
                        </p>
                      </Fragment>
                    );
                  case "finished":
                    return (
                      <Fragment>
                        <p key={upload.id}>
                          Finished uploading {upload.file.name}
                        </p>
                      </Fragment>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          )}
        />
      </div>
    );
  }
}

export default withRouter(Profile);
