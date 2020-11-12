<template>
  <div ref="player" class="player__wrapper">
    <div
      class="player__controls"
      :style="{ cursor: disabled ? 'not-allowed' : 'pointer' }"
    >
      <loader v-if="showLoader" :id="`player`" :show_text="false" />
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
  },
  data() {
    return {
      play: false,
      muted: false,
      showLoader: false,
      first: true,
      crossFade: {},
      players: [],
      currentPlayer: 0,
      nextPlayer: 1,
      time: 0,
    }
  },
  mounted() {
    const context = this
    context.crossFade = new Tone.CrossFade().toDestination()
    context.players.push({ time: 0, timer: {}, instance: new Tone.Player() })
    context.players.push({ time: 0, timer: {}, instance: new Tone.Player() })
    context.crossFade.fade.value = 0.5
    context.players[0].instance.mute = context.muted
    context.players[1].instance.mute = context.muted
    context.players[0].instance.connect(context.crossFade.a)
    context.players[1].instance.connect(context.crossFade.b)

    // click volume slider to change volume
    const volumeSlider = this.$refs.volumeSlider
    volumeSlider.addEventListener(
      'click',
      (e) => {
        const sliderWidth = window.getComputedStyle(volumeSlider).width
        const newVolume = e.offsetX / parseInt(sliderWidth)
        this.$refs.volumePercentage.style.width = newVolume * 100 + '%'
        context.players[0].instance.volume.value = -(100 - newVolume * 100)
        context.players[1].instance.volume.value = -(100 - newVolume * 100)
        this.muted = false
        context.players[0].instance.mute = false
        context.players[1].instance.mute = false
      },
      false
    )
  },
  methods: {
    toggle() {
      const context = this
      if (context.play) {
        clearInterval(context.interval)
        for (const player of context.players) {
          if (player.instance.state === 'started') {
            player.instance.stop()
          }
        }
      } else {
        context.players[context.currentPlayer].instance.start(
          0,
          context.time / 1000
        )
        let duration = Math.round(
          context.players[context.currentPlayer].instance.buffer.duration * 1000
        )
        let startDownload = true
        context.interval = setInterval(() => {
          context.time += 100
          if (context.time > duration / 2) {
            if (startDownload) {
              context.toneAudioBuffers.add(
                context.nextPlayer,
                context.source,
                () => {
                  context.players[
                    context.nextPlayer
                  ].instance.buffer = context.toneAudioBuffers.get(
                    context.nextPlayer
                  )
                }
              )
            }
            startDownload = false
          }
          if (duration - context.time < 13900) {
            const i = context.currentPlayer
            context.currentPlayer = context.nextPlayer
            context.nextPlayer = i
            duration = Math.round(
              context.players[context.currentPlayer].instance.buffer.duration *
                1000
            )
            context.time = 0
            startDownload = true
            context.players[context.currentPlayer].instance.start()
          }
        }, 100)
      }
      context.play = !context.play
    },
    start() {
      const context = this
      if (context.disabled) {
        return false
      }
      if (context.first) {
        context.showLoader = true
        context.toneAudioBuffers = new Tone.ToneAudioBuffers(
          [context.source],
          () => {
            context.showLoader = false
            context.players[
              context.currentPlayer
            ].instance.buffer = context.toneAudioBuffers.get(
              context.currentPlayer
            )
            context.first = false
            context.toggle()
          }
        )
      } else {
        context.toggle()
      }
    },
    mute() {
      const context = this
      if (context.first) {
        return false
      }
      context.muted = !context.muted
      context.players[0].instance.mute = !context.players[0].instance.mute
      context.players[1].instance.mute = !context.players[1].instance.mute
    },
  },
}
</script>
<style lang="scss">
@import '@/assets/styles/components/Player.scss';
</style>
