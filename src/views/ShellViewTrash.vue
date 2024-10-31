<template>
    <div class="terminal" @contextmenu.prevent>
      <h1>Welcome to TTYD!</h1>
      <div id="terminal"></div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { Terminal } from 'xterm';
  
  const terminalId = 'terminal';
  
  onMounted(() => {
    const term = new Terminal();
    term.open(document.getElementById(terminalId));
    term.write('This is a terminal window. Right-click is disabled.\r\n');
  
    // 启动 WebSocket 连接
    const socket = new WebSocket('ws://localhost:8389'); // 修改为正确的 WebSocket 地址
    socket.onmessage = function(event) {
      term.write(event.data);
    };
  
    term.onData(data => {
      socket.send(data);
    });
  });
  </script>
  
  <style>
  .terminal {
    margin: 20;
    height: 100vh;
    /* display: flex; */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #252525;
  }
  </style>
  