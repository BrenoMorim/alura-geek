import sha256 from 'crypto-js/sha256.js';
import hmacSHA512 from 'crypto-js/hmac-sha512.js';
import Base64 from 'crypto-js/enc-base64.js';

// Usuários padrão: admin@admin.com - admin123, teste@usuario.com - 1234567

export function gerarHash(dados) {
    const hashDigest = sha256(dados);
    const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, String(process.env.PRIVATE_KEY)));
    return hmacDigest;
}

console.log(gerarHash('admin123'));