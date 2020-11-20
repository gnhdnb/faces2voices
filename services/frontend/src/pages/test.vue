<script>
export default {
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    play() {
      const context = this
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        })
        .then((stream) => {
          context.isActive = true
          const settings = stream.getVideoTracks()[0].getSettings()
          console.log(settings)
          context.$refs.video.srcObject = stream
        })
      console.log('play')
    },
    canplay() {
      console.log('canplay')
    },
  },
}
</script>
<template>
  <div class="camera__wrapper">
    <video
      ref="video"
      class="camera__video"
      mute
      autoplay
      playsinline
      @canplay="canplay"
    />
    <span @click="play">PLAY</span>
  </div>
</template>
<style lang="scss">
.camera {
  &__wrapper {
    width: 100%;
    background: red;
  }
  &__video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    pointer-events: none;
    &::-webkit-media-controls {
      display: none !important;
    }
    &::-webkit-media-controls-start-playback-button {
      display: none;
    }
  }
}
</style>
