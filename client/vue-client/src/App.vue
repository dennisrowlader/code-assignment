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
      this.messageResponse = {
        isMock: data.isMock,
        responseMessage: data.responseMessage,
        timestamp: data.timestamp,
        environment: data.environment,
        version: data.version
      }
    },
  },
}
</script>

<style scoped></style>
