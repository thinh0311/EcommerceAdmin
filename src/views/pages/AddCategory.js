import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import categoryApi from "../../api/categoryApi";
import { ToastContainer } from "react-toastify";

const AddCategory = () => {
  const navigate = useNavigate();

  const [nameCategory, setNameCategory] = React.useState("");
  const [imageCategory, setImageCategory] = React.useState("");
  const [detailCategory, setDetailCategory] = React.useState("");

  const addCategory = async () => {
    try {
      const add = await categoryApi.addCategory({
        tenLoaiNuoc: nameCategory,
        hinhAnh: imageCategory,
        moTa: detailCategory,
      });
      console.log(add);
      toast.success("Thêm thành công");
      navigate("/categories");
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
      setImageCategory(resJson.data);
      console.log(imageCategory);
    } catch (error) {
      console.log("Lỗi: ", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2 className="page-header">Thêm danh mục</h2>
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
                  label="Tên danh mục"
                  placeholder="Tên danh mục"
                  onChange={(event) => setNameCategory(event.target.value)}
                  helperText="Vui lòng nhập tên danh mục"
                />
              </div>

              <div>
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
                  onChange={(event) => setDetailCategory(event.target.value)}
                  helperText="Vui lòng nhập mô tả sản phẩm"
                />
              </div>
            </div>
          </Box>
          <div>
            <Button
              variant="contained"
              style={{ width: 50, margin: 10 }}
              onClick={addCategory}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
