import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    header: {},
    withCredentials: true
});

export const commentAPI = {
    getComments() {
        return instance.get(`/comments`);
    },
    getCommentsByNumberAndSize (pageNumber, pageSize) {
        return instance.get(`/comments?page=${pageNumber}&size=${pageSize}`);
    },
}