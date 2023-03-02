import {authAPI} from "../api/api";

export async function requestWithAuth(url, options) {
    const loginUrl = '/sign-in';
    let tokenData = null;

    if (localStorage.getItem("tokenData")) {
        tokenData = localStorage.getItem("tokenData");
    } else {
        return window.location.replace(loginUrl);
    }

    if (!options.headers) {
        options.headers = {};
    }

    if (tokenData) {
        if (Date.now() >= tokenData.expiresAt * 1000) {
            try {
                const tokens = await authAPI.getNewAccessToken(tokenData.refreshToken);
                localStorage.removeItem("tokenData");
                localStorage.setItem("tokenData", tokens);
            } catch (error) {
                return window.location.replace(loginUrl);
            }
        }
        options.headers.Authorization = `Bearer ${tokenData.accessToken}`;
    }

    return fetch(url, options);
}