var lens = document.querySelector("#lens");
var lensOuter = document.querySelector("#lensOuter");
var minScale = 80;
var maxScale = 110;
var midScale = (minScale + maxScale) / 2;

document.querySelector("body").addEventListener("mousemove", rotating);

function rotating(e) {
  const mouseXaxis = e.clientX;
  const mouseYaxis = e.clientY;

  const rektLensOuter = lensOuter.getBoundingClientRect();
  const lensOuterX = rektLensOuter.left + rektLensOuter.width / 2;
  const lensOuterY = rektLensOuter.top + rektLensOuter.height / 2;
  const angleDeg = angle(mouseXaxis, mouseYaxis, lensOuterX, lensOuterY);

  const rekt = lens.getBoundingClientRect();
  const lensX = rekt.left + rekt.width / 2;
  const lensY = rekt.top + rekt.height / 2;
  const a = angle(mouseXaxis, mouseYaxis, lensX, lensY);
  lensOuterFunction(angleDeg);
  lensFunction(a);
}

function lensOuterFunction(angleDeg) {
  lensOuter.style.transform = `rotate(${angleDeg}deg)`;
}

function lensFunction(a) {
  // Percentage = (Input – Range Minimum)*100 / (Range Maximum – Range Minimum) //percentage
  // Value = ((percent * (max - min) / 100) + min) //percentage
  if (a > 0) {
    let b1 = ((a - 1) * 100) / (180 - 1);
    let b2 = (b1 * (midScale - minScale)) / 100 + minScale;

    lens.style.transform = "scale(" + b2 + "%)";
  } else {
    let b3 = ((a - -180) * 100) / (0 - -180);
    let b4 = (b3 * (maxScale - midScale)) / 100 + midScale;

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
