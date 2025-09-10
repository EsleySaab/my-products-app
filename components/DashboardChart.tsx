"use client"

import { useEffect, useRef } from "react"
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
)

export default function DashboardChart() {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  let chartInstance: Chart | null = null

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const data = {
      labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
      datasets: [
        {
          label: "Vendas",
          data: [12, 19, 3, 5, 2, 7],
          backgroundColor: "rgba(59, 130, 246, 0.7)",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 1,
        },
      ],
    }

    const options = {
      responsive: true,
      plugins: {
        legend: { position: "top" as const },
        title: { display: true, text: "Métricas de Vendas Mensais" },
      },
    }

    chartInstance = new Chart(ctx, {
      type: "bar",
      data,
      options,
    })

    return () => {
      chartInstance?.destroy()
    }
  }, [])

  return <canvas ref={chartRef}></canvas>
}
