
import axiosClient from "./axiosClient";

// NC2 - Tang service cho bai viet
const postApi = {
  // GET - danh sach bai viet
  getAll: (params = {}, signal) =>
    axiosClient.get("/posts", { params, signal }),

  // GET - chi tiet bai viet
  getById: (id, signal) =>
    axiosClient.get(`/posts/${id}`, { signal }),

  // GET - binh luan cua bai viet
  getComments: (id, signal) =>
    axiosClient.get(`/posts/${id}/comments`, { signal }),

  // POST - tao bai viet
  create: (data, signal) =>
    axiosClient.post("/posts", data, { signal }),

  // PUT - cap nhat toan bo bai viet
  update: (id, data, signal) =>
    axiosClient.put(`/posts/${id}`, data, { signal }),

  // PATCH - cap nhat mot phan bai viet
  patch: (id, partial, signal) =>
    axiosClient.patch(`/posts/${id}`, partial, { signal }),

  // DELETE - xoa bai viet
  remove: (id, signal) =>
    axiosClient.delete(`/posts/${id}`, { signal }),
};

// Service cho user, dung duoc o cac bai tiep theo
export const userApi = {
  getAll: (signal) =>
    axiosClient.get("/users", { signal }),

  getById: (id, signal) =>
    axiosClient.get(`/users/${id}`, { signal }),
};

export default postApi;
