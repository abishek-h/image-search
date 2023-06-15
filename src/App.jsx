import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [img, setimg] = useState([]);
  const [name, setname] = useState("");
  const search = (event) => {
    setname(event.target.value);
  };
  const [key, setkey] = useState("");
  const set = () => {
    setkey(name);
  };
  useEffect(() => {
    fetch(`https://api.pexels.com/v1/search?query=${key}&per_page=5`, {
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
  }, [key]);

  return (
    <>
      <div id="header">Image search engine</div>
      <div id="bar-area">
        <input id="bar" onChange={search}></input>
        <button onClick={set}>Search</button>
      </div>
      <div id="content">
        {img?.map((data) => {
          return (
            <div>
              <img id="image" src={data.src.small}></img>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
