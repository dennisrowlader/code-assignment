<template>
  <div>
      <h3>Postman Echo Results:</h3>
      <p>Message: {{ message }}</p>
      <p>Timestamp: {{ timestamp }}</p>
      <p>Environment: {{ environment }}</p>
      <p>Version: {{ version }}</p>
    </div>
    <div v-if="showError">
      <h3>Error:</h3>
      <p>{{ errorMessage }}</p>
      <p>{{ errors }}</p>
    </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     message: '',
  //     timestamp: '',
  //     environment: '',
  //     version: '',
  //     errorMessage: '',
  //     errors: '',
  //     showError: false,
  //   }
  // },
  props: ['message', 'timestamp', 'environment', 'version', 'errorMessage', 'errors', 'showError'],
}
</script>
