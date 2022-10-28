import { buscarUsuarioPorEmail } from '../http';
import IUsuario from '../types/IUsuario';
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

// Usuários padrão: admin@admin.com - admin123, teste@usuario.com - 1234567

export function gerarHash(dados: string) {
    const hashDigest = sha256(dados);
    const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, String(process.env.VUE_APP_PRIVATE_KEY)));
    return hmacDigest;
}

export async function autenticarUsuario(dadosUsuario: IUsuario) {
    try {
        const usuario = await buscarUsuarioPorEmail(dadosUsuario.email);
        const hashSenhaRecebida = gerarHash(dadosUsuario.senha);
        return hashSenhaRecebida === usuario.senha;
    } catch (erro) {
        return false;
    }
}
