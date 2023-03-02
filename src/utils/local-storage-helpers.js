export let getIdFromLocalStorage = () => {
    return sessionStorage.getItem("id");
}

export let getTokenDataFromLocalStorage = () => {
    return sessionStorage.getItem("tokenData");
}

export let setIdToLocalStorage = (id) => {
    sessionStorage.setItem("id", id);
}

export let setTokenDataToLocalStorage = (tokenData) => {
    sessionStorage.setItem("tokenData", tokenData);
}

export let setAuthDataToLocalStorage = (authData) => {
    return () => {
        setIdToLocalStorage(authData.id);
        setTokenDataToLocalStorage(authData);
    };
}

export let clearLocalStorage = () => {
    return () => {
        sessionStorage.clear();
    };
}