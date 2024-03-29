import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    header: {},
    withCredentials: true
});

export const userAPI = {
    registerUser(user) {
        return instance.post(`/users/register`, {...user});
    },
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
    getUsers() {
        return instance.get(`/users`);
    },
    getUsersByNumberAndSize(pageNumber, pageSize) {
        return instance.get(`/users?page=${pageNumber}&size=${pageSize}`);
    },
}

export const designerProfileAPI = {
    createDesignerProfile(designerProfile) {
        return instance.post(`/designer-profiles`, {...designerProfile});
    },
    getDesignerProfile(designerProfileId) {
        return instance.get(`/designer-profiles/${designerProfileId}`);
    },
    updateDesignerProfile(designerProfileId, newProfile) {
        return instance.put(`/designer-profiles/${designerProfileId}`, {...newProfile});
    },
}

export const folderAPI = {
    createFolder(folder) {
        return instance.post(`/folders`, {...folder});
    },
    getFolder(folderId) {
        return instance.get(`/folders/${folderId}`);
    },
    updateFolder(folderId, folderName) {
        return instance.put(`/folders/${folderId}`, {name: folderName});
    },
    deleteFolder(folderId) {
        return instance.delete(`/folders/${folderId}`);
    },
    getFolders() {
        return instance.get(`/folders`);
    },
    getFoldersByNumberAndSize(pageNumber, pageSize) {
        return instance.get(`/folders?page=${pageNumber}&size=${pageSize}`);
    },
    getFoldersOfUserByNumberAndSize(userId, pageNumber, pageSize) {
        return instance.get(`/users/${userId}/folders?page=${pageNumber}&size=${pageSize}`);
    },
    getFoldersOfParentFolderByNumberAndSize(folderId, pageNumber, pageSize) {
        return instance.get(`/folders/${folderId}/folders?page=${pageNumber}&size=${pageSize}`);
    },
}

export const fileAPI = {
    createFile(file) {
        return instance.post(`/files`, {...file});
    },
    getFile(fileId) {
        return instance.get(`/files/${fileId}`);
    },
    updateFile(fileId, fileName) {
        return instance.put(`/files/${fileId}`, {name: fileName});
    },
    deleteFile(fileId) {
        return instance.delete(`/files/${fileId}`);
    },
    getFiles() {
        return instance.get(`/files`);
    },
    getFilesByNumberAndSize(pageNumber, pageSize) {
        return instance.get(`/files?page=${pageNumber}&size=${pageSize}`);
    },
    getFilesOfDesignByNumberAndSize(designId, pageNumber, pageSize) {
        return instance.get(`/designs/${designId}/files?page=${pageNumber}&size=${pageSize}`);
    },
}

export const designAPI = {
    createDesign(design) {
        return instance.post(`/designs`, {...design});
    },
    getDesign(designId) {
        return instance.get(`/designs/${designId}`);
    },
    updateDesign(designId, designName) {
        return instance.put(`/designs/${designId}`, {name: designName});
    },
    deleteDesign(designId) {
        return instance.delete(`/designs/${designId}`);
    },
    getDesigns() {
        return instance.get(`/designs`);
    },
    getDesignsByNumberAndSize(pageNumber, pageSize) {
        return instance.get(`/designs?page=${pageNumber}&size=${pageSize}`);
    },
    getDesignsOfFolderByNumberAndSize(folderId, pageNumber, pageSize) {
        return instance.get(`/folders/${folderId}/designs?page=${pageNumber}&size=${pageSize}`);
    },
}

export const postAPI = {
    createPost(post) {
        return instance.post(`/posts`, {...post});
    },
    getPost(postId) {
        return instance.get(`/posts/${postId}`);
    },
    updatePost(postId, description) {
        return instance.put(`/posts/${postId}`, {description: description});
    },
    updatePostByTags(postId, tags) {
        return instance.put(`/posts/${postId}/tags`, tags);
    },
    deletePost(postId) {
        return instance.delete(`/posts/${postId}`);
    },
    likePost(data) {
        return instance.post(`/posts/${data.postId}/like`, {userId: data.userId});
    },
    dislikePost(data) {
        return instance.post(`/posts/${data.postId}/dislike`, {userId: data.userId});
    },
    getPosts() {
        return instance.get(`/posts`);
    },
    getPostsByUser(userId) {
        return instance.get(`/users/${userId}/posts`);
    },
    getPostsByDesigner(designerId) {
        return instance.get(`/designer-profiles/${designerId}/posts`);
    },
    getPostsByTag(tagName) {
        return instance.get(`/posts?tagName=${tagName}`);
    },
    getPostsByNumberAndSize(pageNumber, pageSize) {
        return instance.get(`/posts?page=${pageNumber}&size=${pageSize}`);
    },
    getPostsByUserAndNumberAndSize(userId, pageNumber, pageSize) {
        return instance.get(`/users/${userId}/posts?page=${pageNumber}&size=${pageSize}`);
    },
    getPostsByDesignerAndNumberAndSize(designerId, pageNumber, pageSize) {
        return instance.get(`/designer-profiles/${designerId}/posts?page=${pageNumber}&size=${pageSize}`);
    },
    getDesigners() {
        return instance.get(`/users/designers`);
    },
    getDesigns() {
        return instance.get(`/designs`);
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
    getNewAccessToken(refreshToken) {
        return instance.post(`/newAccessToken`, {refreshToken});
    },
    logout() {
        return instance.post(`/logout`);
    },
}