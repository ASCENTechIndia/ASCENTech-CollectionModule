const encoder = new TextEncoder()

const toBase64 = (bytes) => {
  let binary = ''
  const chunkSize = 0x8000

  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize)
    binary += String.fromCharCode(...chunk)
  }

  return btoa(binary)
}

const getCrypto = () => {
  const webCrypto = globalThis.crypto
  if (!webCrypto?.subtle) {
    throw new Error('Secure crypto is not available in this browser')
  }
  return webCrypto
}

const getSecretKeyBytes = () => {
  const secret = import.meta.env.VITE_LOGIN_ENCRYPTION_KEY
  if (!secret || typeof secret !== 'string') {
    throw new Error('Missing VITE_LOGIN_ENCRYPTION_KEY for login password encryption')
  }
  return encoder.encode(secret)
}

const buildAesKey = async () => {
  const webCrypto = getCrypto()
  const secretHash = await webCrypto.subtle.digest('SHA-256', getSecretKeyBytes())

  return webCrypto.subtle.importKey(
    'raw',
    secretHash,
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  )
}

export const encryptPassword = async (plainPassword) => {
  if (typeof plainPassword !== 'string' || !plainPassword) {
    return ''
  }

  const webCrypto = getCrypto()
  const key = await buildAesKey()
  const iv = webCrypto.getRandomValues(new Uint8Array(12))
  const passwordBytes = encoder.encode(plainPassword)

  const encryptedBuffer = await webCrypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    passwordBytes
  )

  const encryptedBytes = new Uint8Array(encryptedBuffer)
  return `${toBase64(iv)}:${toBase64(encryptedBytes)}`
}
