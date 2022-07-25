import { useEffect } from "react";
import PropTypes from "prop-types";
import { AiFillDelete } from "react-icons/ai";

const Note = ({ title, isCurrent = false, onUserChoose, onDelete }) => {
  const hasTitle = title.trim() !== "";

  const activeClass = isCurrent ? "active" : "";
  const emptyClass = hasTitle ? "" : "empty";
  const noteTitle = hasTitle ? title : "Empty title *";

  // change document title to the current note title
  useEffect(() => {
    if (isCurrent) document.title = noteTitle;
  }, [noteTitle, isCurrent]);

  return (
    <div className="note-label">
      <div
        className={`note ${activeClass} ${emptyClass}`}
        onClick={onUserChoose}
      >
        {noteTitle}
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
