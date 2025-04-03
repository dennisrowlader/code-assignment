<template>
  <main>
    <h1>Welcome</h1>
    <h2>Press the button below:</h2>
    <form @submit.prevent="sendMessage">
      <input type="text" name="message" id="message" v-model="message" />
      <button type="submit">Send message</button>
      <span v-if="isInvalidInput">{{ invalidInputMsg }}</span>
    </form>
    <br />
    <hr />
    <br />
    <div v-if="showResults">
      <h3>Results:</h3>
      <p>Message: {{ message }}</p>
      <p>Timestamp: {{ timestamp }}</p>
      <p>Environment: {{ environment }}</p>
      <p>Version: {{ version }}</p>
    </div>
    <div v-if="showError">
      <h3>Error:</h3>
      <p>{{ error }}</p>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      timestamp: '',
      environment: '',
      version: '',
      error: '',
      showResults: false,
      showError: false,
      isInvalidInput: false,
      invalidInputMsg: '',
    }
  },
  methods: {
    sendMessage() {
      this.showError = false
      this.showResults = false
      this.isInvalidInput = false
      this.validateInput(this.message)
      if (!this.isInvalidInput) {
        const response = fetch('http://localhost:30000/ping', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: this.message,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              response.json().then((data) => {
                this.error = data.error
                this.showError = true
              })
            } else {
              response.json().then((data) => {
                this.message = data.message
                this.timestamp = data.timestamp
                ;(this.environment = data.env), (this.version = data.version)
                this.showResults = true
              })
            }
          })
          .catch((err) => {
            console.log('err => ', err)
            this.error = err.message
            this.showError = true
          })
      }
    },
    validateInput(inputString) {
      if (inputString.length > 19 || inputString !== inputString.toLowerCase()) {
        this.invalidInputMsg =
          'The message must be less than 20 characters and only include lowercase.'
        this.isInvalidInput = true
      }
    },
  },
}
</script>

<style scoped></style>
