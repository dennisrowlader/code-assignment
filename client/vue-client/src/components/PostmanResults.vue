<template>
  <div v-if="showResults">
      <h3>Results:</h3>
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
  data() {
    return {
      message: '',
      timestamp: '',
      environment: '',
      version: '',
      errorMessage: '',
      errors: '',
      showError: false,
    }
  },
}
</script>
