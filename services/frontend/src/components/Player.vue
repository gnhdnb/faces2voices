<template>
  <div ref="player" class="player__wrapper">
    <div
      class="player__controls"
      :style="{ cursor: disabled ? 'not-allowed' : 'pointer' }"
    >
      <svg-icon
        v-if="loaded"
        @click="toggle"
        style="height: 18px; width: 20px"
        :name="play ? 'pause' : 'play'"
      />
      <loader v-else :id="`player`" :show_text="false" />
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
import * as Tone from 'tone'
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loop: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      play: false,
      muted: false,
      loaded: false,
    }
  },
  mounted() {
    const context = this
    context.player = new Tone.Player(context.source, () => {
      context.player.loop = context.loop
      context.loaded = true
    }).toDestination()

    // click volume slider to change volume
    const volumeSlider = this.$refs.volumeSlider
    volumeSlider.addEventListener(
      'click',
      (e) => {
        const sliderWidth = window.getComputedStyle(volumeSlider).width
        const newVolume = e.offsetX / parseInt(sliderWidth)
        this.$refs.volumePercentage.style.width = newVolume * 100 + '%'
        console.log(-(100 - newVolume * 100))
        this.player.volume.value = -(100 - newVolume * 100)
        this.muted = false
        context.player.mute = false
      },
      false
    )
  },
  methods: {
    toggle() {
      if (this.disabled) {
        return false
      }
      this.play = !this.play
      this.play ? this.player.start() : this.player.stop()
      this.player.volume.value = -10
    },
    mute() {
      this.muted = !this.muted
      console.log(this.player.volume.value)
      this.player.mute = !this.player.mute
    },
  },
}
</script>
<style lang="scss">
@import '@/assets/styles/components/Player.scss';
</style>
