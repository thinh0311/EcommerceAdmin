import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import orderApi from "../../api/orderApi";
import Table from "../../components/table/Table";
//import customerList from "../../assets/JsonData/customers-list.json";

import { Link } from "react-router-dom";
import ultils from "../../utils/formatDate";
const customerTableHead = [
  "ID",
  "Khách hàng",
  "Ngày lập",
  "Nhân viên duyệt",
  "Shipper",
  "Trạng thái",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const approveOrder = async (madonHang, maNV) => {
  try {
    const result = await orderApi.approveOrder(madonHang, maNV);
    console.log(result);
    toast.success("Thành công");
  } catch (err) {
    console.log(err);
    toast.error("Thất bại");
  }
};
const assignOrder = async (madonHang, maShipper) => {
  try {
    const result = await orderApi.assignOrder(madonHang, maShipper);
    console.log(result);
    toast.success("Thành công");
  } catch (err) {
    console.log(err);
    toast.error("Thất bại");
  }
};
const successOrder = async (madonHang) => {
  try {
    const result = await orderApi.successOrder(madonHang);
    console.log(result);
    toast.success("Thành công");
  } catch (err) {
    console.log(err);
    toast.error("Thất bại");
  }
};

const Orders = () => {
  const [shipper, setShipper] = React.useState({
    listShipper: [],
    DataisLoaded: false,
  });
  const [idShipper, setIdShipper] = React.useState("");
  const [items, setItem] = React.useState({
    listOrders: [],
    DataisLoaded: false,
  });
  const [items_0, setItem_0] = React.useState({
    listOrders: [],
    DataisLoaded: false,
  });
  const [items_1, setItem_1] = React.useState({
    listOrders: [],
    DataisLoaded: false,
  });
  const [items_2, setItem_2] = React.useState({
    listOrders: [],
    DataisLoaded: false,
  });
  const [items_3, setItem_3] = React.useState({
    listOrders: [],
    DataisLoaded: false,
  });

  React.useEffect(() => {
    const getShipper = async () => {
      try {
        const result = await orderApi.getShipper();

        setShipper({ listShipper: result, DataisLoaded: true });
      } catch (err) {
        console.log(err);
      }
    };
    getShipper();
    const getAllOrder = async () => {
      try {
        const result = await orderApi.getAllOrder();

        setItem({ listOrders: result, DataisLoaded: true });
      } catch (err) {
        console.log(err);
      }
    };
    getAllOrder();
    const getAllOrder_0 = async () => {
      try {
        const result = await orderApi.getAllOrderbyStatus(0);

        setItem_0({ listOrders: result, DataisLoaded: true });
      } catch (err) {
        console.log(err);
      }
    };
    getAllOrder_0();
    const getAllOrder_1 = async () => {
      try {
        const result = await orderApi.getAllOrderbyStatus(1);

        setItem_1({ listOrders: result, DataisLoaded: true });
      } catch (err) {
        console.log(err);
      }
    };
    getAllOrder_1();
    const getAllOrder_2 = async () => {
      try {
        const result = await orderApi.getAllOrderbyStatus(2);

        setItem_2({ listOrders: result, DataisLoaded: true });
      } catch (err) {
        console.log(err);
      }
    };
    getAllOrder_2();
    const getAllOrder_3 = async () => {
      try {
        const result = await orderApi.getAllOrderbyStatus(3);

        setItem_3({ listOrders: result, DataisLoaded: true });
      } catch (err) {
        console.log(err);
      }
    };
    getAllOrder_3();
  }, []);

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>
        {`${item.donHang.maDonHang.substring(0, 4)}...`}
        {item.donHang.maDonHang.substring(28, 32)}
      </td>
      <td>{item.khachHang}</td>
      <td>{ultils.formatDate(item.donHang.ngayLap.substring(0, 10))}</td>
      <td> {item.nhanVien} </td>
      <td>
        {" "}
        {item.donHang.trangThai === 0 ? (
          ""
        ) : item.shipper.length !== 0 ? (
          item.shipper
        ) : (
          <select onClick={(e) => setIdShipper(e.target.value)}>
            {shipper.listShipper.map((list, index) => (
              <option value={list.maShipper}>{list.hoTen}</option>
            ))}
          </select>
        )}{" "}
      </td>
      <td className={`item__status__${item.donHang.trangThai}`}>
        {item.donHang.trangThai === 0 ? (
          <Link
            to="/orders"
            onClick={() => {
              approveOrder(
                item.donHang.maDonHang,
                localStorage.getItem("token")
              );
            }}
          >
            Duyệt
          </Link>
        ) : item.donHang.trangThai === 1 ? (
          <Link
            to="/orders"
            onClick={() => assignOrder(item.donHang.maDonHang, idShipper)}
          >
            Phân công giao
          </Link>
        ) : item.donHang.trangThai === 2 ? (
          <Link
            to="/orders"
            onClick={() => successOrder(item.donHang.maDonHang)}
          >
            Đang giao
          </Link>
        ) : (
          "Hoàn tất"
        )}
      </td>
      <td>
        <Link
          className="item__status__1"
          to={`/orders/order-detail/${item.donHang.maDonHang}`}
        >
          Chi tiết
        </Link>
      </td>
    </tr>
  );

  if (!items.DataisLoaded) {
    return (
      <div>
        <h1> Pleses wait some time.... </h1>{" "}
      </div>
    );
  }
  return (
    <div>
      <ToastContainer />
      <h2 className="page-header">Đơn hàng</h2>
      {/*  */}{" "}
      <Tabs>
        <TabList>
          <Tab>Tất cả</Tab>
          <Tab>Chưa duyệt</Tab>
          <Tab>Đã duyệt</Tab>
          <Tab>Đang giao</Tab>
          <Tab>Hoàn tất</Tab>
        </TabList>

        <TabPanel>
          <div className="row"></div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card__body">
                  <Table
                    limit="10"
                    headData={customerTableHead}
                    renderHead={(item, index) => renderHead(item, index)}
                    bodyData={items.listOrders}
                    renderBody={(item, index) => renderBody(item, index)}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="row"></div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card__body">
                  <Table
                    limit="10"
                    headData={customerTableHead}
                    renderHead={(item, index) => renderHead(item, index)}
                    bodyData={items_0.listOrders}
                    renderBody={(item, index) => renderBody(item, index)}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="row"></div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card__body">
                  <Table
                    limit="10"
                    headData={customerTableHead}
                    renderHead={(item, index) => renderHead(item, index)}
                    bodyData={items_1.listOrders}
                    renderBody={(item, index) => renderBody(item, index)}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="row"></div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card__body">
                  <Table
                    limit="10"
                    headData={customerTableHead}
                    renderHead={(item, index) => renderHead(item, index)}
                    bodyData={items_2.listOrders}
                    renderBody={(item, index) => renderBody(item, index)}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="row"></div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card__body">
                  <Table
                    limit="10"
                    headData={customerTableHead}
                    renderHead={(item, index) => renderHead(item, index)}
                    bodyData={items_3.listOrders}
                    renderBody={(item, index) => renderBody(item, index)}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Orders;
