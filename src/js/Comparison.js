export class Comparison {
  constructor(selector, options = {}) {
    this.app = document.querySelector(selector)
    this.track = null
    this.image = null
    this.trackClicked = false
    this.start = options.start
    this.init()
  }

  mouseMove(event) {
    const appCoords = this.app.getBoundingClientRect()
    const trackHalf = this.track.clientWidth / 2

    if (!this.trackClicked) {
      return;
    }

    const delta = event.pageX - (appCoords.left + trackHalf)
    const value =
      delta < 0
        ? 0 - trackHalf
        : delta > appCoords.width - this.track.clientWidth
        ? appCoords.width - trackHalf
        : delta

    this.track.style.left = `${value}px`
    this.image.style.width = `${value + trackHalf}px`
  };

  mouseUp () {
    this.trackClicked = false;
    document.removeEventListener("mousemove", this.mouseMove)
  }

  mouseDown () {
    this.trackClicked = true
    document.addEventListener("mousemove", this.mouseMove.bind(this))
    document.addEventListener("mouseup", this.mouseUp.bind(this))
  }

  initialStart () {
    this.image = this.app.querySelector('.js-image')
    this.start = this.start === 'center'
      ? this.app.clientWidth / 2
      : this.start === 'right'
      ? this.app.clientWidth
      : 0
    this.track.style.left = `${this.start - this.track.clientWidth / 2}px`
    this.image.style.width = `${this.start}px`
  }

  prepareApp () {
    this.track = document.createElement('div')
    this.track.classList.add('comparison__track', 'js-track')
    this.app = document.getElementById("comparisonSlider")
    this.app.append(this.track)
  }

  init() {
    this.prepareApp()
    this.initialStart()
    this.track.addEventListener("mousedown", this.mouseDown.bind(this))
  }

  destroy () {
    this.track.removeEventListener("mousedown", this.mouseDown.bind(this))
    this.track.remove()
    this.image.style.width = '0'

    this.app = null
    this.track = null
    this.image = null
    this.trackClicked = false
  }
}
