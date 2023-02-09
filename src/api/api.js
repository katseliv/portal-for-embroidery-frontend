import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    header: {},
    withCredentials: true
});

export const userAPI = {
    getUser(userId) {
        return instance.get(`/users/${userId}`);
    },
    saveImage(image) {
        const formData = new FormData();
        formData.append('base64StringImage', image);
        return instance.put(`/users`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    getUsers() {
        return instance.get(`/users`);
    },
    getUsersByNumberAndSize(pageNumber, pageSize) {
        return instance.get(`/users?page=${pageNumber}&size=${pageSize}`);
    },
}

export const commentAPI = {
    getComment(commentId) {
        return instance.get(`/comments/${commentId}`);
    },
    updateComment(commentId, text) {
        return instance.put(`/comments/${commentId}`, {text: text});
    },
    getComments() {
        return instance.get(`/comments`);
    },
    getCommentsByNumberAndSize(pageNumber, pageSize) {
        return instance.get(`/comments?page=${pageNumber}&size=${pageSize}`);
    },
}

export const authAPI = {
    login(email, password) {
        return instance.post(`/accessToken`, {email, password});
    },
    logout() {
        return instance.post(`/logout`);
    },
}