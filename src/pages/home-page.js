import React, { useState, useRef, useEffect } from "react";
import { PageLayout } from "../components/page-layout";
import { useAuth0 } from "@auth0/auth0-react";
import { CodeSnippet } from "../components/code-snippet";
import { GridLayout } from "../components/grid-layout";
import ReactModal from "react-modal";
import { database, storage } from "../services/firebase-service";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { child, ref as dbRef, get, update } from "firebase/database";
import { Toaster, toast } from "react-stacked-toast";
import { ListLayout } from "../components/list-layout";

export const HomePage = () => {
  const [isGridLayout, setIsGridLayout] = useState(true);
  const [files, setFiles] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { user } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const hiddenFileInput = useRef(null);

  useEffect(() => {
    ReactModal.setAppElement(".content-layout");
    get(child(dbRef(database), `Users/${user.sub}/Files`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          data = Object.keys(data).map((key) => data[key]);
          setData(data);
          setFilteredData(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return () => {
      ReactModal.setAppElement(null);
    };
  }, [user.sub]);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    let fileUploaded = event.target.files;
    console.log(fileUploaded);
    fileUploaded = Object.keys(fileUploaded).map((key) => fileUploaded[key]);
    let temp = [...files];
    fileUploaded.forEach((file) => {
      temp.push(file);
    });
    setFiles(temp);
  };

  const removeFile = (name) => {
    let temp = [...files];
    temp = temp.filter((file) => file.name !== name);
    setFiles(temp);
  };

  const uploadFiles = () => {
    let length = files.length;

    let uploadButton = document.getElementById("uploadButton");
    uploadButton.disabled = true;

    uploadButton.innerText = "Uploading...";

    files.forEach((file) => {
      let storageRef = ref(storage, `AllFiles/${user.sub}/files/${file.name}`);
      let uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("Upload is in an unknown state");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            update(
              dbRef(
                database,
                "Users/" +
                  user.sub +
                  "/Files/" +
                  String(file.name).split(".")[0] +
                  " " +
                  String(file.name).split(".")[1]
              ),
              {
                name: file.name,
                downloadURL: downloadURL,
                fileName: file.name,
                uploadedOn: String(new Date()),
              }
            )
              .then(() => {
                notify(file.name + " uploaded successfully");
                length--;
                if (length === 0) {
                  setIsOpen(false);
                  uploadButton.disabled = false;
                  uploadButton.innerText = "Upload Files";
                  window.location.reload();
                }
                setFiles([]);
              })
              .catch((err) => {
                console.error(err);
              });
          });
        }
      );
    });
  };

  const notify = (message) => {
    toast((t) => ({
      description: (
        <div
          style={{
            width: "25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="flexDefault"
        >
          <span style={{ fontSize: "2.5ch" }}>
            <b>{message}</b>
          </span>
          <div>
            <button
              type="button"
              className="ml-2 py-1 rounded px-2 border bg-gray-100 text-gray-900"
              onClick={() => toast.dismiss(t.id)}
            >
              Dismiss
            </button>
          </div>
        </div>
      ),
      icon: "👏",
      style: {
        borderRadius: "200px",
        background: "#333",
        color: "#fff",
      },
    }));
  };

  return (
    <PageLayout>
      <div className="content-layout">
        <div className="content__body">
          {user.email_verified ? (
            <>
              <div className="flexDefault">
                <h1 style={{ color: "white" }}>Welcome, {user.nickname}</h1>

                {/* Search Bard */}
                <div>
                  <input
                    type="text"
                    placeholder="Search Files"
                    className="search-bar"
                    onChange={(e) => {
                      let search = e.target.value;
                      let filteredData = data.filter((item) =>
                        item.name.toLowerCase().includes(search.toLowerCase())
                      );
                      setFilteredData(filteredData);
                    }}
                  />
                </div>

                <div>
                  <button
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    New +{" "}
                  </button>
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className="code-snippet">
                <div className="code-snippet__title_container">
                  <span className="code-snippet__title">All Files</span>
                  <span className="code-snippet__layout_modifier">
                    {/* Grid Icon */}
                    <span
                      onClick={() => setIsGridLayout(true)}
                      className={`code-snippet__layout_icon ${
                        isGridLayout ? "active" : ""
                      }`}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0 1C0 0.447715 0.447715 0 1 0H5C5.55228 0 6 0.447715 6 1V5C6 5.55228 5.55228 6 5 6H1C0.447715 6 0 5.55228 0 5V1ZM2 2H4V4H2V2ZM0 9C0 8.44772 0.447715 8 1 8H5C5.55228 8 6 8.44772 6 9V13C6 13.5523 5.55228 14 5 14H1C0.447715 14 0 13.5523 0 13V9ZM2 10H4V12H2V10ZM9 0C8.44772 0 8 0.447715 8 1V5C8 5.55228 8.44772 6 9 6H13C13.5523 6 14 5.55228 14 5V1C14 0.447715 13.5523 0 13 0H9ZM12 2H10V4H12V2ZM8 9C8 8.44772 8.44772 8 9 8H13C13.5523 8 14 8.44772 14 9V13C14 13.5523 13.5523 14 13 14H9C8.44772 14 8 13.5523 8 13V9ZM10 10H12V12H10V10Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                    {/* List Icon */}
                    <span
                      onClick={() => setIsGridLayout(false)}
                      className={`code-snippet__layout_icon ${
                        !isGridLayout ? "active" : ""
                      }`}
                    >
                      <svg
                        width="14"
                        height="12"
                        viewBox="0 0 14 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2H13C13.5523 2 14 1.55228 14 1C14 0.447715 13.5523 0 13 0H1ZM0 6C0 5.44772 0.447715 5 1 5H13C13.5523 5 14 5.44772 14 6C14 6.55228 13.5523 7 13 7H1C0.447715 7 0 6.55228 0 6ZM1 10C0.447715 10 0 10.4477 0 11C0 11.5523 0.447715 12 1 12H13C13.5523 12 14 11.5523 14 11C14 10.4477 13.5523 10 13 10H1Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                  </span>
                </div>
                <div className="code-snippet__container">
                  <div className="code-snippet__wrapper">
                    <pre className="code-snippet__body">
                      {isGridLayout ? (
                        <GridLayout data={filteredData} />
                      ) : (
                        <ListLayout data={filteredData} />
                      )}
                    </pre>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="profile__details">
              <CodeSnippet
                title="Email Verification Required"
                code={
                  "Please verify your email to access your profile details.\n" +
                  "Check your email for a verification link. "
                }
              />
            </div>
          )}
        </div>
      </div>
      <ReactModal isOpen={isOpen}>
        <div className="flexDefault">
          <h1>Upload Files</h1>
          <div>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>

        <div className="fileList">
          {files.map((file, index) => (
            <div key={index} className="flexDefault" style={{ width: "40rem" }}>
              <h5>{file.name}</h5>
              <div>
                <button onClick={() => removeFile(file.name)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div className="flexDefault" style={{ width: "100%" }}>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: "none" }}
            multiple
          />
          <div style={{ display: "flex", gap: "2rem" }}>
            <button
              disabled={files.length === 0}
              onClick={uploadFiles}
              id="uploadButton"
            >
              Upload Files
            </button>
            <button onClick={handleClick}>Select Files</button>
          </div>
        </div>
      </ReactModal>
      <Toaster />
    </PageLayout>
  );
};
