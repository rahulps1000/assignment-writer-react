import "./App.css";
import AppBar from "./components/AppBar";
import PageSelector from "./components/PageSelector";
import { useState } from "react";
import data from "./assets.json";
import FontSelector from "./components/FontSelector";
import Editor from "./components/Editor";

function App() {
  const [pointer, setPointer] = useState(0);

  const [selectedPage, setSelectedPage] = useState(null);
  const [pages, setPages] = useState(data.pages);

  const [selectedFont, setSelectedFont] = useState(null);
  const [fonts, setFonts] = useState(data.fonts);

  const onPageSelect = (page) => {
    setSelectedPage(page);
    if (pointer === 0) {
      setPointer(1);
    }
  };

  const onFontSelect = (font) => {
    setSelectedFont(font);
    if (pointer === 1) {
      setPointer(2);
    }
  };

  return (
    <div className="App">
      <AppBar />
      <div className="components">
        <PageSelector
          show={pointer >= 0}
          selectedPage={selectedPage}
          fullScreen={selectedPage === null}
          pages={pages}
          onPageSelect={onPageSelect}
          defaultPageCount={data.pages.length}
          setPages={setPages}
        />
        {pointer >= 1 && (
          <FontSelector
            selectedFont={selectedFont}
            fullScreen={selectedFont === null}
            fonts={fonts}
            onFontSelect={onFontSelect}
            defaultFontCount={data.fonts.length}
            setFonts={setFonts}
          />
        )}
        {pointer >= 2 && (
          <Editor
            page={selectedPage}
            dp={data.pages.length > selectedPage}
            font={selectedFont}
            pages={pages}
            fonts={fonts}
          />
        )}
      </div>
      <div className="footer">
        Created with ❤️ by <a href="https://github.com/rahulps1000">Rahul</a>
      </div>
    </div>
  );
}

export default App;
