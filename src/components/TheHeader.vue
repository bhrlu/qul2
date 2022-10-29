<script setup></script>

<template>
  <header>
    <img src="../assets/images/Vector.png" />
    <h5 class="text-h5 text-accent">LOGO</h5>
  </header>
</template>

<style  lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 30px;

  body.screen--lg & {
    justify-content: start;
  }

  img {
    width: 60px;
  }

  h5 {
    margin: 0;
    text-align: center;

    padding: 10px;

    body.screen--lg & {
      padding: 20px;
      text-align: left;
    }
  }
}
</style>
