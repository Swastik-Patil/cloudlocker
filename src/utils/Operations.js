import { getDatabase, ref as dbRef, remove, update } from "firebase/database";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { database } from "../services/firebase-service";
import { toast } from "react-stacked-toast";

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

export const deleteFile = async (fileName, userId) => {
  try {
    const storage = getStorage();
    const fileRef = ref(storage, `AllFiles/${userId}/files/${fileName}`);
    await deleteObject(fileRef);

    const database = getDatabase();
    let file =
      String(fileName).split(".")[0] + " " + String(fileName).split(".")[1];
    const db = dbRef(database, `Users/${userId}/Files/${file}`);
    await remove(db);
  } catch (error) {
    console.error("Error deleting file", error);
  }
};

export const shareFile = async (member, item) => {
  try {
    member = String(member).split("@")[0];
    let file =
      String(item.fileName).split(".")[0] +
      " " +
      String(item.fileName).split(".")[1];

    update(dbRef(database, "Shared/" + member + "/Files/" + file), item)
      .then(() => {
        notify("File Shared");
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    console.error("Error sharing file", error);
  }
};

export const removeFile = async (member, item) => {
  try {
    member = String(member).split("@")[0];
    let file =
      String(item.fileName).split(".")[0] +
      " " +
      String(item.fileName).split(".")[1];

    const db = dbRef(database, `Shared/${member}/Files/${file}`);
    await remove(db)
      .then(() => {
        notify("File Removed");
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    console.error("Error removing file", error);
  }
};

export default deleteFile;
