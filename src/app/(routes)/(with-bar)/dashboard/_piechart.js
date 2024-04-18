import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function PieChart({ p, v }) {
  const pieChartRef = useRef(null);

  useEffect(() => {
    if (pieChartRef.current === null) {
      const ctx = document.getElementById("pieChart").getContext("2d");
      pieChartRef.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Penetration Testing", "Vulnerability Assessment"],
          datasets: [
            {
              data: [p, v],
              borderColor: ["#FF9F2E", "#BE1D2D"],
              backgroundColor: ["rgba(255, 159, 46, 1)", "rgb(190, 29, 45, 1)"],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      });
    }

    return () => {
      if (pieChartRef.current !== null) {
        pieChartRef.current.destroy();
        pieChartRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full flex mx-auto my-auto">
      <div className="pt-0 rounded-xl w-full h-fit my-auto pb-2">
        <canvas id="pieChart"></canvas>
      </div>
    </div>
  );
}
