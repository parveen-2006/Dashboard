import { Card, Space, Statistic, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { AiTwotoneDollarCircle } from "react-icons/ai";
import { CiShop, CiShoppingCart } from "react-icons/ci";
import { LuUserRound } from "react-icons/lu";
import { getCustomers, getInventory, getOrders, getRevenue } from "../API/Api";

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
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.total);
      setRevenue(res.discountedTotal)
    });
    getInventory().then((res) => {
      setInventory(res.total);
      console.log( "MY CODE: ",res.total);
    });
    getCustomers().then((res) => {
      setCustomers(res.total);
      console.log( "MY CODE: ",res.total);
    });
    getRevenue().then((res) => {
      setRevenue(res.total);
      console.log( "MY CODE: ",res.total);
    });

  }, []);

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
          value={orders}
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
          value={inventory}
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
          title="Customers"
          value={customers}
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
          value={revenue}
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
      <Space orientation="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

function DashboardChart() {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts.carts.map((cart) => {
        return `User-${cart.userId}`;
      });
      const data = res.carts.carts.map((cart) => {
        return cart.discountedTotal;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            backgroundColor: "rgba(255, 0, 0, 1)",
          },
        ],
      };
      setRevenueData(dataSource);
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

  return (
    <Card style={{ width: 500, height: 270 }}>
      <Bar options={options} data={revenueData} />;
    </Card>
  );
}
