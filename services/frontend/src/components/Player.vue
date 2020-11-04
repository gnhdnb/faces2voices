<template>
  <div ref="player" class="player__wrapper">
    <div class="player__controls" @click="toggle">
      <svg-icon
        style="height: 18px; width: 20px"
        :name="play ? 'pause' : 'play'"
      />
    </div>
    <div class="player__slot-wrapper">
      <slot />
    </div>
    <div class="volume-container">
      <div class="volume-button" @click="mute">
        <svg-icon
          style="height: 18px; width: 20px"
          :name="muted ? 'muted_speaker' : 'speaker'"
        />
      </div>
      <div ref="volumeSlider" class="volume-slider">
        <div ref="volumePercentage" class="volume-percentage"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    source: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      play: false,
      muted: false,
    }
  },
  mounted() {
    const context = this

    this.audio = new Audio(context.source)

    context.audio.addEventListener(
      'loadeddata',
      () => {
        context.audio.volume = 0.75
      },
      false
    )

    // click volume slider to change volume
    const volumeSlider = this.$refs.volumeSlider
    volumeSlider.addEventListener(
      'click',
      (e) => {
        const sliderWidth = window.getComputedStyle(volumeSlider).width
        const newVolume = e.offsetX / parseInt(sliderWidth)
        context.audio.volume = newVolume
        this.$refs.volumePercentage.style.width = newVolume * 100 + '%'
        if (newVolume) {
          this.muted = false
          this.audio.muted = false
        }
      },
      false
    )
  },
  methods: {
    toggle() {
      this.play = !this.play
      this.play ? this.audio.play() : this.audio.pause()
    },
    mute() {
      this.muted = !this.muted
      this.audio.muted = !this.audio.muted
    },
  },
}
</script>
<style lang="scss">
@import '@/assets/styles/components/Player.scss';
</style>
