import { nanoid } from "nanoid";
import showdown from "showdown";
import { removeTags } from "./functions";

const converter = new showdown.Converter();

const ACTIONS = {
  ADD_NOTE: "ADD A NOTE",
  SELECT_NOTE: "select note by id",
  DELETE_NOTE: "delete note by id",
  UPDATE_NOTE: "update note by id",
  LOCAL_STORAGE_KEY: "react-notes-localStorage",
};

const initNote = () => {
  return {
    id: nanoid(),
    title: "",
    text: "# ",
    isCurrent: true,
  };
};

function notesReducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_NOTE: {
      return [
        ...state.map((el) => {
          return { ...el, isCurrent: false };
        }),
        initNote(),
      ];
    }

    case ACTIONS.SELECT_NOTE: // payload: {note_id}
      return [
        ...state.map((el) => {
          return { ...el, isCurrent: el.id === payload.id };
        }),
      ];

    case ACTIONS.DELETE_NOTE: // payload: {note_id}
      return state.filter((el, index) => {
        if (el.id !== payload.id) {
          return true;
        }
        // change the current note
        if (state[index + 1]) {
          // check the next one
          state[index + 1].isCurrent = true;
        } else if (state[index - 1]) {
          // check the previous one
          state[index - +1].isCurrent = true;
        }
        return false;
      });

    case ACTIONS.UPDATE_NOTE: // payload: {note_id, text}
      return state.map((el) =>
        el.id !== payload.id
          ? el
          : {
              ...el,
              title: removeTags(
                converter.makeHtml(payload.text.split("\n")[0])
              ),
              text: payload.text,
            }
      );
    default:
      return state;
  }
}

export default notesReducer;
export { ACTIONS };
