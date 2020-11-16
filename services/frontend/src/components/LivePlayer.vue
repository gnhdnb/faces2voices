<template>
  <div ref="player" class="player__wrapper" style="width: 500px">
    <div
      class="player__controls"
      :style="{ cursor: disabled ? 'not-allowed' : 'pointer' }"
    >
      <loader v-if="showLoader" :id="`player`" />
      <svg-icon
        v-else
        style="height: 18px; width: 20px"
        :name="status == 'stoped' ? 'play' : 'pause'"
        @click="start"
      />
    </div>
    <div class="player__slot-wrapper">
      <div
        v-if="!showLoader"
        style="position: relative; cursor: pointer"
        @click="start"
      >
        Live<span id="live"></span>
      </div>
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
      status: 'stoped',
      muted: false,
      showLoader: false,
      first: true,
      crossFade: {},
      players: [],
      currentPlayer: 0,
      nextPlayer: 1,
      duration: 0,
      leftDuration: 0,
      loop: 1,
    }
  },
  methods: {
    startPlayer(offset, duration) {
      const context = this
      context.players[context.currentPlayer].instance.start(
        0,
        offset / 1000,
        duration / 1000
      )
    },
    download() {
      const context = this
      context.toneAudioBuffers.add(
        context.nextPlayer,
        `${context.source}?t=${new Date().getTime()}`,
        () => {
          console.log('Success')
          context.players[
            context.nextPlayer
          ].instance.buffer = context.toneAudioBuffers.get(context.nextPlayer)
        },
        (e) => {
          console.log('Error when adding to buffer')
          console.log(e)
        }
      )
    },
    play() {
      const context = this
      context.startTimestamp = new Date().getTime()
      context.startSecondPlayerTimeout = setTimeout(
        function () {
          console.log('Start second player')
          const i = context.currentPlayer
          context.currentPlayer = context.nextPlayer
          context.nextPlayer = i
          const duration = Math.floor(
            context.players[context.currentPlayer].instance.buffer.duration *
              1000
          )
          context.duration = duration
          context.leftDuration = duration
          context.play()
          context.loop += 1
        },
        context.leftDuration - 14000 > 0 ? context.leftDuration - 14000 : 0
      )
      context.startPlayer(
        context.duration - context.leftDuration,
        context.leftDuration
      )
      const downloadStartedIn =
        context.duration - context.leftDuration < 10000
          ? 10000 - context.duration + context.leftDuration
          : 0
      context.downloadTimeout = setTimeout(context.download, downloadStartedIn)
    },
    stop() {
      const context = this
      clearTimeout(context.downloadTimeout)
      clearTimeout(context.startSecondPlayerTimeout)
      context.stopTimestamp = new Date().getTime()
      context.leftDuration -= context.stopTimestamp - context.startTimestamp
      for (const player of context.players) {
        if (player.instance.state === 'started') {
          player.instance.stop()
          console.log('Stop player')
        }
      }
    },
    start() {
      console.log('Start')
      const context = this
      if (context.disabled) {
        return false
      }
      Tone.context.resume().then(() => {
        if (context.first) {
          console.log('Init')
          context.crossFade = new Tone.CrossFade().toDestination()
          context.players.push({ instance: new Tone.Player() })
          context.players.push({ instance: new Tone.Player() })
          context.crossFade.fade.value = 0.5
          context.players[0].instance.mute = context.muted
          context.players[0].instance.onstop = function () {
            console.log(`currentPlayer: ${context.currentPlayer}`)
            console.log(`nextPlayer: ${context.nextPlayer}`)
            console.log('Player 0 stoped')
          }
          context.players[1].instance.onstop = function () {
            console.log(`currentPlayer: ${context.currentPlayer}`)
            console.log(`nextPlayer: ${context.nextPlayer}`)
            console.log('Player 1 stoped')
          }
          context.players[1].instance.mute = context.muted
          context.players[0].instance.connect(context.crossFade.a)
          context.players[1].instance.connect(context.crossFade.b)
          // click volume slider to change volume
          const volumeSlider = this.$refs.volumeSlider
          volumeSlider.addEventListener(
            'click',
            (e) => {
              const sliderWidth = window.getComputedStyle(volumeSlider).width
              let newVolume = e.offsetX / parseInt(sliderWidth)
              this.$refs.volumePercentage.style.width = newVolume * 100 + '%'
              newVolume = (newVolume * 100) / 5 - 10
              if (newVolume === -10) {
                return context.mute()
              }
              context.players[0].instance.volume.value = newVolume
              context.players[1].instance.volume.value = newVolume
              context.muted = false
              context.players[0].instance.mute = false
              context.players[1].instance.mute = false
            },
            false
          )
          context.showLoader = true
          context.toneAudioBuffers = new Tone.ToneAudioBuffers(
            [context.source],
            () => {
              console.log('Buffer created')
              context.showLoader = false
              context.players[
                context.currentPlayer
              ].instance.buffer = context.toneAudioBuffers.get(
                context.currentPlayer
              )
              context.players[
                context.nextPlayer
              ].instance.buffer = context.toneAudioBuffers.get(
                context.currentPlayer
              )
              context.first = false
              const duration = Math.floor(
                context.players[context.currentPlayer].instance.buffer
                  .duration * 1000
              )
              context.duration = duration
              context.leftDuration = duration
              context.toggle()
            }
          )
        } else {
          context.toggle()
        }
      })
    },
    toggle() {
      const context = this
      context.status = context.status === 'stoped' ? 'play' : 'stoped'
      context.status === 'play' ? context.play() : context.stop()
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
@import '@/assets/styles/components/LivePlayer.scss';
</style>
