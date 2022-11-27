import React, { FC, useEffect, useState, useRef } from 'react'
import StatisItem from '../../components/StatisItem'
import { useTitle } from '../../hooks/useTitle'
import { Chart } from 'primereact/chart'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { countOrderApi } from '../../api/orderApi'
import {
  chartData1,
  chartData2,
  chartOptions1,
  chartOptions2
} from '../../shared/fakeData'
import { useStore } from '../../store'
import {
  getCountSaleApi,
  getCountSaleMonthlyApi,
  getRevenueApi,
  getRevenueMonthlyApi
} from '../../api/orderDetailsApi'
import { formatCurrency } from '../../shared/utils'
import { getRecentSaleMedicineApi, stockCountApi } from '../../api/medicineApi'
import { Medicine } from '../../shared/types'

const statisticItem = {
  total: 0,
  new: 0
}

const Dashboard: FC = () => {
  const [lastVisit, setLastVisit] = useState<string | null>('')
  const [lastMedicineCount, setLastMedicineCount] = useState<string | null>('')
  const setLastCount = useStore(state => state.setLastCount)
  const [loading, setLoading] = useState(false)
  const [countOrders, setCountOrders] = useState(statisticItem)
  const [revenue, setRevenue] = useState(statisticItem)
  const [countMedicines, setCountMedicines] = useState(statisticItem)
  const [countSales, setCountSales] = useState(statisticItem)
  const [revenueMonthly, setRevenueMonthly] = useState({})
  const [countSaleMonthly, setCountSaleMonthly] = useState({})
  const [medicines, setMedicines] = useState<Medicine[]>()
  const [first, setFirst] = useState(0)

  const timeOut = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    setLastVisit(localStorage.getItem('last-visit'))
    setLastMedicineCount(localStorage.getItem('last-count'))

    timeOut.current = setTimeout(() => getStatistics(''), 500)

    return () => clearTimeout(timeOut.current)
  }, [lastMedicineCount, lastVisit])

  const getStatistics = async (timestamp: string | Date | null) => {
    setLoading(true)
    try {
      const res1 = await countOrderApi(timestamp, lastVisit)
      const res2 = await getRevenueApi(timestamp, lastVisit)
      const res3 = await getCountSaleApi(timestamp, lastVisit)
      const res4 = await stockCountApi(lastMedicineCount)
      const res5 = await getCountSaleMonthlyApi(null)
      const res6 = await getRevenueMonthlyApi(null)
      const res7 = await getRecentSaleMedicineApi()

      setCountOrders(res1.data)
      setRevenue(res2.data)
      setCountSales(res3.data)
      setCountMedicines(res4.data)
      setCountSaleMonthly(res5.data)
      setRevenueMonthly(res6.data)
      setMedicines(res7.data)

      setLastCount(res4.data.total)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const statistics = [
    {
      name: 'Orders',
      icon: 'pi pi-shopping-cart text-blue-500',
      total: countOrders.total,
      color: 'bg-blue-100',
      new: countOrders.new
    },
    {
      name: 'Revenue',
      icon: 'pi pi-money-bill text-green-500',
      total: formatCurrency(revenue.total),
      color: 'bg-green-100',
      new: formatCurrency(revenue.new)
    },
    {
      name: `Medicine's sales`,
      icon: 'pi pi-inbox text-cyan-500',
      total: countSales.total,
      color: 'bg-cyan-100',
      new: countSales.new
    },
    {
      name: `Medicine's stocks`,
      icon: 'pi pi-eraser text-purple-500',
      total: countMedicines.total,
      color: 'bg-purple-100',
      new: countMedicines.new
    }
  ]

  const chartRevenueData = {
    labels: Object.keys(revenueMonthly),
    datasets: [
      {
        type: 'line',
        label: 'Revenue',
        borderColor: '#66BB6A',
        yAxisID: 'y',
        borderWidth: 2,
        fill: false,
        data: Object.values(revenueMonthly)
      },
      {
        type: 'bar',
        label: `Medicine's sale`,
        fill: false,
        backgroundColor: '#42A5F5',
        yAxisID: 'y1',
        tension: 0.4,
        data: Object.values(countSaleMonthly)
      }
    ]
  }

  const onPage = (event: any) => {
    setFirst(event.first)
  }

  useTitle('Pharmacy - Dashboard')

  return (
    <>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {statistics.map(statistic => (
          <StatisItem key={statistic.name} item={statistic} loading={loading} />
        ))}
      </div>

      <div className="grid gap-3 grid-cols-1 xl:grid-cols-2">
        <div className="card">
          <h5 className="text-lg font-medium">Recent Sale</h5>
          <DataTable
            value={medicines}
            paginator
            rows={5}
            loading={loading}
            responsiveLayout="scroll"
            totalRecords={medicines?.length}
            first={first}
            onPage={onPage}
            size="small"
          >
            <Column
              field="image"
              header="Image"
              body={rowData => (
                <img
                  src={rowData.image}
                  alt={rowData.name}
                  className="max-w-[3rem]"
                ></img>
              )}
            />
            <Column
              field="name"
              header="Name"
              className="min-w-[10rem] text-xs"
            />
            <Column
              field="unit_price"
              header="Unit Price"
              className="min-w-[8rem]"
              align="center"
            />
            <Column
              field="unit_in_stock"
              header="Unit in stock"
              className="min-w-[8rem]"
              align="center"
            />
          </DataTable>
        </div>
        <div className="card h-fit">
          <h5 className="text-lg font-medium">Sale Overview</h5>
          <div className="p-chart">
            <Chart
              type="line"
              data={chartRevenueData}
              options={chartOptions2}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
