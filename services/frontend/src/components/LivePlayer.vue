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
      downloaded: false,
    }
  },
  methods: {
    start() {
      console.log(`button pressed`)
      const context = this
      if (context.disabled) {
        return false
      }
      Tone.context._context
        .resume()
        .then(() => {
          Tone.context.on('statechange', (args) => {
            console.log('statechange')
          })
          if (context.first) {
            context.showLoader = true
            context.crossFade = new Tone.CrossFade().toDestination()
            context.toneAudioBuffers = new Tone.ToneAudioBuffers()
            context.players.push(new Tone.Player())
            context.players.push(new Tone.Player())
            context.crossFade.fade.value = 0.5
            context.players[0].mute = context.muted
            context.players[1].mute = context.muted
            context.players[0].onstop = function () {
              console.log(
                `${new Date()}Player 0 stoped, current ${
                  context.currentPlayer
                }, next: ${context.nextPlayer}`
              )
            }
            context.players[1].onstop = function () {
              console.log(
                `${new Date()} Player 1 stoped, current ${
                  context.currentPlayer
                }, next: ${context.nextPlayer}`
              )
            }
            context.players[0].connect(context.crossFade.a)
            context.players[1].connect(context.crossFade.b)
            context.initVolumeSlider()
            context
              .download(`${context.source}?t=${new Date().getTime()}`, 0, 0)
              .then((buffer) => {
                context.showLoader = false
                const duration = Math.floor(
                  context.players[0].buffer.duration * 1000
                )
                context.duration = duration
                context.leftDuration = duration
                context.first = false
                context.toggle()
              })
              .catch((error) => {
                console.log(`${new Date()}. ERROR: ${error.message}`)
              })
          } else {
            context.toggle()
          }
        })
        .catch((e) => {
          console.log(e)
          console.log('Tone context error')
        })
    },
    download(src, bufferID, playerID) {
      console.log(`download`)
      const context = this
      return new Promise((resolve, reject) => {
        if (context.toneAudioBuffers.has(bufferID)) {
          console.log(
            `${new Date()} Buffer with name ${bufferID} exist, disposing`
          )
          context.toneAudioBuffers.get(bufferID).dispose()
        }
        console.log(`${new Date()} start download from ${src}`)
        context.toneAudioBuffers.add(
          bufferID,
          src,
          () => {
            console.log(
              `${new Date()} status: success, buf/plr: ${bufferID}/${playerID}`
            )
            context.players[playerID].buffer = context.toneAudioBuffers.get(
              bufferID
            )
            return resolve('OK')
          },
          (e) => {
            return reject(e || { message: 'Error when downloading' })
          }
        )
      })
    },
    play() {
      console.log(`play`)
      const context = this
      context.startTimestamp = new Date().getTime()
      console.log(context.leftDuration)
      console.log(context.duration)
      const secondPlayerTime =
        context.leftDuration - 30000 > 0 ? context.leftDuration - 30000 : 0
      console.log(`${new Date()}.Starting next player in ${secondPlayerTime}`)
      context.startSecondPlayerTimeout = setTimeout(function () {
        console.log(`${new Date()}. Start next player`)
        if (!context.downloaded) {
          // Берем старый буфер, подставляем его в новый плеер
          console.log(`${new Date()}. Not downloaded, use old buffer`)
          context.players[
            context.nextPlayer
          ].buffer = context.toneAudioBuffers.get(context.currentPlayer)
        }

        const i = context.currentPlayer
        context.currentPlayer = context.nextPlayer
        context.nextPlayer = i
        const duration = Math.floor(
          context.players[context.currentPlayer].buffer.duration * 1000
        )
        context.duration = duration
        context.leftDuration = duration
        context.downloaded = false
        context.loop += 1
        context.play()
      }, secondPlayerTime)

      const downloadStartedIn =
        context.duration - context.leftDuration < 10000
          ? 10000 - context.duration + context.leftDuration
          : 0
      console.log(`${new Date()}.Download started in: ${downloadStartedIn}`)
      context.downloadTimeout = setTimeout(function () {
        context
          .download(
            `${context.source}?t=${new Date().getTime()}`,
            context.nextPlayer,
            context.nextPlayer
          )
          .then(() => {
            context.downloaded = true
          })
          .catch((e) => {
            context.downloaded = false
            console.log(e)
          })
      }, downloadStartedIn)
      console.log(`${new Date()}. Start player ${context.currentPlayer}`)
      context.startPlayer(
        context.currentPlayer,
        context.duration - context.leftDuration,
        context.leftDuration
      )
    },
    startPlayer(id, offset, duration) {
      console.log(`startPlayer event`)
      const context = this
      context.players[id].start(0, offset / 1000, duration / 1000)
    },
    stop() {
      console.log(`stop event`)
      const context = this
      clearTimeout(context.downloadTimeout)
      clearTimeout(context.startSecondPlayerTimeout)
      context.stopTimestamp = new Date().getTime()
      context.leftDuration -= context.stopTimestamp - context.startTimestamp
      for (const player of context.players) {
        if (player.state === 'started') {
          player.stop()
          console.log('Player stoped by stop event')
        }
      }
    },
    toggle() {
      const context = this
      console.log(
        `${new Date()} toggle event. cur: ${context.status}, switch to: ${
          context.status === 'stoped' ? 'play' : 'stoped'
        }`
      )
      context.status = context.status === 'stoped' ? 'play' : 'stoped'
      context.status === 'play' ? context.play() : context.stop()
    },
    mute() {
      const context = this
      if (context.first) {
        return false
      }
      context.muted = !context.muted
      context.players[0].mute = !context.players[0].mute
      context.players[1].mute = !context.players[1].mute
    },
    initVolumeSlider() {
      const context = this
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
          context.players[0].volume.value = newVolume
          context.players[1].volume.value = newVolume
          context.muted = false
          context.players[0].mute = false
          context.players[1].mute = false
        },
        false
      )
    },
  },
}
</script>
<style lang="scss">
@import '@/assets/styles/components/LivePlayer.scss';
</style>
