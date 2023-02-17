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
        return instance.put(`/users`, formData, {
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

export const postAPI = {
    createPost(designerId, designId, description) {
        return instance.post(`/posts`, {designerId: designerId, designId: designId, description: description});
    },
    getPost(postId) {
        return instance.get(`/posts/${postId}`);
    },
    updatePost(postId, description) {
        return instance.put(`/posts/${postId}`, {description: description});
    },
    deletePost(postId) {
        return instance.delete(`/posts/${postId}`);
    },
    getCountLikes(postId) {
        return instance.get(`/posts/${postId}/likes`);
    },
    likePost(postId, text) {
        return instance.post(`/posts/${postId}`, {text: text});
    },
    dislikePost(postId) {
        return instance.delete(`/posts/${postId}`);
    },
    getPosts() {
        return instance.get(`/posts`);
    },
    getPostsByNumberAndSize(pageNumber, pageSize) {
        return instance.get(`/posts?page=${pageNumber}&size=${pageSize}`);
    },
}

export const commentAPI = {
    createComment(postId, userId, text) {
        return instance.post(`/comments`, {postId: postId, userId: userId, text: text});
    },
    getComment(commentId) {
        return instance.get(`/comments/${commentId}`);
    },
    updateComment(commentId, text) {
        return instance.put(`/comments/${commentId}`, {text: text});
    },
    deleteComment(commentId) {
        return instance.delete(`/comments/${commentId}`);
    },
    getComments() {
        return instance.get(`/comments`);
    },
    getCommentsOfPost(postId) {
        return instance.get(`/posts/${postId}/comments`);
    },
    getCommentsByNumberAndSize(pageNumber, pageSize) {
        return instance.get(`/comments?page=${pageNumber}&size=${pageSize}`);
    },
    getCommentsOfPostByNumberAndSize(postId, pageNumber, pageSize) {
        return instance.get(`/posts/${postId}/comments?page=${pageNumber}&size=${pageSize}`);
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