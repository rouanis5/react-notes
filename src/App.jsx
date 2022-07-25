import { useReducer, createContext, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import reducer, { ACTIONS } from "./helpers/notesReducer";

import { Sidebar } from "./components/Sidebar";
import { TextField } from "./components/TextField";
import Split from "react-split";

const contextData = createContext(null);

const initNotes =
  JSON.parse(localStorage.getItem(ACTIONS.LOCAL_STORAGE_KEY)) || [];

function App() {
  const [notes, dispatch] = useReducer(reducer, initNotes);
  const [searchParams, setSearchParams] = useSearchParams();
  const firstRender = useRef(true);

  //change the localstate when the app rerenders
  useEffect(() => {
    // dont run on first render
    if (!firstRender.current) {
      localStorage.setItem(ACTIONS.LOCAL_STORAGE_KEY, JSON.stringify(notes));
      const id = notes.filter((el) => el.isCurrent === true)[0]?.id;
      setSearchParams(id ? { id } : {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes]);

  useEffect(() => {
    // run only on first render
    // check if the id exists
    const id = searchParams.get("id");
    if (notes.filter((el) => el.id === id && el.isCurrent === false)[0]) {
      dispatch({ type: ACTIONS.SELECT_NOTE, payload: { id } });
    }
    firstRender.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <contextData.Provider value={[notes, dispatch]}>
      <Split sizes={[30, 70]} direction="horizontal" className="split">
        <Sidebar />
        <TextField />
      </Split>
    </contextData.Provider>
  );
}

export default App;
export { contextData };
