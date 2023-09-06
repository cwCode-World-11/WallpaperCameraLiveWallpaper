var lens = document.querySelector("#lens");
var lensOuter = document.querySelector("#lensOuter");
var minScale = 80;
var maxScale = 110;
var midScale = (minScale + maxScale) / 2;

document.querySelector("body").addEventListener("mousemove", rotating);

function rotating(e) {
  lensOuterFunction(e);
  lensFunction(e);
}

function lensOuterFunction(e) {
  // let rot = (e.pageX / 2) % 360;
  // lensOuter.style.transform = "rotate(" + rot + "deg)";

  const mouseXaxis = e.clientX;
  const mouseYaxis = e.clientY;
  const rekt = lensOuter.getBoundingClientRect();
  const lensOuterX = rekt.left + rekt.width / 2;
  const lensOuterY = rekt.top + rekt.height / 2;

  const angleDeg = angle(mouseXaxis, mouseYaxis, lensOuterX, lensOuterY);
  lensOuter.style.transform = `rotate(${angleDeg}deg)`;
}

function lensFunction(e) {
  // let x = lensOuter.getBoundingClientRect().left + lensOuter.clientWidth;
  // let y = lensOuter.getBoundingClientRect().top + lensOuter.clientHeight;
  // lens.style.transform = "scale(" + scale + "%)";

  const mouseXaxis = e.clientX;
  const mouseYaxis = e.clientY;
  const rekt = lens.getBoundingClientRect();
  const lensX = rekt.left + rekt.width / 2;
  const lensY = rekt.top + rekt.height / 2;

  // Percentage = (Input – Range Minimum)*100 / (Range Maximum – Range Minimum) //percentage
  // Value = ((percent * (max - min) / 100) + min) //percentage
  const a = angle(mouseXaxis, mouseYaxis, lensX, lensY);
  if (a > 0) {
    const b = ((a - 1) * 100) / (180 - 1);
    let b1 = (b * (midScale - minScale)) / 100 + minScale;
    console.log("b1:", b1);
    lens.style.transform = "scale(" + b1 + "%)";
  } else {
    const b3 = ((a - -180) * 100) / (0 - -180);
    let b4 = (b3 * (maxScale - midScale)) / 100 + midScale;
    console.log("b4:", b4);
    lens.style.transform = "scale(" + b4 + "%)";
  }
}

function angle(cx, cy, ex, ey) {
  const dx = ex - cx;
  const dy = ey - cy;
  const rad = Math.atan2(dy, dx);
  const deg = (rad * 180) / Math.PI;
  return deg;
}

// inspire from after effects code(expression)
function linear(refMin, refMax, max) {
  let refAvg = (refMin / refMax) * 100;
  return (refAvg / 100) * max;
}
