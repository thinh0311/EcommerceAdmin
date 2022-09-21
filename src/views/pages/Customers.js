import React from "react";
import accountApi from "../../api/accountApi";
import Table from "../../components/table/Table";

const customerTableHead = ["ID", "Họ tên", "Email", "Số điện thoại", "Địa chỉ"];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{`${item.maKH.substring(0, 4)}...${item.maKH.substring(0, 4)}`}</td>
    <td>{item.hoTen}</td>
    <td>{item.email}</td>
    <td>{item.sdt}</td>
    <td>{item.diaChi}</td>
  </tr>
);

const Customers = () => {
  const [items, setItem] = React.useState({
    listCustomers: [],
    DataisLoaded: false,
  });

  React.useEffect(() => {
    const getAllCustomer = async () => {
      try {
        const result = await accountApi.getAllCustomers();
        setItem({ listCustomers: result, DataisLoaded: true });
      } catch (err) {
        console.log(err);
      }
    };
    getAllCustomer();
  }, []);

  if (!items.DataisLoaded)
    return (
      <div>
        <h1> Pleses wait some time.... </h1>{" "}
      </div>
    );
  return (
    <div>
      <h2 className="page-header">Khách hàng</h2>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={customerTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={items.listCustomers}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
