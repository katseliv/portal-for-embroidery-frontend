export const requiredField = (value) => {
    if (value) return undefined;
    return "Field is required!";
}

export const mustContainLetter = (value) => {
    const regex = new RegExp(".*([A-Z]|[a-z]|[А-Я]|[а-я]).*");
    if (regex.test(value)) return undefined;
    return "Field must contain a letter!";
}

export const mustNotContainLetter = (value) => {
    const regex = new RegExp("^([0-9])+$");
    if (regex.test(value)) return undefined;
    return "Field mustn't contain a letter!";
}

export const mustNotContainNumber = (value) => {
    const regex = new RegExp("^([A-Z]|[a-z]|[А-Я]|[а-я])+$");
    if (regex.test(value)) return undefined;
    return "Field mustn't contain a number!";
}

export const mustNotBeOutOfRange = (value) => {
    const length = value.length;
    if (length >= 7 && length <= 11) return undefined;
    return "Field mustn't be out of range!";
}

export const numberMustBePositive = (value) => {
    if (value >= 0) return undefined;
    return "Field must be a positive number!";
}

export const mustBeEmail = (value) => {
    const regex = new RegExp("^[\\w-\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    if (regex.test(value)) return undefined;
    return "Field must be an email!";
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols!`;
    return undefined;
}