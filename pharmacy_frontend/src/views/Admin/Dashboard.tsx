import React, { FC } from 'react'
import StatisItem from '../../components/StatisItem'
import { useTitle } from '../../hooks/useTitle'
import { Chart } from 'primereact/chart'
import { statistics } from '../../shared/fakeData'
import {
  chartData1,
  chartData2,
  chartOptions1,
  chartOptions2
} from '../../shared/fakeData'

const Dashboard: FC = () => {
  useTitle('Pharmacy - Dashboard')

  return (
    <>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {statistics.map(statistic => (
          <StatisItem key={statistic.name} item={statistic} />
        ))}
      </div>

      <div className="grid gap-3 grid-cols-1 xl:grid-cols-2">
        <div className="card">
          <h5 className="text-lg font-medium">Sale Overview</h5>
          <div className="p-chart">
            <Chart type="bar" data={chartData1} options={chartOptions1} />
          </div>
        </div>
        <div className="card">
          <h5 className="text-lg font-medium">Sale Overview</h5>
          <div className="p-chart">
            <Chart type="line" data={chartData2} options={chartOptions2} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
