<template>
  <div class="page__wrapper">
    <p class="title mt-40 mb-20">Faces2Voices</p>
    <player
      class="mb-20"
      :source="`https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3`"
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
    </player>
    <p id="description">
      Faces2Voices is an online interactive installation which uses facial
      recognition technology to create a generative music composition based on
      imaginary voices of online visitors. The composition is evolving in time
      depending on the contributions of people involved.
    </p>
    <p id="privacy_statement" class="mt-20 mb-30">
      <span class="bold">Privacy statement</span><br />
      We are implementing a responsible data policy. The project doesn't store
      or share personal data of participants, but only save and use fictional
      voice synthesiser metadata.
    </p>
    <uploader class="mb-20" />
  </div>
</template>
<style lang="scss">
@import '@/assets/styles/pages/index.scss';
</style>
