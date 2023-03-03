export let getIdFromLocalStorage = () => {
    return sessionStorage.getItem("id");
}

export let getRoleFromLocalStorage = () => {
    return sessionStorage.getItem("role");
}

export let getTokenDataFromLocalStorage = () => {
    return sessionStorage.getItem("tokenData");
}

export let setIdToLocalStorage = (id) => {
    sessionStorage.setItem("id", id);
}

export let setRoleToLocalStorage = (role) => {
    sessionStorage.setItem("role", role);
}

export let setTokenDataToLocalStorage = (tokenData) => {
    sessionStorage.setItem("tokenData", tokenData);
}

export let setAuthDataToLocalStorage = (authData) => {
    return () => {
        setIdToLocalStorage(authData.id);
        setRoleToLocalStorage(authData.role);
        setTokenDataToLocalStorage(authData);
    };
}

export let clearLocalStorage = () => {
    return () => {
        sessionStorage.clear();
    };
}