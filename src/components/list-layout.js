import React from "react";
import getIcon from "../utils/IconsMap";
import deleteFile, { shareFile, removeFile } from "../utils/Operations";
import ReactModal from "react-modal";
import { useAuth0 } from "@auth0/auth0-react";
import { MdOutlineDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

export const ListLayout = ({ data, isShared }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState({});
  const [shareOpen, setShareOpen] = React.useState(false);
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
    <div className="list-layout">
      {data.map((item, index) => (
        <div className="list-layout__item" key={index}>
          <div style={{ display: "flex" }}>
            <img
              src={getIcon(String(item.fileName).split(".")[1])}
              alt="file icon"
              width={40}
              height={40}
            />

            <h5>{item.name}</h5>
          </div>

          <div style={{ display: "flex", gap: ".5rem" }}>
            <button
              className="button button--secondary"
              onClick={() => openFile(item.downloadURL)}
            >
              Open
            </button>

            {!isShared && (
              <>
                <button
                  className="button button--primary"
                  onClick={() => {
                    setSelectedItem(item);
                    setShareOpen(true);
                  }}
                >
                  Share
                </button>
                <button
                  className="button button--danger"
                  onClick={() => {
                    setSelectedFile(item.fileName);
                    setIsOpen(true);
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Delete File Modal"
      >
        <h2>Are you sure you want to delete this file?</h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            className="button button--primary"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="button button--danger"
            onClick={() =>
              deleteFile(selectedFile, user.sub).then(() => {
                setIsOpen(false);
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
            onClick={() =>
              removeMember(
                document.getElementById("teamMembers").value,
                selectedItem
              )
            }
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
