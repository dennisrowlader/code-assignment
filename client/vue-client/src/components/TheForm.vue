<template>
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
</template>

<script>
export default {
  emits: ['message-response'],
  data() {
    return {
      messageResponse: {
        isMock: true,
        responseMessage: '',
        timestamp: '',
        environment: '',
        version: ''
      }
    }
  },
  provide() {
    return {
      response: this.messageResponse
    }
  },
  methods: {
    sendMessage() {
      this.showError = false
      this.showResults = false
      this.isInvalidInput = false
      this.validateInput(this.message)
      console.log('this.isMock => ', this.isMock)
      const apiURL = this.isMock
        ? 'http://localhost:30000/ping?mock=true'
        : 'http://localhost:30000/ping?mock=false'
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
                console.log('data => ', data)
                this.errorMessage = data.message
                this.errors = data.errors
                this.showError = true
              })
            } else {
              response.json().then((data) => {
                console.log('data => ', data)
                console.log('this.message => ', this.message)
                this.messageResponse = JSON.stringify({
                  isMock: data.message ? true : false,
                  responseMessage: data.postmanEcho ? data.postmanEcho : data.message,
                  timestamp: data.timestamp,
                  environment: data.env,
                  version: data.version
                });
                this.$emit('message-response', this.messageResponse)
              })
            }
          })
          .catch((err) => {
            console.log('err => ', err)
            return this.messageResponse = JSON.stringify({
              error: err.message
            });
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
