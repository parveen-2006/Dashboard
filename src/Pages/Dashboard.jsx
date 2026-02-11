import { Card, Space, Statistic, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { AiTwotoneDollarCircle } from "react-icons/ai";
import { CiShop, CiShoppingCart } from "react-icons/ci";
import { LuUserRound } from "react-icons/lu";
import { getOrders, getRevenue } from "../API/Api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function Dashboard() {
  return (
    <Space size={20} orientation="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space orientation="horizontal">
        <DashboardCard
          icon={
            <CiShoppingCart
              style={{
                color: "green",
                backgroundColor: "rgba(0, 255 , 0, 0.5)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title="Orders"
          value={12345}
        />
        <DashboardCard
          icon={
            <CiShop
              style={{
                color: "blue",
                backgroundColor: "rgba(0, 0 , 255, 0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title="Inventory"
          value={12345}
        />
        <DashboardCard
          icon={
            <LuUserRound
              style={{
                color: "purple",
                backgroundColor: "rgba(0, 255 ,0, 0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title="Customer"
          value={12345}
        />
        <DashboardCard
          icon={
            <AiTwotoneDollarCircle
              style={{
                color: "red",
                backgroundColor: "rgba(255, 0 , 0, 0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title="Revenue"
          value={12345}
        />
      </Space>
      <br />
      <Space>
        <RecentOrders />
        <DashboardChart />
      </Space>
    </Space>
  );
}

function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products.splice(0, 3));
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Typography.Text>Recent Orders</Typography.Text>
      <Table
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Quantity",
            dataIndex: "title",
          },
          {
            title: "Price",
            dataIndex: "discountedTotal",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

function DashboardChart() {

  useEffect(() => {
    getRevenue().then((res) => {
        const labels = res.cart.map(cart=>{
            return `User-${cart.userId}`
        })


    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => Math.random() * 1000),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => Math.random() * 1000),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
