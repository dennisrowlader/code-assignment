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
    <h3>Results:</h3>
    <p>Message: {{ message }}</p>
    <p>Timestamp: {{ timestamp }}</p>
    <p>Environment: {{ environment }}</p>
    <p>Version: {{ version }}</p>
  </main>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      timestamp: '',
      environment: '',
      version: ''
    };
  },
  methods: {
    sendMessage() {
      const enteredMessage = this.$refs.messageInput.value;

      const response = fetch('http://localhost:30000/ping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: enteredMessage
        })
      }).then((response) => {
        response.json().then((data) => {
          console.log('data => ', data);
          this.message = data.message;
          this.timestamp = data.timestamp;
          this.environment = data.env,
          this.version = data.version
        });
      });
    }
  }
}
</script>

<style scoped></style>
