<template>
  <div class="camera__wrapper">
    <div v-if="cameraStatus" ref="cameraWrapper" class="camera__video">
      <canvas ref="canvas" class="camera__canvas"></canvas>
      <div ref="canvasWrapper" class="camera__canvas"></div>
    </div>
    <div v-else class="camera__button" @click="turnOnCamera">
      <svg-icon style="height: 40px; width: 40px" name="camera" />
    </div>
    <loader :id="`camera`" />
  </div>
</template>
<style lang="scss">
@import '@/assets/styles/components/Camera.scss';
</style>
<script>
import * as faceapi from 'face-api.js'
import { mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      cameraStatus: false,
      dates: [],
      descriptors: [],
    }
  },
  computed: {
    ...mapGetters({
      getValue: 'GET_VALUE_FROM_LOCALSTORAGE',
    }),
  },
  created() {
    this.setLoaderProps({ id: 'camera', propID: 'hidden', value: true })
  },
  methods: {
    ...mapMutations({
      setLoaderProps: 'SET_LOADER_PROPS',
      setValue: 'SET_VALUE_TO_LOCALSTORAGE',
      isParticipant: 'SET_PARTICIPANT_VALUE',
    }),
    sendDescriptors() {
      const context = this
      console.log(context.getValue('uuid'))
      console.log('Request')
      const payload = {
        Id: context.getValue('uuid'),
        Descriptor: JSON.stringify(context.descriptors[0]),
      }

      context.$axios
        .post('/contribute', payload, { withCredentials: false })
        .then((response) => {
          if (response.status === 202) {
            return setTimeout(context.sendDescriptors, 5000)
          } else {
            try {
              console.log(response.data)
              context.setValue({
                id: 'imgURI',
                payload: response.data.spectrogramUri,
              })
              context.setValue({
                id: 'voiceURI',
                payload: response.data.voiceUri,
              })
              context.isParticipant(true)
              context.setValue({
                id: 'participant',
                payload: true,
              })
            } catch (e) {
              context.setLoaderProps({
                id: 'camera',
                propID: 'status',
                value: 'error',
              })
              context.setLoaderProps({
                id: 'camera',
                propID: 'message',
                value: 'System error. Check console',
              })
              context.setLoaderProps({
                id: 'camera',
                propID: 'hidden',
                value: false,
              })
            }
          }
        })
        .catch((e) => {
          console.log(e)
          context.setLoaderProps({
            id: 'camera',
            propID: 'status',
            value: 'error',
          })
          context.setLoaderProps({
            id: 'camera',
            propID: 'message',
            value: 'System error. Check console',
          })
          context.setLoaderProps({
            id: 'camera',
            propID: 'hidden',
            value: false,
          })
        })
    },
    turnOnCamera() {
      const context = this
      return new Promise((resolve, reject) => {
        try {
          context.setLoaderProps({
            id: 'camera',
            propID: 'status',
            value: 'loading',
          })
          context.setLoaderProps({
            id: 'camera',
            propID: 'message',
            value: 'Initialize camera',
          })
          context.setLoaderProps({
            id: 'camera',
            propID: 'hidden',
            value: false,
          })
          navigator.mediaDevices
            .getUserMedia({ audio: false, video: true })
            .then((stream) => {
              context.setLoaderProps({
                id: 'camera',
                propID: 'message',
                value: 'Inialize FaceAPI',
              })
              context.cameraStatus = true
              context
                .startFaceAPI()
                .then(() => {
                  context.video = document.createElement('video')
                  try {
                    context.video.srcObject = stream
                  } catch (error) {
                    context.video.src = URL.createObjectURL(stream)
                  }
                  context.video.setAttribute('autoplay', '1')
                  context.video.setAttribute('muted', '1')
                  context.video.setAttribute(
                    'style',
                    'opacity: 0; position: absolute; top: 0;left:0;'
                  )
                  context.video.setAttribute('playsinline', '1')
                  context.video.setAttribute('webkit-playsinline', '1')
                  context.video.setAttribute(
                    'width',
                    context.$refs.cameraWrapper.offsetWidth
                  )
                  context.video.setAttribute(
                    'height',
                    context.$refs.cameraWrapper.offsetHeight
                  )
                  context.$refs.canvasWrapper.appendChild(context.video)

                  context.video.addEventListener('play', function () {
                    context.setLoaderProps({
                      id: 'camera',
                      propID: 'hidden',
                      value: true,
                    })
                    context.play()
                  })
                })
                .catch((e) => {
                  context.setLoaderProps({
                    id: 'camera',
                    propID: 'status',
                    value: 'error',
                  })
                  context.setLoaderProps({
                    id: 'camera',
                    propID: 'message',
                    value: e.message || 'Check console for logs',
                  })
                  console.log(e)
                })
              return resolve('OK')
            })
            .catch((e) => {
              context.setLoaderProps({
                id: 'camera',
                propID: 'status',
                value: 'error',
              })
              context.setLoaderProps({
                id: 'camera',
                propID: 'message',
                value: e.message,
              })
              context.setLoaderProps({
                id: 'camera',
                propID: 'hidden',
                value: false,
              })
              return reject(new Error(`Error: ${e.message}`))
            })
        } catch (e) {
          context.setLoaderProps({
            id: 'camera',
            propID: 'status',
            value: 'error',
          })
          context.setLoaderProps({
            id: 'camera',
            propID: 'message',
            value: 'You are not able to use interactive mode',
          })
          context.setLoaderProps({
            id: 'camera',
            propID: 'hidden',
            value: false,
          })
          return reject(new Error('You are not able to use interactive mode'))
        }
      })
    },
    startFaceAPI() {
      return Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(`/models`),
        faceapi.nets.faceLandmark68Net.loadFromUri(`/models`),
        faceapi.nets.faceRecognitionNet.loadFromUri(`/models`),
        faceapi.nets.faceExpressionNet.loadFromUri(`/models`),
      ])
    },
    play(e) {
      const context = this
      const canvas = faceapi.createCanvasFromMedia(context.video)

      const displaySize = {
        width: context.video.width,
        height: context.video.height,
      }

      this.$refs.canvasWrapper.append(canvas)
      faceapi.matchDimensions(canvas, displaySize)

      const canvasCtx = context.$refs.canvas.getContext('2d')
      canvasCtx.canvas.width = context.video.width
      canvasCtx.canvas.height = context.video.height

      const inputSize = context.video.height < 207 ? 128 : 320

      context.currentInterval = setInterval(async () => {
        try {
          canvasCtx.clearRect(0, 0, context.video.width, context.video.height)
          canvasCtx.drawImage(
            context.video,
            0,
            0,
            context.video.width,
            context.video.height
          )

          const detection = await faceapi
            .detectSingleFace(
              context.video,
              new faceapi.TinyFaceDetectorOptions({ inputSize })
            )
            .withFaceLandmarks()
            .withFaceDescriptor()
          if (detection) {
            if (context.descriptors.length < 3) {
              if (!context.dates.length) {
                context.dates.push(Date.now())
              }

              if (Date.now() - context.dates[context.dates.length - 1] > 500) {
                context.descriptors.push(detection.descriptor)
              }
            } else {
              context.setLoaderProps({
                id: 'camera',
                propID: 'status',
                value: 'loading',
              })
              context.setLoaderProps({
                id: 'camera',
                propID: 'message',
                value: 'Sending request',
              })
              context.setLoaderProps({
                id: 'camera',
                propID: 'hidden',
                value: false,
              })
              context.sendDescriptors()
              return clearInterval(context.currentInterval)
            }

            const resizedDetection = faceapi.resizeResults(
              detection,
              displaySize
            )

            canvas
              .getContext('2d')
              .clearRect(0, 0, context.video.width, context.video.height)

            faceapi.draw.drawFaceLandmarks(canvas, resizedDetection)
          }
        } catch (e) {
          console.log(e)
          context.setLoaderProps({
            id: 'camera',
            propID: 'status',
            value: 'error',
          })
          context.setLoaderProps({
            id: 'camera',
            propID: 'message',
            value: 'System error. Check console',
          })
          context.setLoaderProps({
            id: 'camera',
            propID: 'hidden',
            value: false,
          })
          return clearInterval(context.currentInterval)
        }
      }, 250)
    },
  },
}
</script>
