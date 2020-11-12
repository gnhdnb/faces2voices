<script>
import { v4 as uuidv4, validate as uuidValidate } from 'uuid'
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      uuid: '',
    }
  },
  computed: {
    ...mapGetters({
      getValue: 'GET_VALUE_FROM_LOCALSTORAGE',
    }),
    ...mapState({
      participant: (state) => state.participant,
    }),
  },
  mounted() {
    const uuid = this.getValue('uuid')
    // validation
    if (uuidValidate(uuid)) {
      this.uuid = uuid
    } else {
      // generate new uuid
      const newUUID = uuidv4()
      this.setValue({ id: 'uuid', payload: newUUID })
      this.uuid = newUUID
    }

    const participant = this.getValue('participant')
    // validation
    if (participant) {
      this.isParticipant(true)
    } else {
      this.isParticipant(false)
      this.setValue({ id: 'participant', payload: false })
    }
  },
  methods: {
    ...mapMutations({
      setValue: 'SET_VALUE_TO_LOCALSTORAGE',
      isParticipant: 'SET_PARTICIPANT_VALUE',
    }),
  },
}
</script>
<template>
  <div class="page__wrapper">
    <p class="title mt-20 mb-10">Faces2Voices</p>
    <live-player
      :id="`stream`"
      class="mb-20"
      :source="`https://faces2voices.blob.core.windows.net/imagesandspecs/audio.wav`"
      :disabled="false"
      :loop="true"
    />
    <p class="description mb-10">
      Faces2Voices is an online interactive installation which uses facial
      recognition technology and AI-synthesized sound to create a generative
      music composition based on imaginary voices of online visitors. The
      composition is evolving in time depending on the contributions of people
      involved.
    </p>
    <p class="description mb-10">
      Many governments use surveillance technology as a way to control the
      spread of COVID-19. At the same moment many citizens are ready to give up
      some privacy for the common good. But how can we define what level of
      privacy should we give up and how much data do governments really need to
      respond effectively?
    </p>
    <p class="description mb-20">
      You can contribute to the project by giving access to the camera of your
      device. AI will recognise your face, synthesise your imaginary voice and
      add it to the live stream.
    </p>
    <camera v-if="!participant" class="mb-10" />
    <participant v-else class="mb-10" />
    <p id="privacy_statement" class="mb-20">
      <span class="bold">Privacy statement</span><br />
      We are implementing a responsible data policy. The project doesn't store
      or share personal data of participants, but only save and use fictional
      voice synthesiser metadata.
    </p>
    <p id="authors" class="mb-10">
      Faces2Voices is a project by
      <a class="links" target="_blank" href="http://nikonole.com/">
        Helena Nikonole</a
      >
      and
      <a class="links" href="https://gnhdnb.github.io" target="_blank"
        >Nikita Prudnikov</a
      >
    </p>
    <p id="inspired" class="mb-10">
      inspired by
      <a
        class="mb-20 links"
        target="_blank"
        href="https://arxiv.org/pdf/1905.09773.pdf"
      >
        Speech2Face
      </a>
    </p>
    <p id="developer" class="mb-10">
      designed by
      <a class="links" href="https://reverse-studio.web.app/faces2voices"
        ><u>Nikita Morozov</u></a
      >
    </p>
    <a
      class="mb-20"
      target="_blank"
      href="https://github.com/morozovspace/morozovspace.github.io"
    >
      <svg-icon style="height: 30px; width: 30px" name="github" />
    </a>
  </div>
</template>
<style lang="scss">
@import '@/assets/styles/pages/index.scss';
</style>
