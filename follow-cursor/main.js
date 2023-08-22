import { mapRange } from './utilities.js'
import * as mouseListner from './follow.js'

const clear = mouseListner.setup(
  document.querySelectorAll(".follow"),
  (element, position) => {
    const effectAmplitude = 80
    // TODO: Actually figure out how to get the correct angle

    // Compute angle between element and mouse
    const angle = mapRange(position.x, 0, window.innerWidth, -effectAmplitude, effectAmplitude)

    // set transform to new angle
    element.style.transform = `rotate3d(0, 1, 0, ${angle}deg)`
  },
  {
    updateFrequency: 1000 / 1
  }
)

document.getElementById("stop").addEventListener("click", clear)