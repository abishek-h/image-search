import { useState } from "react";
import "./App.css";

const App = () => {
  const [img, setimg] = useState([]);
  const [name, setname] = useState("");
  const search = (e) => {
    setname(e.target.value);
  };
  const click = () => {
    fetch(`https://api.pexels.com/v1/search?query=${name}&per_page=10`, {
      method: "GET",
      headers: {
        Authorization:
          "yAt9NvjN4rln3RvP20tk1xXK8JiQ8kOKfOonKSlTavUBZrNoameEPfE5",
      },
    })
      .then((res) => res.json())
      .then((res) => setimg(res.photos))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="king-cont">
      <div id="header">Image search engine</div>
      <div id="bar-area">
        <input
          id="bar"
          onInput={search}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              click();
            }
          }}
        ></input>
        <button onClick={click}>Search</button>
      </div>
      <div id="content">
        {img?.map((data) => {
          return (
            <div id="c">
              <img id="image" src={data.src.small}></img>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
