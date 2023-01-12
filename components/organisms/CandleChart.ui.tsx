import {
  createChart,
  CrosshairMode,
  CandlestickData,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

function ChartComponent({ data }: { data: CandlestickData[] }) {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (chartContainerRef.current) {
      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef?.current?.clientWidth });
      };
      const { width = 300, height = 200 } =
        chartContainerRef.current.getBoundingClientRect();
      const chart = createChart(chartContainerRef.current, {
        width,
        height,
        layout: {
          backgroundColor: "transparent",
          textColor: "rgba(255, 255, 255, 0.9)",
        },
        grid: {
          vertLines: {
            color: "rgba(197, 203, 206, 0.5)",
          },
          horzLines: {
            color: "rgba(197, 203, 206, 0.5)",
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        rightPriceScale: {
          borderColor: "rgba(197, 203, 206, 0.8)",
        },
        timeScale: {
          borderColor: "rgba(197, 203, 206, 0.8)",
        },
      });
      const candleSeries = chart.addCandlestickSeries({
        upColor: "#65a30d", //lime 600
        downColor: "#ea580c",
        borderDownColor: "rgba(255,255,255,.4)",
        borderUpColor: "rgba(255,255,255,.4)",
        wickDownColor: "rgba(255, 144, 0, 1)",
        wickUpColor: "rgba(255, 144, 0, 1)",
      });

      candleSeries.setData(data);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        chart.remove();
      };
    }
  }, [data]);
  return <div className="absolute inset-3" ref={chartContainerRef} />;
}

interface CandleChartProps {
  data: CandlestickData[];
}

export default function CandleChart({ data }: CandleChartProps) {
  return <ChartComponent data={data} />;
}
