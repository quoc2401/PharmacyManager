export const statistics = [
  {
    name: 'Orders',
    icon: 'pi pi-shopping-cart text-blue-500',
    total: 152,
    color: 'bg-blue-100',
    new: 0
  },
  {
    name: 'Revenue',
    icon: 'pi pi-map-marker text-orange-500',
    total: '$5800',
    color: 'bg-orange-100',
    new: 0
  },
  {
    name: 'Customers',
    icon: 'pi pi-inbox text-cyan-500',
    total: '25508',
    color: 'bg-cyan-100',
    new: 0
  },
  {
    name: 'Medicines',
    icon: 'pi pi-star text-purple-500',
    total: '2000',
    color: 'bg-purple-100',
    new: 0
  }
]

export const chartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      type: 'line',
      label: 'Dataset 1',
      borderColor: '#42A5F5',
      borderWidth: 2,
      fill: false,
      data: [50, 25, 12, 48, 56, 76, 42]
    },
    {
      type: 'bar',
      label: 'Dataset 2',
      backgroundColor: '#66BB6A',
      data: [21, 84, 24, 75, 37, 65, 34],
      borderColor: 'white',
      borderWidth: 2
    },
    {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: '#FFA726',
      data: [41, 52, 24, 74, 23, 21, 32]
    }
  ]
}

export const chartOptions1 = {
  plugins: {
    legend: {
      labels: {
        color: '#495057'
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#495057'
      },
      grid: {
        color: '#ebedef'
      }
    },
    y: {
      ticks: {
        color: '#495057'
      },
      grid: {
        color: '#ebedef'
      }
    }
  }
}

export const chartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Dataset 1',
      fill: false,
      borderColor: '#42A5F5',
      yAxisID: 'y',
      tension: 0.4,
      data: [65, 59, 80, 81, 56, 55, 10]
    },
    {
      label: 'Dataset 2',
      fill: false,
      borderColor: '#00bb7e',
      yAxisID: 'y1',
      tension: 0.4,
      data: [28, 48, 40, 19, 86, 27, 90]
    }
  ]
}

export const chartOptions2 = {
  stacked: false,
  plugins: {
    legend: {
      labels: {
        color: '#495057'
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#495057'
      },
      grid: {
        color: '#ebedef'
      }
    },
    y: {
      type: 'linear',
      display: true,
      position: 'left',
      ticks: {
        color: '#495057'
      },
      grid: {
        color: '#ebedef'
      }
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      ticks: {
        color: '#495057'
      },
      grid: {
        drawOnChartArea: false,
        color: '#ebedef'
      }
    }
  }
}
