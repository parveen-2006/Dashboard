import { Card, Space, Statistic, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { AiTwotoneDollarCircle } from 'react-icons/ai'
import { CiShop, CiShoppingCart } from 'react-icons/ci'
import { LuUserRound } from 'react-icons/lu'
import { getOrders } from '../API/Api'

export default function Dashboard() {
    return (
        <Space size={20} orientation='vertical'>
            <Typography.Title level={4}>Dashboard</Typography.Title>
            <Space orientation='horizontal'>
                <DashboardCard
                    icon={<CiShoppingCart style={{
                        color: "green",
                        backgroundColor: "rgba(0, 255 , 0, 0.5)",
                        borderRadius: 20,
                        fontSize: 24,
                        padding: 8,
                    }} />}
                    title="Orders"
                    value={12345} />
                <DashboardCard
                    icon={<CiShop style={{
                        color: "blue",
                        backgroundColor: "rgba(0, 0 , 255, 0.25)",
                        borderRadius: 20,
                        fontSize: 24,
                        padding: 8,
                    }} />}
                    title="Inventory"
                    value={12345} />
                <DashboardCard
                    icon={<LuUserRound
                        style={{
                            color: "purple",
                            backgroundColor: "rgba(0, 255 ,0, 0.25)",
                            borderRadius: 20,
                            fontSize: 24,
                            padding: 8,
                        }} />}
                    title="Customer"
                    value={12345} />
                <DashboardCard
                    icon={<AiTwotoneDollarCircle
                        style={{
                            color: "red",
                            backgroundColor: "rgba(255, 0 , 0, 0.25)",
                            borderRadius: 20,
                            fontSize: 24,
                            padding: 8,
                        }} />}
                    title="Revenue"
                    value={12345} />
            </Space>
            <br />
            <Space>
                <RecentOrders />
            </Space>
        </Space>
    )
}

function RecentOrders() {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getOrders().then(res => {
            setDataSource(res.products.splice(0, 3));
            setLoading(false);
        })
    }, [])
    return (<>
        <Typography.Text>Recent Orders</Typography.Text>
        <Table columns={[
            {
                title: "Title",
                dataIndex: "title"
            },
            {
                title: "Quantity",
                dataIndex: "title"
            },
            {
                title: "Price",
                dataIndex: "discountedTotal"
            },
        ]}
            loading={loading}
            dataSource={dataSource}
            pagination={false}
        ></Table>
    </>)
}

function DashboardCard({ title, value, icon }) {
    return <Card>
        <Space direction='horizontal'>
            {icon}
            <Statistic title={title} value={value} />
        </Space>
    </Card>
}