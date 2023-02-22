export let getFileName = (fileName) => {
    return fileName.split('.').slice(0, -1).join('.');
}

export let getExtension = (fileName) => {
    return fileName.split('.').reverse()[0];
}

export let mapFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
            if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
            }
            resolve(encoded);
        };
        reader.onerror = error => reject(error);
    });
}

export let base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64);
    const binaryLength = binaryString.length;
    const bytes = new Uint8Array(binaryLength);
    for (let i = 0; i < binaryLength; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
};

export let saveByteArray = (fileName, extension, bytes) => {
    const blob = new Blob([bytes], {type: `application/${extension}`});
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName + "." + extension;
    link.click();
};