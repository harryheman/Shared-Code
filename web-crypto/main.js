// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey
const generateKey = async () =>
  window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256
    },
    true,
    ['encrypt', 'decrypt']
  )

// https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
const encode = (data) => {
  const encoder = new TextEncoder()

  return encoder.encode(data)
}

// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
const generateIv = () =>
  // https://developer.mozilla.org/en-US/docs/Web/API/AesGcmParams
  window.crypto.getRandomValues(new Uint8Array(12))

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt
const encrypt = async (data, key) => {
  const encoded = encode(data)
  const iv = generateIv()
  const cipher = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    encoded
  )

  return {
    cipher,
    iv
  }
}

// https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
const pack = (buffer) =>
  window.btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))

// https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
const unpack = (packed) => {
  const string = window.atob(packed)
  const buffer = new ArrayBuffer(string.length)
  const bufferView = new Uint8Array(buffer)

  for (let i = 0; i < string.length; i++) {
    bufferView[i] = string.charCodeAt(i)
  }

  return buffer
}

// https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder
const decode = (byteStream) => {
  const decoder = new TextDecoder()

  return decoder.decode(byteStream)
}

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt
const decrypt = async (cipher, key, iv) => {
  const encoded = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    cipher
  )

  return decode(encoded)
}

const input = document.querySelector('input')
const output = document.querySelector('output')

let key

const encryptAndSendMsg = async () => {
  const msg = input.value

  // encrypt
  key = await generateKey()
  const { cipher, iv } = await encrypt(msg, key)

  // pack & transmit
  await fetch('https://web-crypto-example.herokuapp.com/secure-api', {
    method: 'POST',
    body: JSON.stringify({
      cipher: pack(cipher),
      iv: pack(iv)
    })
  })

  output.innerHTML = `Message <span>"${msg}"</span> encrypt.<br>Data sent to the server.`
}

const getAndDecryptMsg = async () => {
  const res = await fetch('https://web-crypto-example.herokuapp.com/secure-api')

  const data = await res.json()

  console.log(data)

  // unpack & decrypt
  const msg = await decrypt(unpack(data.cipher), key, unpack(data.iv))

  output.innerHTML = `Data received from the server.<br>Message <span>"${msg}"</span> decrypt.`
}

document.querySelector('.btn-box').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-send')) {
    encryptAndSendMsg()

    e.target.nextElementSibling.removeAttribute('disabled')
  } else if (e.target.classList.contains('btn-get')) {
    getAndDecryptMsg()
  }
})
