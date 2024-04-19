export const sendMessage = (data: string, ws?: WebSocket) => {
  const sendData = JSON.stringify(data);

  ws?.send(sendData);
};
