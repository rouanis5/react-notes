import PropTypes from "prop-types";
import { AiFillDelete } from "react-icons/ai";

const Note = ({ title, isCurrent = false, onUserChoose, onDelete }) => {
  const myClassName = isCurrent ? "note active" : "note";

  return (
    <div className="note-label">
      <div className={myClassName} onClick={onUserChoose}>
        {title}
      </div>
      <AiFillDelete className="note-delete-icon" onClick={onDelete} />
    </div>
  );
};

Note.propTypes = {
  title: PropTypes.string,
  isCurrent: PropTypes.bool,
};

export default Note;
