<template>
  <div class="uploader__wrapper">
    <div class="fileUploader__wrapper mb-20">
      <div>
        <svg-icon
          style="height: 30px; width: 30px"
          name="camera"
          @click="upload"
        />
      </div>
      <p class="upload" @click="upload">Upload image</p>
    </div>
    <div class="uploader__preview mb-20">
      <!--<div class="alert" v-if="message">{{ message }}</div>-->
      <canvas ref="canvas" class="image" />
    </div>
    <player v-if="!preparedSound.hide" :source="preparedSound.src">
      <div style="position: relative">Your Voice</div>
    </player>
  </div>
</template>
<script>
import * as faceapi from 'face-api.js'
export default {
  data() {
    return {
      src: '',
      type: 'image',
      message: 'Take photo/ Upload image',
      preparedSound: {
        hide: false,
        src:
          'https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3',
      },
    }
  },
  mounted() {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(`${context.defaultURL}/models`),
      faceapi.nets.faceLandmark68Net.loadFromUri(`${context.defaultURL}/models`),
      faceapi.nets.faceRecognitionNet.loadFromUri(`${context.defaultURL}/models`),
      faceapi.nets.faceExpressionNet.loadFromUri(`${context.defaultURL}/models`),  
    ])
    // Вывести сообщение в alert, о том, что загружается FaceAPI
  },
  methods: {
    startFaceAPI() {
      this.currentInterval = setInterval(async () => {
                try{
                    canvasCtx.clearRect(0, 0, context.video.width, context.video.height)
                    canvasCtx.drawImage(context.video, 0, 0,  context.video.width, context.video.height)

                    const detection = await faceapi.detectSingleFace(
                    context.video,
                    new faceapi.TinyFaceDetectorOptions({ inputSize })
                    )
                    .withFaceLandmarks()
                    .withFaceExpressions()
                    if(detection) {
                        const resizedDetection = faceapi.resizeResults(detection, displaySize)
                        canvas.getContext('2d').clearRect(0, 0, context.video.width, context.video.height)
                        
                        //faceapi.draw.drawDetections(canvas, resizedDetection)
                        faceapi.draw.drawFaceLandmarks(canvas, resizedDetection)
                        //faceapi.draw.drawFaceExpressions(canvas, resizedDetection)

                        let max = { value:0, expression: ''} 
                     context.emotion = ''
                        context.$store.commit('work/SET_EMOTION', '', {root: true})

                        const expressions = detection.expressions
                        for(const expression of Object.keys(expressions)) {
                            if(expressions[expression] > max.value) {
                                max = {
                                    value: expressions[expression],
                                    expression,
                                }
                            }
                        }
                        
                        if(context.emotion !== max.expression) {
                            context.emotion = max.expression
                            context.$store.commit('work/SET_EMOTION', max.expression, {root: true})
                        }

                    } else if (context.emotion.length){
                        context.emotion = ''
                        context.$store.commit('work/SET_EMOTION', '', {root: true})        
                    }
                } catch (e) {
                    clearInterval(context.currentInterval)
                    context.loaderStatus({ id: 'loadingCamera', newValue: 'error'})
                    context.loaderMsg({ id:'loadingCamera', newValue: 'System error.Please try again later.'})
                    context.loaderVisibility({ id:'loadingCamera', newValue: true })
                }
                
            }, 200) 

    },
    upload() {
      const context = this
      const input = document.createElement('input')
      const reader = new FileReader()
      input.type = 'file'
      input.onchange = (e) => {
        const file = e.target.files[0]
        reader.readAsDataURL(file)
        reader.onload = (readerEvent) => {
          context.img = new Image(1, 1)
          context.img.onload = imageLoaded
          context.img.src = readerEvent.target.result
          const ctx = context.$refs.canvas.getContext('2d')
          function imageLoaded() {
            drawImageActualSize.bind(this)()
            context.startFaceAPI()
          }

          function drawImageActualSize() {
            // use the intrinsic size of image in CSS pixels for the canvas element
            context.$refs.canvas.width = this.naturalWidth
            context.$refs.canvas.height = this.naturalHeight

            // will draw the image as 300x227 ignoring the custom size of 60x45
            // given in the constructor
            ctx.drawImage(this, 0, 0)

            // To use the custom size we'll have to specify the scale parameters
            // using the element's width and height properties - lets draw one
            // on top in the corner:
            ctx.drawImage(this, 0, 0, this.width, this.height)
          }
        }
      }
      input.click()
    },
  },
}
</script>
<style lang="scss">
@import '@/assets/styles/components/Uploader.scss';
</style>
