<template>
  <main>
    <h1>Welcome</h1>
    <h2>Press the button below:</h2>
    <form @submit.prevent="sendMessage">
      <input type="text" name="message" id="message" value="Hardcoded message" ref="messageInput" />
      <button type="submit">Send message</button>
    </form>
    <br>
    <hr>
    <br>
    <div v-if="message !== ''">
    <h3>Results:</h3>
    <p>Message: {{ message }}</p>
    <p>Timestamp: {{ timestamp }}</p>
    <p>Environment: {{ environment }}</p>
    <p>Version: {{ version }}</p></div>
    <div v-if="error !== ''">
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
      error: ''
    };
  },
  methods: {
    sendMessage() {
      const enteredMessage = this.$refs.messageInput.value;

      this.clearOutput();

      const response = fetch('http://localhost:30000/ping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: enteredMessage
        })
      }).then((response) => {
        if (!response.ok) {
          response.json().then((data) => {
            this.error = data.error;
          });
        } else {
        response.json().then((data) => {
          console.log('data => ', data);
          this.message = data.message;
          this.timestamp = data.timestamp;
          this.environment = data.env,
          this.version = data.version
        });
      }
      }).catch((err) => {
        console.log('err => ', err);
        this.error = err.message;
      });
    },
    clearOutput() {
      this.message = '';
      this.timestamp = '';
      this.environment = '';
      this.version = '';
      this.error = '';
    }
  }
}
</script>

<style scoped></style>
