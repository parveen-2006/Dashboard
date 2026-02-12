import { Rate, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getInventory } from "../API/Api";

export default function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInventory().then((res) => {
      console.log(res);
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);
  return (
    <Space direction="vertical" size={20} style={{ width: "100%" }}>
      <Typography.Title level={4}>Orders</Typography.Title>

      <Table
        loading={loading}
        style={{ width: "100%" }}
        columns={[
          { title: "Title", dataIndex: "title" },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => <span> ${value}</span>,
          },
          {
            title: "DiscountedPrice",
            dataIndex: "discountedPrice",
            render: (value) => <span> ${value}</span>,
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          { title: "Total", dataIndex: "total" },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}
