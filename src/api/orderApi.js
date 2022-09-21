import axiosClient from "./apiConfig";

const orderApi = {
  getAllOrder: () => {
    const url = `/DonDatHang/GetAllDonHang`;
    return axiosClient.get(url);
  },
  getDetailOrder: (id) => {
    const url = `/CTDDH/${id}`;
    return axiosClient.get(url);
  },
  getUser: (id) => {
    const url = `/NhanVien/${id}`;
    return axiosClient.get(url);
  },
  getAllOrderbyStatus: (id) => {
    const url = `/DonDatHang/GetDonHangByTrangThai/${id}`;
    return axiosClient.get(url);
  },
  approveOrder: (id, maNV) => {
    const url = `/DonDatHang/DuyetDonHang/${id}/${maNV}`;
    return axiosClient.put(url);
  },

  assignOrder: (id, maShipper) => {
    const url = `/DonDatHang/PhanCong/${id}/${maShipper}`;
    return axiosClient.put(url);
  },
  successOrder: (id) => {
    const url = `/DonDatHang/HoanThanh/${id}`;
    return axiosClient.put(url);
  },

  getShipper: () => {
    const url = `/Shipper`;
    return axiosClient.get(url);
  },
};
export default orderApi;
