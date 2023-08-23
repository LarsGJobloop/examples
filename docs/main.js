import { mapRange } from './utilities.js'
import * as mouseListner from './follow.js'

const clear = mouseListner.setup(
  document.querySelectorAll(".follow"),
  (element, position) => {
    const effectAmplitude = 45
    // TODO: Actually figure out how to get the correct angle

    // Compute angle between element and mouse
    const angle = mapRange(
      (position.x -element.getBoundingClientRect().x),
      -(window.innerWidth / 2),
      (window.innerWidth / 2),
      -effectAmplitude,
      effectAmplitude
    )

    // set transform to new angle
    element.style.transform = `rotate3d(0.5, 1, 0.1, ${angle}deg)`
  },
  {
    updateFrequency: 1000 / 30
  }
)

document.getElementById("stop").addEventListener("click", clear)