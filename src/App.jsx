import { useReducer, createContext } from "react";
import reducer from "./helpers/notesReducer";

import { Sidebar } from "./components/Sidebar";
import { TextField } from "./components/TextField";
import Split from "react-split";

const contextData = createContext(null);

function App() {
  const [notes, dispatch] = useReducer(reducer, []);

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
