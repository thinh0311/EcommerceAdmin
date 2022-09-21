import React from "react";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import accountApi from "../../api/accountApi";
import StatusCard from "../../components/status-card/StatusCard";
import Table from "../../components/table/Table";
import ultils from "../../utils/formatDate";

const chartOptions = {
  series: [
    {
      name: "Online Customers",
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
    {
      name: "Store Customers",
      data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10],
    },
  ],
  options: {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    legend: {
      position: "top",
    },
    grid: {
      show: false,
    },
  },
};

const DashBoard = () => {
  const [itemProduct, setItemProduct] = React.useState({
    total: Number,
    DataisLoaded: false,
  });
  const [itemCustomer, setItemCustomer] = React.useState({
    total: Number,
    DataisLoaded: false,
  });
  const [itemOrder, setItemOrder] = React.useState({
    total: Number,
    DataisLoaded: false,
  });
  const [itemIncome, setItemIncome] = React.useState({
    total: Number,
    DataisLoaded: false,
  });
  const [itemTopCustomer, setItemTopCustomer] = React.useState({
    list: [],
    DataisLoaded: false,
  });
  const [itemTopOrders, setItemTopOrders] = React.useState({
    list: [],
    DataisLoaded: false,
  });

  React.useEffect(() => {
    const getRevenuePro = async () => {
      try {
        const result = await accountApi.revenueTotalSales();
        setItemProduct({ total: result, DataisLoaded: true });
      } catch (err) {
        console.log(err);
      }
    };
    getRevenuePro();
    const getRevenueCus = async () => {
      try {
        const result = await accountApi.revenueCustomers();
        setItemCustomer({ total: result, DataisLoaded: true });
      } catch (err) {
        console.log(err);
      }
    };
    getRevenueCus();
    const getRevenueOrder = async () => {
      try {
        const result = await accountApi.revenueOrders();
        setItemOrder({ total: result, DataisLoaded: true });
      } catch (err) {
        console.log(err);
      }
    };
    getRevenueOrder();
    const getRevenueIncome = async () => {
      try {
        const result = await accountApi.revenueIncome();
        setItemIncome({ total: result, DataisLoaded: true });
      } catch (err) {
        console.log(err);
      }
    };
    getRevenueIncome();
    const getRevenueTopCus = async () => {
      try {
        const result = await accountApi.revenueTopCustomers();
        setItemTopCustomer({ list: result, DataisLoaded: true });
        console.log("r", result);
        console.log("c", itemTopCustomer);
      } catch (err) {
        console.log(err);
      }
    };
    getRevenueTopCus();
    const getRevenueTopOrder = async () => {
      try {
        const result = await accountApi.revenueTopOrders();
        setItemTopOrders({ list: result, DataisLoaded: true });
      } catch (err) {
        console.log(err);
      }
    };
    getRevenueTopOrder();
  }, []);

  const topCustomers = {
    head: ["Họ tên", "Địa chỉ", "Tổng tiền"],
  };

  const renderCusomerHead = (item, index) => <th key={index}>{item}</th>;

  const renderCusomerBody = (item, index) => (
    <tr key={index}>
      <td>{item.tenKhachHang}</td>
      <td>{item.diaChi}</td>
      <td>{ultils.formatCurency(item.soTien, ",")}</td>
    </tr>
  );

  const latestOrders = {
    header: ["ID", "Khách hàng", "Tổng tiền", "Ngày lập", "Trạng thái"],
  };

  const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

  const renderOrderBody = (item, index) => (
    <tr key={index}>
      <td>
        {`${item.maDonHang.substring(0, 4)}...`}
        {item.maDonHang.substring(28, 32)}
      </td>
      <td>{item.khachHang}</td>
      <td>{ultils.formatCurency(item.soTien, ",")}</td>
      <td>{ultils.formatDate(item.ngayLap.substring(0, 10))}</td>
      <td>{item.trangThai}</td>
    </tr>
  );

  if (
    !itemProduct.DataisLoaded ||
    !itemTopCustomer.DataisLoaded ||
    !itemTopOrders.DataisLoaded
  )
    return (
      <div>
        <h1> Pleses wait some time.... </h1>{" "}
      </div>
    );
  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            <div className="col-6">
              Total sales
              <StatusCard
                icon="bx bx-shopping-bag"
                count={itemProduct.total}
                title="Total Sales"
              />
            </div>
            <div className="col-6">
              Total customers
              <StatusCard
                icon="bx bx-cart"
                count={itemCustomer.total}
                title="Total customers"
              />
            </div>
            <div className="col-6">
              Total income
              <StatusCard
                icon="bx bx-dollar-circle"
                count={ultils.formatCurency(itemIncome.total, ",")}
                title="Total income"
              />
            </div>
            <div className="col-6">
              Total orders
              <StatusCard
                icon="bx bx-receipt"
                count={itemOrder.total}
                title="Total orders"
              />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
            <ReactApexChart
              options={chartOptions.options}
              series={chartOptions.series}
              type="line"
              height="100%"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card__header">
              <h3>Top customers</h3>
            </div>
            <div className="card__body">
              <Table
                headData={topCustomers.head}
                renderHead={(item, index) => renderCusomerHead(item, index)}
                bodyData={itemTopCustomer.list}
                renderBody={(item, index) => renderCusomerBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">View all</Link>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card__header">
              <h3>Top orders</h3>
            </div>
            <div className="card__bod">
              <Table
                headData={latestOrders.header}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={itemTopOrders.list}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">View all</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
