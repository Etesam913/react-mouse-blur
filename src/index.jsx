import React, { useState, useEffect } from 'react';
import { motion, transform, useSpring } from 'framer-motion';
import styled from 'styled-components';
const CursorTrail = styled(motion.img)`
  pointer-events: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  position: absolute;
  visibility: ${props=>props.visibility};
`



function CursorBlur(props) {

  const [opacityOutput, setOpacityOutput] = useState(0);
  const [inCanvas, setInCanvas] = useState(false);
  const [cursorWidth, setCursorWidth] = useState(0);
  const [cursorHeight, setCursorHeight] = useState(0);
  const x = useSpring(0, { stiffness: 1000, mass: .03 });
  const y = useSpring(0, { stiffness: 1000, mass: .03 });

  let inputRange = [0, 2000];
  const outputRange = [0, 1];
  let timeout;
  useEffect(() => {
    props.canvas.current.addEventListener("mouseover", function () { setInCanvas(true); });
    props.canvas.current.addEventListener('mousemove', getCalculations);
    props.canvas.current.addEventListener("mouseout", function () { setInCanvas(false); });
    return () => {
      window.removeEventListener('mousemove', getCalculations)
    }
  }, []);

  useEffect(() => {
    var img = new Image();
    img.onload = function () {
      setCursorHeight(this.height);
      setCursorWidth(this.width);
    }
    img.src = props.image;
  }, [props.image]);

  useEffect(()=>{
    console.log(x.getVelocity());
  },[x])

  function getCalculations(e) {
    clearTimeout(timeout);
    timeout = setTimeout(function(){setOpacityOutput(0)}, 100);
    var pos = getMousePos(e);
    x.set(pos.x);
    y.set(pos.y);
    calculateOpacityInput();
    setOpacityOutput(transform((Math.abs(x.getVelocity()) + Math.abs(y.getVelocity())) / 2, inputRange, outputRange));
  }

  function calculateOpacityInput() {
    if (props.intensity === 4) {
      inputRange = [0, 1000];
    }
    else if (props.intensity === 3) {
      inputRange = [0, 1500];
    }
    else if (props.intensity === 2) {
      inputRange = [0, 2000];
    }
    else if (props.intensity === 1) {
      inputRange = [0, 3000];
    }
    else {
      inputRange = [0, 3000];
    }
  }

  function getMousePos(evt) {
    return {
      x: evt.clientX,
      y: evt.clientY,
    };
  }

  return (
    <CursorTrail visibility={inCanvas ? "visible" : "hidden" } style={{ x, y, height: cursorHeight + "px", width: cursorWidth + "px"}}
      animate={props.transparency ? { opacity: opacityOutput } : { opacity: 1 }} transition={{ duration: .1 }} src={props.image}>
    </CursorTrail>
  );
}

export default CursorBlur;
