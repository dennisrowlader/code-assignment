<template>
  <mock-results
    v-if="response.isMock"
    :message="response.responseMessage"
    :timestamp="response.timestamp"
    :environment="response.environment"
    :version="response.version"
  ></mock-results>
  <postman-results
    v-else-if="!response.isMock && response.responseMessage"
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
}
</script>
