import apkIcon from "../assets/icons/apk.png";
import csvIcon from "../assets/icons/csv.png";
import docIcon from "../assets/icons/doc.png";
import imageIcon from "../assets/icons/image.png";
import jsIcon from "../assets/icons/js.png";
import audioIcon from "../assets/icons/music.png";
import pdfIcon from "../assets/icons/pdf.png";
import pptIcon from "../assets/icons/ppt.png";
import textIcon from "../assets/icons/txt.png";
import videoIcon from "../assets/icons/video.png";
import xlsIcon from "../assets/icons/xls.png";
import zipIcon from "../assets/icons/zip.png";
import unKnownIcon from "../assets/icons/word.png";

const iconMap = {
  pdf: pdfIcon,
  apk: apkIcon,
  csv: csvIcon,
  xls: xlsIcon,
  xlsx: xlsIcon,
  js: jsIcon,
  ppt: pptIcon,
  pptx: pptIcon,
  doc: docIcon,
  docx: docIcon,
  jpg: imageIcon,
  jpeg: imageIcon,
  png: imageIcon,
  mp4: videoIcon,
  mp3: audioIcon,
  wav: audioIcon,
  txt: textIcon,
  zip: zipIcon,
};

export const getIcon = (fileType) => {
  return iconMap[fileType] || unKnownIcon;
};

export default getIcon;
