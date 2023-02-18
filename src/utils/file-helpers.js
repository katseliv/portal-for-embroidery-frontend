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