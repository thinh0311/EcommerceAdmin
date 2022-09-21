import React from "react";
import productApi from "../../api/productApi";
import Table from "../../components/table/Table";
//import customerList from "../../assets/JsonData/customers-list.json";
import { Button } from "@mui/material";
import { Delete, Add, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ultils from "../../utils/formatDate";

const Products = () => {
  const navigate = useNavigate();
  const [items, setItem] = React.useState({
    listProducts: [],
    DataisLoaded: false,
  });

  React.useEffect(() => {
    const getAllProds = async () => {
      try {
        const result = await productApi.getAll();
        setItem({ listProducts: result, DataisLoaded: true });
      } catch (err) {
        console.log(err);
      }
    };
    getAllProds();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const result = await productApi.deleteProduct(id);
      toast.success("Xóa thành công");
    } catch (error) {
      toast.error("Xóa thất bại");
      console.log(error);
    }
  };

  const customerTableHead = [
    "id",
    "Tên sản phẩm",
    "Đơn giá",
    "Mô tả",
    "Hình ảnh",
  ];

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>
        {`${item.maSanPham.substring(0, 4)}...`}
        {item.maSanPham.substring(28, 32)}
      </td>
      <td>{item.tenSanPham}</td>
      <td>{ultils.formatCurency(item.donGia, ",")}</td>
      <td>{item.moTa}</td>
      <td>
        <img
          src={
            item.hinhAnh === "string"
              ? require("../../assets/images/product.png")
              : item.hinhAnh
          }
          alt="Ảnh sản phẩm"
          style={{ width: 50, height: 50 }}
        />
      </td>
      <td>
        <div className="button__card">
          <div className="button">
            <Button
              variant="contained"
              color="info"
              onClick={() =>
                navigate(`/products/edit-product/${item.maSanPham}`)
              }
            >
              <Edit />
              Sửa
            </Button>
          </div>
          <div className="button">
            <Button
              variant="contained"
              color="warning"
              onClick={() => deleteProduct(item.maSanPham)}
            >
              <Delete />
              Xóa
            </Button>
          </div>
        </div>
      </td>
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
      <ToastContainer />
      <h2 className="page-header">Sản phẩm</h2>
      <div className="button__card">
        <div className="button">
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/products/add-product")}
          >
            <Add />
            Thêm
          </Button>
        </div>
      </div>
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

export default Products;
