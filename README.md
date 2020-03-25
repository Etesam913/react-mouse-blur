<h1 align="center">  React-Mouse-Blur 🖱️</h1>
<div align="center">A npm package that provides a quick and easy implementation for cursor motion blur</div>


## 📹 Video

https://www.youtube.com/watch?v=g322U64oSlI

## 📦 Installation 

```bash
# with npm
npm install react-mouse-blur

# with yarn
yarn add react-mouse-blur
```

## 🧰 Usage

```jsx

import React, { useRef } from 'react';
import CursorBlur from 'react-mouse-blur';
import './App.css';
import cursor from './autocursor.png';

function App() {
  const intensity1 = useRef(null);
  const intensity2 = useRef(null);
  const intensity3 = useRef(null);
  const intensity4 = useRef(null);
  const transparencyOff = useRef(null);


  return (
    <div className="main">
      <CursorBlur intensity={1} transparency={true} image={cursor} canvas={intensity1} />
      <CursorBlur intensity={2} transparency={true} image={cursor} canvas={intensity2} />
      <CursorBlur intensity={3} transparency={true} image={cursor} canvas={intensity3} />
      <CursorBlur intensity={4} transparency={true} image={cursor} canvas={intensity4} />
      <CursorBlur transparency={false} image={cursor} canvas={transparencyOff} />

      <div className="content">
        <div className="box1" ref={intensity1}> Cursor Blur Intensity 1 </div>
        <div className="box1" ref={intensity2}> Cursor Blur Intensity 2 </div>
        <div className="box1" ref={intensity3}> Cursor Blur Intensity 3 </div>
        <div className="box1" ref={intensity4}> Cursor Blur Intensity 4 </div>
        <div className="box1" ref={transparencyOff}> Cursor Blur No Transparency </div>
        <div className="box1"> No Cursor Blur</div>
      </div>
    </div>
  );
}

export default App;

```
<div>The <b>intensity</b> prop accepts an int and has levels 1, 2, 3, 4. It determines how powerful the motion blur should be.</div>
</br>
<div>The <b>transparency</b> prop accepts a boolean determines if the opacity of the trailing cursor changes.</div>
</br>
<div>The <b>image</b> prop determines the image of the trailing cursor. </div>
</br>
<div>The <b>canvas</b> prop accepts a ref and determines the area over which the motion blur should occur.</div>
</br>

## Tips

* Always make sure that the CursorBlur component is above the canvas component that you are using.
  * This is seen in the usage example above.
  
* For the main cursor image and the CursorBlur image to match, you have to set the cursor to be the same as the img prop. This can be done in index.css.
  * <b>index.css</b>
    </br>
    ```css
    body {
      cursor: url("./autocursor.png"), auto;
    }
    ```
* If you set the transparency prop to false, then there is no need to set an intensity.
  * This is the case as opacity is not changing.
