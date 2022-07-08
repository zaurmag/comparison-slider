let $app = null
let $track = null
let $image = null
let trackClicked = false
let start = 'center'

const mouseMoveHandler = (event) => {
  event = event.changedTouches ? event.changedTouches[0] : event
  const appCoords = $app.getBoundingClientRect()
  const trackHalf = $track.clientWidth / 2

  if (!trackClicked) {
    return;
  }

  const delta = event.pageX - (appCoords.left + trackHalf)
  const value =
    delta < 0
      ? 0 - trackHalf
      : delta > appCoords.width - $track.clientWidth
      ? appCoords.width - trackHalf
      : delta

  $track.style.left = `${value}px`
  $image.style.width = `${value + trackHalf}px`
};

const mouseUpHandler = () => {
  trackClicked = false;
  document.removeEventListener("mousemove", mouseMoveHandler)
}

const mouseDownHandler = () => {
  trackClicked = true
  document.addEventListener("mousemove", mouseMoveHandler)
  document.addEventListener("mouseup", mouseUpHandler)

  document.addEventListener("touchmove", mouseMoveHandler)
  document.addEventListener("touchend", mouseUpHandler)
}

const initialStart = () => {
  $image = $app.querySelector('.js-image')
  start = $app.clientWidth / 2 || 0
  $track.style.left = `${start - $track.clientWidth / 2}px`
  $image.style.width = `${start}px`
}

const prepareApp = () => {
  $track = document.createElement('div')
  $track.classList.add('comparison__track', 'js-track')
  $app = document.getElementById("comparisonSlider")
  $app.append($track)
}

function init() {
  prepareApp()
  initialStart()
  $track.addEventListener("mousedown", mouseDownHandler)
  $track.addEventListener("touchstart", mouseDownHandler)
}

function destroy () {
  $track.removeEventListener("mousedown", mouseDownHandler)
  $track.remove()
  $image.style.width = '0'

  $app = null
  $track = null
  $image = null
  trackClicked = false
}

export default {
  init,
  // destroy
}
