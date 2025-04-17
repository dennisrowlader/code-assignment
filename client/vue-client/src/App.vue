<template>
  <main>
    <the-form @message-response="processResponse"></the-form>
    <br />
    <hr />
    <br />
    <the-results :response="messageResponse"></the-results>
  </main>
</template>

<script>
import TheForm from './components/TheForm.vue'
import TheResults from './components/TheResults.vue'

export default {
  components: {
    TheForm,
    TheResults,
  },
  data() {
    return {
      messageResponse: {
        isMock: true,
        responseMessage: '',
        timestamp: '',
        environment: '',
        version: '',
      },
    }
  },
  methods: {
    processResponse(data) {
      const d = JSON.parse(data);
      this.messageResponse = {
        isMock: d.isMock,
        responseMessage: d.responseMessage,
        timestamp: d.timestamp,
        environment: d.environment,
        version: d.version,
      }
    },
  },
}
</script>

<style scoped></style>
