import { Rate, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getInventory } from "../API/Api";

export default function Inventory() {
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
      <Typography.Title level={4}>Inventory</Typography.Title>

      <Table
        loading={loading}
        style={{ width: "100%" }}
        columns={[
          {
            title: "Thumbnail",
            dataIndex: "thumbnail",
            render: (value) => <img src={value} alt="" width={50} />,
          },
          { title: "Title", dataIndex: "title" },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => <span> ${value}</span>,
          },
          { title: "Rating", dataIndex: "rating",
            render: (rating)=>{
              return <Rate value={rating}  allowHalf disabled/>
            }
           },
          { title: "Stock", dataIndex: "stock" },

          { title: "Brand", dataIndex: "brand" },
          { title: "Category", dataIndex: "category" },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize : 5,
        }}
      ></Table>
    </Space>
  );
}
