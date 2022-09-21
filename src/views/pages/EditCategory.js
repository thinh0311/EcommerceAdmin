import React from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import productApi from "../../api/productApi";
import categoryApi from "../../api/categoryApi";

const EditCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = React.useState({ category: {}, DataisLoaded: false });
  const [nameCategory, setNameCategory] = React.useState("");
  const [imageCategory, setImageCategory] = React.useState("");
  const [detailCategory, setDetailCategory] = React.useState("");

  React.useEffect(() => {
    const getAllCategory = async () => {
      try {
        const result = await categoryApi.getById(categoryId);
        setItem({ category: result, DataisLoaded: true });
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategory();
  }, []);

  const updateCategory = async () => {
    try {
      const update = await categoryApi.updateCategory(
        item.category.maLoaiNuoc,
        {
          tenLoaiNuoc: nameCategory,
          hinhAnh: imageCategory,
          moTa: detailCategory,
        }
      );
      toast.success("Sửa thành công");
      navigate("/categories");
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
      setImageCategory(resJson.data);
      console.log(imageCategory);
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
                  defaultValue={item.category.tenLoaiNuoc}
                  onChange={(event) => setNameCategory(event.target.value)}
                  helperText="Vui lòng nhập tên danh mục"
                />
              </div>

              <div>
                <TextField
                  id="outlined-required"
                  label="Mô tả sản phẩm"
                  defaultValue={item.category.moTa}
                  onChange={(event) => setDetailCategory(event.target.value)}
                  helperText="Vui lòng nhập mô tả danh mục"
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
              onClick={updateCategory}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
