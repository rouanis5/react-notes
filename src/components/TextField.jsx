import { useState, useContext, useEffect } from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { contextData } from "../App";
import { ACTIONS } from "../helpers/notesReducer";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

export const TextField = () => {
  const [selectedTab, setSelectedTab] = useState("write");
  const toggleSelectedTab = () => {
    if (selectedTab === "write") {
      setSelectedTab("preview");
    } else if (selectedTab === "preview") {
      setSelectedTab("write");
    }
  };

  const [notes, dispatch] = useContext(contextData);
  const { id, text: noteText } = notes.filter((el) => el.isCurrent)[0] ?? [];

  const [text, setText] = useState("");

  // update the text if the note id changed
  useEffect(() => {
    if (id) setText(noteText); // check if isn't null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateText = (value) => {
    setText(value);
    dispatch({ type: ACTIONS.UPDATE_NOTE, payload: { id, text: value } });
  };

  return (
    <div className="parent">
      {notes[0] && (
        <ReactMde
          value={text}
          onChange={updateText}
          selectedTab={selectedTab}
          onTabChange={toggleSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
          minEditorHeight={70}
          heightUnits="vh"
        ></ReactMde>
      )}
    </div>
  );
};
