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
      class="mb-20"
      :id="`stream`"
      :source="`https://faces2voices.blob.core.windows.net/imagesandspecs/audio.wav`"
      :disabled="false"
      :loop="true"
    >
      <div style="position: relative">
        Live<span
          style="
            display: block;
            height: 10px;
            width: 10px;
            position: absolute;
            top: -5px;
            right: -5px;
            border-radius: 50%;
            background: #f21e2b;
            animation: glowing 1s infinite;
          "
        ></span>
      </div>
    </live-player>
    <p class="description mb-10">
      Faces2Voices is an online interactive installation which uses facial
      recognition technology to create a generative music composition based on
      imaginary voices of online visitors. The composition is evolving in time
      depending on the contributions of people involved.
    </p>
    <p class="description mb-20">
      Faces2Voices is an online interactive installation which uses facial
      recognition technology to create a generative music composition based on
      imaginary voices of online visitors. The composition is evolving in time
      depending on the contributions of people involved.
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
