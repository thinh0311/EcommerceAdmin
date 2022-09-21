import { Button, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import categoryApi from "../../api/categoryApi";
import productApi from "../../api/productApi";
import { ToastContainer } from "react-toastify";

const AddProduct = () => {
  const navigate = useNavigate();
  const [items, setItem] = React.useState({
    listCategory: [],
    DataisLoaded: false,
  });
  const [idCategory, setIdCategory] = React.useState("");
  const [nameProduct, setNameProduct] = React.useState("");
  const [priceProduct, setPriceProduct] = React.useState("");
  const [imageProduct, setImageProduct] = React.useState("");
  const [detailProduct, setDetailIdProduct] = React.useState("");

  React.useEffect(() => {
    const getAllCategory = async () => {
      try {
        const result = await categoryApi.getAll();
        setItem({ listCategory: result, DataisLoaded: true });
        setIdCategory(result[0].maLoaiNuoc);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategory();
  }, []);

  const addProduct = async () => {
    try {
      const add = await productApi.addProduct({
        maLoaiNuoc: idCategory,
        tenSanPham: nameProduct,
        donGia: priceProduct,
        hinhAnh: imageProduct,
        moTa: detailProduct,
      });
      console.log(add);
      toast.success("Thêm thành công");
      navigate("/products");
    } catch (error) {
      toast.error("Thêm thất bại");
      console.log("Lỗi thêm: ", error);
    }
  };

  const processFiles = async () => {
    let newFile = document.querySelector('input[type="file"]').files[0];
    var formData = new FormData();
    formData.append("file", newFile);
    try {
      let res = await fetch("http://drinkstore0311.somee.com/api/Cloudinary", {
        method: "post",
        body: formData,
        //headers: { "Content-Type": "multipart/form-data" },
      });
      let resJson = await res.json();
      console.log(resJson.data);
      setImageProduct(resJson.data);
      console.log(imageProduct);
    } catch (error) {
      console.log("Lỗi: ", error);
    }
  };

  if (!items.DataisLoaded)
    return (
      <div>
        <h1> Pleses wait some time.... </h1>{" "}
      </div>
    );
  return (
    <div>
      <ToastContainer />
      <h2 className="page-header">Thêm sản phẩm</h2>
      <div>
        <div>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "50ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <div>
                <TextField
                  select
                  label="Loại sản phẩm"
                  value={idCategory}
                  onChange={(event) => setIdCategory(event.target.value)}
                  helperText="Vui lòng chọn loại sản phẩm"
                >
                  {items.listCategory.map((option) => (
                    <MenuItem key={option.maLoaiNuoc} value={option.maLoaiNuoc}>
                      {option.tenLoaiNuoc}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  id="outlined-required"
                  label="Tên sản phẩm"
                  placeholder="Tên sản phẩm"
                  onChange={(event) => setNameProduct(event.target.value)}
                  helperText="Vui lòng nhập tên sản phẩm"
                />
              </div>

              <div>
                <TextField
                  required
                  id="outlined-required"
                  label="Đơn giá"
                  type="number"
                  defaultValue="0"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => setPriceProduct(event.target.value)}
                  helperText="Vui lòng nhập giá sản phẩm"
                />
                <input
                  style={{ margin: 10 }}
                  type="file"
                  onChange={(event) => processFiles(event)}
                />
              </div>
              <div>
                <TextField
                  id="outlined-required"
                  label="Mô tả sản phẩm"
                  placeholder="Mô tả sản phẩm"
                  onChange={(event) => setDetailIdProduct(event.target.value)}
                  helperText="Vui lòng nhập mô tả sản phẩm"
                />
              </div>
            </div>
          </Box>
          <div>
            <Button
              variant="contained"
              style={{ width: 50, margin: 10 }}
              onClick={addProduct}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
