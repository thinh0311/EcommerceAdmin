import axiosClient from "./apiConfig";

const accountApi = {
  getAcccount: (sdt, password) => {
    const url = `/NhanVien/GetNhanVienByLogin/${sdt}/${password}`;
    return axiosClient.get(url);
  },
  getUser: (id) => {
    const url = `/NhanVien/${id}`;
    return axiosClient.get(url);
  },
  getAllCustomers: () => {
    const url = `/User`;
    return axiosClient.get(url);
  },
  revenueStatics: (data) => {
    const url = `/WeatherForecast/Revenue`;
    return axiosClient.post(url, data);
  },
  revenueTotalSales: () => {
    const url = `/NhanVien/ThongKeSanPham`;
    return axiosClient.get(url);
  },
  revenueCustomers: () => {
    const url = `/NhanVien/ThongKeKhachHang`;
    return axiosClient.get(url);
  },
  revenueOrders: () => {
    const url = `/NhanVien/ThongKeDonHang`;
    return axiosClient.get(url);
  },
  revenueIncome: () => {
    const url = `/NhanVien/ThongKeThuNhap`;
    return axiosClient.get(url);
  },
  revenueTopCustomers: () => {
    const url = `/NhanVien/ThongKeTopKhachHang`;
    return axiosClient.get(url);
  },
  revenueTopOrders: () => {
    const url = `/NhanVien/ThongKeTopDonHang`;
    return axiosClient.get(url);
  },
};
export default accountApi;
