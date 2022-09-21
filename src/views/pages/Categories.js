import React from "react";
import categoryApi from "../../api/categoryApi";
import productApi from "../../api/productApi";
import Table from "../../components/table/Table";
//import customerList from "../../assets/JsonData/customers-list.json";
import { Button } from "@mui/material";
import { Delete, Add, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Categories = () => {
  const navigate = useNavigate();
  const [items, setItem] = React.useState({
    listCategories: [],
    DataisLoaded: false,
  });

  React.useEffect(() => {
    const getAll = async () => {
      try {
        const result = await categoryApi.getAll();
        setItem({ listCategories: result, DataisLoaded: true });
      } catch (err) {
        console.log(err);
      }
    };
    getAll();
  }, []);

  const deleteCategory = async (id) => {
    try {
      const result = await productApi.getProductsByCategory(id);
      console.log(result);
      if (result.length === 0) {
        const deleteCategory = await categoryApi.deleteCategory(id);
        toast.success("Xóa thành công");
      } else {
        toast.warning("Không thể xóa vì đã có sản phẩm");
      }
    } catch (error) {
      toast.error("Xóa thất bại");
      console.log(error);
    }
  };

  const customerTableHead = ["id", "Tên danh mục", "Mô tả", "Hình ảnh"];

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>
        {`${item.maLoaiNuoc.substring(0, 4)}...`}
        {item.maLoaiNuoc.substring(28, 32)}
      </td>
      <td>{item.tenLoaiNuoc}</td>
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
                navigate(`/categories/edit-category/${item.maLoaiNuoc}`)
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
              onClick={() => deleteCategory(item.maLoaiNuoc)}
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
      <h2 className="page-header">Danh mục</h2>
      <div className="button__card">
        <div className="button">
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/categories/add-category")}
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
                bodyData={items.listCategories}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
