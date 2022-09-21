import { Button } from "@mui/material";
import { PDFExport } from "@progress/kendo-react-pdf";
import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import accountApi from "../../api/accountApi";
import Table from "../../components/table/Table";
import ultils from "../../utils/formatDate";

const Analytics = () => {
  const navigate = useNavigate();
  const container = React.useRef(null);
  const pdfExportComponent = React.useRef(null);
  const [startDay, setStartDay] = React.useState(new Date());
  const [endDay, setEndDay] = React.useState(new Date());
  const [items, setItems] = React.useState({ list: [], DataisLoaded: false });
  const [total, setTotal] = React.useState();
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    async function postData(url = "", data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json-patch+json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }

    postData("http://www.drinkstore0311.somee.com/WeatherForecast/Revenue", {
      start: startDay,
      end: endDay,
    }).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
      setItems({ list: data, DataisLoaded: true });
    });

    return () => {
      setItems({ ...items, DataisLoaded: false });
    };
  }, [startDay, endDay]);

  React.useEffect(() => {
    const _total = (items) => {
      var temp = 0;
      items.map((item, index) => (temp = temp + item.tongTien));
      setTotal(ultils.formatCurency(temp, ","));
    };
    _total(items.list);
    const getUser = async () => {
      const result = await accountApi.getUser(localStorage.getItem("token"));
      setUser(result);
    };
    getUser();
  });

  const customerTableHead = ["Thang nam", "Doanh thu"];
  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.thangNam}</td>
      <td>{ultils.formatCurency(item.tongTien, ",")} đ</td>
    </tr>
  );

  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  return (
    <div>
      <h2 className="page-header">Thống kê</h2>
      <div className="button__card">
        <div className="button">
          <Button
            variant="contained"
            color="success"
            onClick={() => exportPDFWithComponent()}
          >
            Export
          </Button>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-around", margin: 30 }}
      >
        <div className="date__picker">
          <p>Ngày bắt đầu</p>
          <ReactDatePicker
            dateFormat="dd/MM/yyyy"
            selected={startDay}
            onChange={(date) => setStartDay(date)}
          />
        </div>
        <div className="date__picker">
          <p>Ngày kết thúc</p>
          <ReactDatePicker
            dateFormat="dd/MM/yyyy"
            selected={endDay}
            onChange={(date) => setEndDay(date)}
          />
        </div>
      </div>
      <PDFExport
        ref={pdfExportComponent}
        paperSize="A4"
        margin={40}
        fileName={`Report for ${new Date().getFullYear()}`}
        author="Do Thinh"
      >
        <div style={{ fontFamily: "Bookman" }} ref={container}>
          <div
            style={{ display: "flex", justifyContent: "center", margin: 10 }}
          >
            <h3>{`Doanh thu cua hang tu ${ultils.formatDate(
              startDay.toISOString().substring(0, 10)
            )} den ${ultils.formatDate(
              endDay.toISOString().substring(0, 10)
            )}`}</h3>
          </div>
          {!items.DataisLoaded ? (
            <div>Please wait some time ...</div>
          ) : (
            <div>
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card__body">
                        <Table
                          headData={customerTableHead}
                          renderHead={(item, index) => renderHead(item, index)}
                          bodyData={items.list}
                          renderBody={(item, index) => renderBody(item, index)}
                        />
                        <h3>Tong doanh thu: {total} đ</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                TPHCM, ngay{new Date().toISOString().substring(8, 10)} thang{" "}
                {new Date().toISOString().substring(5, 7)} nam{" "}
                {new Date().toISOString().substring(0, 4)}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 10,
                  marginRight: 50,
                }}
              >
                Nhan vien lap bao cao
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 100,
                  marginRight: 70,
                }}
              >
                {user.hoTen}
              </div>
            </div>
          )}
        </div>
      </PDFExport>
    </div>
  );
};

export default Analytics;
