import template from "./images/thiep_dien_tu.png";
import "./App.css";
import { useRef, useState } from "react";

function App() {
  const myCanvas = useRef();
  const myCanvasDemo = useRef();
  const inputName = useRef();
  const [color, setColor] = useState("#FF004C");

  const changeName = () => {
    const contextDemo = myCanvasDemo.current.getContext("2d");
    const context = myCanvas.current.getContext("2d");
    const imageObj = new Image();
    imageObj.onload = () => {
      contextDemo.drawImage(
        imageObj,
        0,
        0,
        1429,
        2000,
        0,
        0,
        myCanvasDemo.current.width,
        (myCanvasDemo.current.width * 1000) / 715
      );
      contextDemo.font = "45px Bonheur Royale";
      contextDemo.textAlign = "end";
      contextDemo.fillStyle = color;
      contextDemo.fillText(inputName.current.value, 675, 705);

      context.drawImage(imageObj, 0, 0);
      context.font = "40px Bonheur Royale";
      context.textAlign = "end";
      context.fillStyle = color;
      context.fillText(inputName.current.value, 1350, 1410);
    };
    imageObj.src = template;
  };

  const onDownload = () => {
    // const context = myCanvas.current.getContext("2d");
    // const imageObj = new Image();
    //
    // if (!inputName.current.value) return;
    //
    // imageObj.onload = function () {
    //   context.drawImage(imageObj, 0, 0);
    //   context.font = "40pt Serif";
    //   context.textAlign = "end";
    //   context.fillStyle = color;
    //   context.fillText(inputName.current.value, 1350, 1400);
    // };
    // imageObj.src = template;
    const url = myCanvas.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${inputName.current.value
      .trim()
      .replaceAll(" ", "_")}.png`;
    link.href = url;
    link.click();
  };

  return (
    <div className="App">
      <header className="App-header">
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          Tên
          <input ref={inputName} onChange={changeName} />
          <input
            width={20}
            style={{ maxWidth: 30 }}
            type={"color"}
            value={color}
            onChange={(vl) => setColor(vl.target.value)}
          />
          <button onClick={onDownload}>Tải thiệp</button>
        </div>
        <canvas
          ref={myCanvas}
          width={1429}
          height={2000}
          style={{ display: "none" }}
        />
        <canvas
          ref={myCanvasDemo}
          width={715}
          style={{ maxWidth: "100%" }}
          height={1000}
        />
      </header>
    </div>
  );
}

export default App;
