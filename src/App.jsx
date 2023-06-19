import { useState } from "react";
import CircleLoader from "react-spinners/CircleLoader";
import "./App.css";

const App = () => {
  const [img, setimg] = useState(null);
  const [name, setname] = useState("");
  const [mode, setmode] = useState("dark");
  const [load, setload] = useState(false);
  //
  const modechange = () => {
    if (mode == "light") {
      setmode("dark");
    } else if (mode == "dark") {
      setmode("light");
    }
  };
  //
  const sty = {
    color: mode == "light" ? "black" : "white",
    border: mode == "light" ? "1px solid black" : "1px solid white",
    backgroundColor: mode == "light" ? "white" : "black",
  };
  const styc = {
    color: mode == "light" ? "black" : "white",
    backgroundColor: mode == "light" ? "white" : "black",
  };
  const isty = {
    color: mode == "light" ? "black" : "white",
    backgroundColor: mode == "light" ? "white" : "#363535",
  };
  //
  const search = (e) => {
    setname(e?.target.value);
  };
  //
  const click = () => {
    setload(true);
    fetch(`https://api.pexels.com/v1/search?query=${name}&per_page=12`, {
      method: "GET",
      headers: {
        Authorization:
          "yAt9NvjN4rln3RvP20tk1xXK8JiQ8kOKfOonKSlTavUBZrNoameEPfE5",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setimg(res.photos);
        setload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="king-cont" style={styc}>
      <button id="mode" onClick={modechange} style={sty}>
        {mode}
      </button>
      <div id="header" style={styc}>
        Image search engine
      </div>
      <div id="bar-area">
        <input
          style={isty}
          id="bar"
          onInput={search}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              click();
            }
          }}
        ></input>
        <button id="sb" onClick={click}>
          Search
        </button>
      </div>

      <div id="content">
        {img == null && !load && <div id="message">Hallo, search the web!</div>}
        {load && (
          <div id="loader">
            <CircleLoader
              color={mode == "light" ? "#431894" : "#36d7b7"}
              loading={load}
              size={120}
            />
          </div>
        )}
        {!load &&
          img?.map((data) => {
            return (
              <div>
                <img
                  id="image"
                  src={data.src.small}
                  style={{
                    border:
                      mode == "light" ? "1px solid black" : "1px solid white",
                  }}
                ></img>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default App;
