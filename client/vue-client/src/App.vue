<template>
  <main>
    <the-form></the-form>
    <br />
    <hr />
    <br />
    <mock-results></mock-results>
    <postman-results></postman-results>
  </main>
</template>

<script>
import MockResults from './components/MockResults.vue';
import PostmanResults from './components/PostmanResults.vue';
import TheForm from './components/TheForm.vue';

export default {
  components: {
    TheForm,
    MockResults,
    PostmanResults
  }
}
</script>

<style scoped></style>
