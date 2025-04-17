<template>
  <mock-results
    v-if="checkIsMock"
    :message="response.responseMessage"
    :timestamp="response.timestamp"
    :environment="response.environment"
    :version="response.version"
  ></mock-results>
  <postman-results
    v-else-if="!checkIsMock && checkMessageExists"
    :message="response.responseMessage"
    :timestamp="response.timestamp"
    :environment="response.environment"
    :version="response.version"
  ></postman-results>
</template>

<script>
import MockResults from './MockResults.vue'
import PostmanResults from './PostmanResults.vue'

export default {
  components: {
    MockResults,
    PostmanResults,
  },
  props: ['response'],
  computed: {
    checkIsMock() {
      return this.response.isMock
    },
    checkMessageExists() {
      return this.response.responseMessage
    }
  }
}
</script>
