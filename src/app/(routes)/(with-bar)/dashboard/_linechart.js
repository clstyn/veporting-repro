import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function LineChart() {
  const lineChartRef = useRef(null);

  useEffect(() => {
    if (lineChartRef.current === null) {
      // Chart instance doesn't exist, create a new one
      const ctx = document.getElementById("lineChart").getContext("2d");
      lineChartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday"],
          datasets: [
            {
              data: [86, 114, 106, 106, 107, 111, 133],
              borderColor: "#BE1D2D",
              backgroundColor: "rgb(190, 29, 45, 0.1)",
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }

    return () => {
      if (lineChartRef.current !== null) {
        lineChartRef.current.destroy();
        lineChartRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full flex mx-auto my-auto">
      <div className="pt-0 rounded-xl  w-full h-fit my-auto ">
        <canvas id="lineChart"></canvas>
      </div>
    </div>
  );
}
