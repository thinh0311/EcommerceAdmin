import axiosClient from "./apiConfig";

const categoryApi = {
  getAll: () => {
    const url = "/LoaiNuoc";
    return axiosClient.get(url);
  },
  getById: (id) => {
    const url = `/LoaiNuoc/${id}`;
    return axiosClient.get(url);
  },

  addCategory: (data) => {
    const url = `/LoaiNuoc`;
    return axiosClient.post(url, data);
  },
  addCloudinary: () => {
    const url = `/Cloudinary`;
    return axiosClient.get(url);
  },
  updateCategory: (idProduct, data) => {
    const url = `/LoaiNuoc/${idProduct}`;
    return axiosClient.put(url, data);
  },
  deleteCategory: (idProduct) => {
    const url = `/LoaiNuoc/${idProduct}`;
    return axiosClient.delete(url);
  },
};

export default categoryApi;
