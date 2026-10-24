
import axiosClient from "./axiosClient";

const postApi = {
  // GET danh sách, hỗ trợ phân trang và lọc tác giả.
  getAll(params = {}, signal) {
    return axiosClient.get("/posts", {
      params,
      signal,
    });
  },

  // GET một bài viết.
  getById(id, signal) {
    return axiosClient.get(`/posts/${id}`, {
      signal,
    });
  },

  // GET bình luận của bài viết.
  getComments(id, signal) {
    return axiosClient.get(`/posts/${id}/comments`, {
      signal,
    });
  },

  // POST tạo bài viết.
  create(data) {
    return axiosClient.post("/posts", data);
  },

  // PUT cập nhật toàn bộ bài viết.
  update(id, data) {
    return axiosClient.put(`/posts/${id}`, data);
  },

  // PATCH cập nhật một phần bài viết.
  patch(id, data) {
    return axiosClient.patch(`/posts/${id}`, data);
  },

  // DELETE bài viết.
  remove(id) {
    return axiosClient.delete(`/posts/${id}`);
  },
};

export const userApi = {
  getAll(signal) {
    return axiosClient.get("/users", {
      signal,
    });
  },

  getById(id, signal) {
    return axiosClient.get(`/users/${id}`, {
      signal,
    });
  },
};

export default postApi;
