import React from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import productApi from "../../api/productApi";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = React.useState({ product: {}, DataisLoaded: false });
  const [nameProduct, setNameProduct] = React.useState("");
  const [priceProduct, setPriceProduct] = React.useState("");
  const [imageProduct, setImageProduct] = React.useState("");
  const [detailProduct, setDetailIdProduct] = React.useState("");

  React.useEffect(() => {
    const getAllCategory = async () => {
      try {
        const result = await productApi.getProductsById(productId);
        setItem({ product: result, DataisLoaded: true });
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategory();
  }, []);

  const updateProduct = async () => {
    try {
      const update = await productApi.updateProduct(item.product.maSanPham, {
        tenSanPham: nameProduct,
        donGia: priceProduct,
        hinhAnh: imageProduct,
        moTa: detailProduct,
      });
      toast.success("Sửa thành công");
      navigate("/products");
    } catch (error) {
      toast.error("Sửa thất bại");
      console.log("Lỗi sửa: ", error);
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
  if (!item.DataisLoaded)
    return (
      <div>
        <h1> Pleses wait some time.... </h1>{" "}
      </div>
    );

  return (
    <div>
      <ToastContainer />
      <h2 className="page-header">Chỉnh sửa sản phẩm</h2>
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
                  required
                  id="outlined-required"
                  label="Tên sản phẩm"
                  defaultValue={item.product.tenSanPham}
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
                  defaultValue={item.product.donGia}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => setPriceProduct(event.target.value)}
                  helperText="Vui lòng nhập giá sản phẩm"
                />
              </div>
              <div>
                <TextField
                  id="outlined-required"
                  label="Mô tả sản phẩm"
                  defaultValue={item.product.moTa}
                  onChange={(event) => setDetailIdProduct(event.target.value)}
                  helperText="Vui lòng nhập mô tả sản phẩm"
                />
              </div>
              <input
                style={{ margin: 10 }}
                type="file"
                onChange={(event) => processFiles(event)}
              />
            </div>
          </Box>
          <div>
            <Button
              variant="contained"
              style={{ width: 50, margin: 10 }}
              onClick={updateProduct}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
