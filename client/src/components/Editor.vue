<template>
  <div>
    <textarea
      v-model="text"
      @input="handleInput"
      rows="20"
      cols="100"
      placeholder="Start typing..."
    ></textarea>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { io } from "socket.io-client";
import axios from "axios";

const text = ref("");
const socket = io("http://localhost:3001"); // backend URL
const documentId = "68501b0b4126765ca95c7667"; // 👈 paste the ID from PowerShell

// Handle local input
const handleInput = () => {
  console.log("📤 Sending:", text.value);
  socket.emit("send-changes", text.value);
  socket.emit("save-document", text.value);
};

onMounted(async () => {
  try {
    // Load existing document content from backend
    const res = await axios.get(`http://localhost:3001/documents/${documentId}`);
    text.value = res.data.content;

    // Join the document room
    socket.emit("join-document", documentId);

    // Receive changes from other users
    socket.on("receive-changes", (newContent) => {
      if (newContent !== text.value) {
        console.log("📥 Received update:", newContent);
        text.value = newContent;
      }
    });
  } catch (err) {
    console.error("❌ Failed to load document:", err);
  }
});
</script>

<style scoped>
textarea {
  font-family: monospace;
  width: 100%;
  border: 1px solid #ccc;
  padding: 1rem;
  font-size: 1rem;
}
</style>
