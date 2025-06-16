let msg = null

export const eventBusService = {
  getMsg,
  showMsg
}

function showMsg(txt, type = 'success') {
  msg = { txt, type }
  // Message auto-clears after 3 seconds
  setTimeout(() => {
    msg = null
  }, 3000)
}

function getMsg() {
  return msg
}