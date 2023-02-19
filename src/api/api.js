import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    header: {},
    withCredentials: true
});

export const userAPI = {
    createUser(user) {
        return instance.post(`/users`, {...user});
    },
    getUser(userId) {
        return instance.get(`/users/${userId}`);
    },
    updateUser(userId, newProfile) {
        return instance.put(`/users/${userId}`, {...newProfile});
    },
    deleteUser(userId) {
        return instance.delete(`/users/${userId}`);
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
    createPost(post) {
        return instance.post(`/posts`, {
            designerId: post.designerId,
            designId: post.designId,
            description: post.description
        });
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
    likePost(data) {
        console.log(data)
        return instance.post(`/posts/${data.postId}/like`, {userId: data.userId});
    },
    dislikePost(data) {
        return instance.post(`/posts/${data.postId}/dislike`, {userId: data.userId});
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