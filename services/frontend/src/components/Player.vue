<template>
  <div ref="player" class="player__wrapper">
    <div
      class="player__controls"
      :style="{ cursor: disabled ? 'not-allowed' : 'pointer' }"
    >
      <loader v-if="showLoader" :id="`player`" />
      <svg-icon
        v-else
        style="height: 18px; width: 20px"
        :name="play ? 'pause' : 'play'"
        @click="start"
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
      showLoader: false,
      first: true,
      time: 0,
    }
  },
  methods: {
    start() {
      const context = this
      Tone.context.resume().then(() => {
        if (context.first) {
          context.showLoader = true
          context.player = new Tone.Player(context.source, () => {
            context.player.volume.value = -10
            context.player.onstop = function () {
              context.play = false
              context.time = 0
            }
            context.showLoader = false
            // click volume slider to change volume
            const volumeSlider = this.$refs.volumeSlider
            volumeSlider.addEventListener(
              'click',
              (e) => {
                const sliderWidth = window.getComputedStyle(volumeSlider).width
                const newVolume = e.offsetX / parseInt(sliderWidth)
                this.$refs.volumePercentage.style.width = newVolume * 100 + '%'
                this.player.volume.value = -(100 - newVolume * 100)
                this.muted = false
                context.player.mute = false
              },
              false
            )
            context.first = false
            context.toggle()
          }).toDestination()
        } else {
          context.toggle()
        }
      })
    },
    toggle() {
      const context = this
      if (context.disabled) {
        return false
      }
      if (context.play) {
        clearInterval(context.interval)
        context.player.stop()
      } else {
        context.player.start(0, context.time / 1000)
        context.interval = setInterval(() => {
          context.time += 100
        }, 100)
      }
      context.play = !context.play
    },
    mute() {
      const context = this
      if (context.first) {
        return false
      }
      context.muted = !context.muted
      context.player.mute = !context.player.mute
    },
  },
}
</script>
<style lang="scss">
@import '@/assets/styles/components/Player.scss';
</style>
