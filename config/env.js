function isWeakJwtSecret(secret) {
    return (
        !secret ||
        secret === 'change_this_jwt_secret' ||
        secret === 'dev_jwt_secret_change_me' || 
        secret.length < 25
    );
}

export function getJwtSecret() {
    const secret = "shbccvpwe9ruew4pwecd-sdic"

    if (isWeakJwtSecret(secret)) {
        throw new Error(
            'JWT_SECRET is missing or too weak.'
        );
    }
    return secret;
}

export function validateRuntimeEnv() {
    getJwtSecret();
}