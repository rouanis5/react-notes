import PropTypes from "prop-types";
import { AiFillDelete } from "react-icons/ai";

const Note = ({ title, isCurrent = false, onUserChoose, onDelete }) => {
  const hasTitle = title.trim() !== "";
  const activeClass = isCurrent ? "active" : "";
  const emptyClass = hasTitle ? "" : "empty";
  return (
    <div className="note-label">
      <div
        className={`note ${activeClass} ${emptyClass}`}
        onClick={onUserChoose}
      >
        {hasTitle ? title : "Empty title *"}
      </div>
      <AiFillDelete
        className={`note-delete-icon ${activeClass} ${emptyClass}`}
        onClick={onDelete}
      />
    </div>
  );
};

Note.propTypes = {
  title: PropTypes.string,
  isCurrent: PropTypes.bool,
};

export default Note;
