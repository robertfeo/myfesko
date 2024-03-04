// Importă modulul 'jsonwebtoken' și tipul de date 'JwtPayload' specific acestui modul.
// 'jsonwebtoken' este o bibliotecă care permite crearea și verificarea token-urilor JWT.
import jwt, { JwtPayload } from "jsonwebtoken";

// Definește o structură (interfață) numită 'SignOption', care este folosită pentru a specifica opțiunile
// de semnare a unui token JWT. Această structură conține o singură proprietate 'expiresIn',
// care indică durata de valabilitate a token-ului.
interface SignOption {
    expiresIn: string | number; // Poate fi un șir de caractere (de exemplu, '2 days', '10h') sau un număr (reprezentând secunde).
}

// Crează o constantă 'DEFAULT_SIGN_OPTIONS' care implementează interfața 'SignOption'.
// Această constantă este folosită pentru a defini opțiunile implicite de semnare a token-ului JWT,
// în cazul în care utilizatorul nu specifică alte opțiuni.
const DEFAULT_SIGN_OPTIONS: SignOption = {
    expiresIn: "1d", // Implicit, token-ul va expira în 1 zi.
};

// Exportă o funcție numită 'signJWT', destinată creării unui token JWT.
// Funcția primește două argumente: 'payload', care este conținutul (informațiile) token-ului,
// și 'option', care sunt opțiunile de semnare (cu valori implicite setate la 'DEFAULT_SIGN_OPTIONS').
export function signJWT(payload: JwtPayload, option: SignOption = DEFAULT_SIGN_OPTIONS) {
    const secretKey = process.env.JWT_USER_ID_SECRET! // Obține cheia secretă de mediu, necesară semnării token-ului.
    const token = jwt.sign(payload, secretKey) // Semnează token-ul folosind payload-ul și cheia secretă.
    return token // Returnează token-ul semnat.
}

// Exportă o funcție numită 'verifyJWT', destinată verificării și decodării unui token JWT.
// Funcția primește un argument: 'token', care este token-ul JWT sub formă de șir de caractere.
export function verifyJWT(token: string) {
    try {
        const secretKey = process.env.JWT_USER_ID_SECRET! // Similar, obține cheia secretă de mediu.
        const decoded = jwt.verify(token, secretKey) as JwtPayload // Încearcă să verifice și să decodeze token-ul folosind cheia secretă.
        return decoded as JwtPayload // Dacă verificarea reușește, returnează payload-ul decodat.
    } catch (error) {
        console.log("error", error) // În cazul unei erori (de exemplu, token invalid sau expirat), afișează eroarea în consolă.
        return null // Returnează 'null' pentru a indica că verificarea a eșuat.
    }
}
