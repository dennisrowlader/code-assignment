<template>
  <main>
    <h1>Welcome</h1>
    <h2>Press the button below:</h2>
    <form @submit.prevent="sendMessage">
      <label for="message">Message: </label>
      <input type="text" name="message" id="message" v-model="message" />
      <br />
      <label for="mock">Mock the response: </label>
      <input type="checkbox" name="mock" id="mock" v-model="isMock" checked />
      <br />
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
      <p>{{ errorMessage }}</p>
      <p>{{ errors }}</p>
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
      errors: '',
      errorMessage: '',
      showResults: false,
      showError: false,
      isInvalidInput: false,
      invalidInputMsg: '',
      isMock: true,
    }
  },
  methods: {
    sendMessage() {
      this.showError = false
      this.showResults = false
      this.isInvalidInput = false
      this.validateInput(this.message)
      console.log('this.isMock => ', this.isMock);
      const apiURL = this.isMock ? 'http://localhost:30000/ping?mock=true' : 'http://localhost:30000/ping?mock=false';
      if (!this.isInvalidInput) {
        const response = fetch(apiURL, {
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
                console.log('data => ', data);
                this.errorMessage = data.message;
                this.errors = data.errors
                this.showError = true
              })
            } else {
              response.json().then((data) => {
                console.log('data => ', data);
                this.message = data.postmanEcho ? data.postmanEcho : data.message
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
