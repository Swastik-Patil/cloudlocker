import React from "react";
import getIcon from "../utils/IconsMap";
import deleteFile, { removeFile } from "../utils/Operations";
import ReactModal from "react-modal";
import { useAuth0 } from "@auth0/auth0-react";
import {
  MdDelete,
  MdOutlineDelete,
  MdOutlineOpenInNew,
  MdShare,
} from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { shareFile } from "../utils/Operations";

export const GridLayout = ({ data, isShared }) => {
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [shareOpen, setShareOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState({});
  const { user } = useAuth0();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  if (data.length === 0) return <div>No Files </div>;

  const openFile = (url) => {
    window.open(url, "_blank");
  };

  const addMember = (member, item) => {
    shareFile(member, item).then(() => {
      setShareOpen(false);
    });
  };

  const removeMember = (member, item) => {
    removeFile(member, item).then(() => {
      setShareOpen(false);
    });
  };

  return (
    <div className="grid-layout">
      {data.map((item, index) => (
        <div className="grid-layout__item" key={index}>
          {/* Load Icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              src={getIcon(String(item.fileName).split(".")[1])}
              alt="file icon"
              width={70}
              height={70}
            />

            <h5>{item.name}</h5>
          </div>
          <div
            className="actions"
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <MdOutlineOpenInNew onClick={() => openFile(item.downloadURL)} />
            {!isShared && (
              <>
                <MdShare
                  onClick={() => {
                    setSelectedItem(item);
                    setShareOpen(true);
                  }}
                />
                <MdDelete
                  onClick={() => {
                    setSelectedFile(item.fileName);
                    setDeleteOpen(true);
                  }}
                />
              </>
            )}
          </div>
        </div>
      ))}
      <ReactModal
        isOpen={deleteOpen}
        onRequestClose={() => setDeleteOpen(false)}
        style={customStyles}
        contentLabel="Delete File Modal"
      >
        <h2>Are you sure you want to delete this file?</h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            className="button button--primary"
            onClick={() => setDeleteOpen(false)}
          >
            Cancel
          </button>
          <button
            className="button button--danger"
            onClick={() =>
              deleteFile(selectedFile, user.sub).then(() => {
                setDeleteOpen(false);
                alert("File Deleted");
                window.location.reload();
              })
            }
          >
            Delete
          </button>
        </div>
      </ReactModal>
      <ReactModal
        isOpen={shareOpen}
        onRequestClose={() => setShareOpen(false)}
        style={customStyles}
        contentLabel="Delete File Modal"
      >
        <h2>Share File</h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          <input
            type="text"
            id="teamMembers"
            placeholder="Add Email"
            className="search-bar"
            style={{ fontSize: "1.5rem", width: "30rem" }}
          />
          <div
            className="form-input-wrapper"
            onClick={() => {
              addMember(
                document.getElementById("teamMembers").value,
                selectedItem
              );
            }}
          >
            <button className="button button--primary">
              <FaCheck />
            </button>
          </div>
          <div
            className="form-input-wrapper"
            onClick={() => {
              removeMember(
                document.getElementById("teamMembers").value,
                selectedItem
              );
            }}
          >
            <button className="button button--danger">
              <MdOutlineDelete />
            </button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};
