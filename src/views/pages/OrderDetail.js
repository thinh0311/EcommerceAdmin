import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import orderApi from "../../api/orderApi";
import Table from "../../components/table/Table";
import ultils from "../../utils/formatDate";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [items, setItem] = React.useState({
    listProducts: [],
    DataisLoaded: false,
  });

  React.useEffect(() => {
    const getAllProds = async () => {
      try {
        const result = await orderApi.getDetailOrder(orderId);
        setItem({ listProducts: result, DataisLoaded: true });
      } catch (err) {
        console.log(err);
      }
    };
    getAllProds();
  }, []);

  const customerTableHead = [
    "Tên sản phẩm",
    "Đơn giá",
    "Mô tả",
    "Hình ảnh",
    "Số lượng",
  ];

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.sanPham.tenSanPham}</td>
      <td>{ultils.formatCurency(item.donGia, ",")}</td>
      <td>{item.sanPham.moTa}</td>
      <td>
        <img
          src={
            item.sanPham.hinhAnh === "string"
              ? require("../../assets/images/product.png")
              : item.sanPham.hinhAnh
          }
          alt="Ảnh sản phẩm"
          style={{ width: 50, height: 50 }}
        />
      </td>
      <td>{item.soLuong}</td>
    </tr>
  );
  if (!items.DataisLoaded)
    return (
      <div>
        <h1> Pleses wait some time.... </h1>{" "}
      </div>
    );
  return (
    <div>
      <h2 className="page-header">Chi tiết đơn hàng {orderId}</h2>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={customerTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={items.listProducts}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
