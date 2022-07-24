import { useContext } from "react";
import { contextData } from "../App";
import { ACTIONS } from "../helpers/notesReducer";
import Note from "./Note";

export const Sidebar = () => {
  const [notes, dispatch] = useContext(contextData);

  return (
    <aside className="parent aside">
      <div className="head">
        <h1 className="title">Notes</h1>
        <button
          type="button"
          className="icon"
          onClick={() => dispatch({ type: ACTIONS.ADD_NOTE })}
        >
          +
        </button>
      </div>
      <div className="notes">
        {notes.map((note) => (
          <Note
            key={note.id}
            title={note.title}
            isCurrent={note.isCurrent}
            onUserChoose={() => {
              dispatch({ type: ACTIONS.SELECT_NOTE, payload: { id: note.id } });
            }}
            onDelete={() => {
              dispatch({ type: ACTIONS.DELETE_NOTE, payload: { id: note.id } });
            }}
          />
        ))}
      </div>
    </aside>
  );
};
