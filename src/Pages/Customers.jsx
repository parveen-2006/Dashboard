import { Rate, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getCustomers } from "../API/Api";

export default function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      console.log(res);
      setDataSource(res.users);
      setLoading(false);
    });
  }, []);
  return (
    <Space direction="vertical" size={20} style={{ width: "100%" }}>
      <Typography.Title level={4}>Customers</Typography.Title>

      <Table
        loading={loading}
        style={{ width: "100%" }}
        columns={[
          {
            title: "Photo",
            dataIndex: "image",
            render: (value) => <img src={value} alt="" width={50} />,
          },
          { title: "First Name", dataIndex: "firstName" },
          {
            title: "Last Name",
            dataIndex: "lastName",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          { title: "Phone", dataIndex: "phone" },

          {
            title: "Address",
            dataIndex: "address",
            render: (address) => {
              return (
                <span>
                  {address.address}, {address.city}
                </span>
              );
            },
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}
