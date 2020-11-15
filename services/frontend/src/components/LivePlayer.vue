<template>
  <div>
    Duration: {{ duration }} Time: {{ time }} currentPlayer:
    {{ currentPlayer }}
    nextPlayer: {{ nextPlayer }}
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
        <div
          style="position: relative; cursor: pointer"
          v-if="!showLoader"
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
      duration: 0,
    }
  },
  methods: {
    download() {
      const context = this
      console.log(`Downloading started at time: ${context.time}`)
    },
    start() {
      console.log('start event')
      const context = this
      if (context.disabled) {
        return false
      }
      Tone.context.resume().then(() => {
        if (context.first) {
          console.log('Create players and buffers')
          context.crossFade = new Tone.CrossFade().toDestination()
          context.players.push({ instance: new Tone.Player() })
          context.players.push({ instance: new Tone.Player() })
          context.crossFade.fade.value = 0.5
          context.players[0].instance.loop = true
          context.players[0].instance.mute = context.muted
          context.players[1].instance.mute = context.muted
          context.players[0].instance.connect(context.crossFade.a)
          context.players[1].instance.connect(context.crossFade.b)

          // click volume slider to change volume
          const volumeSlider = this.$refs.volumeSlider
          volumeSlider.addEventListener(
            'click',
            (e) => {
              // const sliderWidth = window.getComputedStyle(volumeSlider).width
              // const newVolume = e.offsetX / parseInt(sliderWidth)
              console.log(
                `First player state: ${context.players[0].instance.state}`
              )
              console.log(
                `Second player state: ${context.players[1].instance.state}`
              )
              /*
              this.$refs.volumePercentage.style.width = newVolume * 100 + '%'
              context.players[0].instance.volume.value = -(
                100 -
                newVolume * 100
              )
              context.players[1].instance.volume.value = -(
                100 -
                newVolume * 100
              )
              */
              this.muted = false
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
              context.first = false
              context.toggle()
            }
          )
        } else {
          context.toggle()
        }
      })
    },
    toggle() {
      console.log('toggle event')
      const context = this
      if (context.play === false) {
        console.log('Start playing song')
        // Duration in miliseconds
        context.duration =
          context.players[context.currentPlayer].instance.buffer.duration * 1000
        context.players[context.currentPlayer].instance.start(0)
        console.log('Start interval')
        let downloading = false
        context.interval = setInterval(() => {
          context.time += 50
          if (context.duration - context.time < 2000) {
            console.log('Time left less than 2000 msc')
            context.players[context.currentPlayer].instance.stop()
            context.duration += 0
            context.time = 0
            context.players[context.currentPlayer].instance.start()
          }
          if (downloading === false) {
            if (context.time > context.duration / 2) {
              downloading = true
              context.download()
            }
          }
        }, 50)
        console.log(
          `duration: ${
            context.players[context.currentPlayer].instance.buffer.duration
          }`
        )
      } else {
        clearInterval(context.interval)
        for (const player of context.players) {
          if (player.instance.state === 'started') {
            player.instance.stop()
            console.log('stop player')
          }
        }
      }
      context.play = !context.play
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
