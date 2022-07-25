import { useReducer, createContext, useEffect } from "react";
import reducer, { ACTIONS } from "./helpers/notesReducer";

import { Sidebar } from "./components/Sidebar";
import { TextField } from "./components/TextField";
import Split from "react-split";

const contextData = createContext(null);

const initNotes =
  JSON.parse(localStorage.getItem(ACTIONS.LOCAL_STORAGE_KEY)) || [];

function App() {
  const [notes, dispatch] = useReducer(reducer, initNotes);

  //change the localstate when the app rerenders
  useEffect(() => {
    localStorage.setItem(ACTIONS.LOCAL_STORAGE_KEY, JSON.stringify(notes));
  });

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
