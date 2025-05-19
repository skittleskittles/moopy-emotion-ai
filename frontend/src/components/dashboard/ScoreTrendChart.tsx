import { SurveyRecord, getLevelLabel } from "@/models/ClientDetail";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
} from "recharts";
import { startOfMonth, endOfMonth } from "date-fns";

interface Props {
  scoreHistory: SurveyRecord[];
}

export const ScoreTrendChart: React.FC<Props> = ({ scoreHistory }) => {
  if (scoreHistory.length === 0) return null;

  const firstDate = new Date(scoreHistory[0].date);
  const startDate = startOfMonth(firstDate);
  const endDate = endOfMonth(new Date());

  const chartData = scoreHistory.map((item) => {
    return {
      ...item,
      date: new Date(item.date).getTime(),
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
      >
        <ReferenceArea
          y1={25}
          y2={49}
          fill="#d1fae5"
          fillOpacity={0.4}
          label="Normal"
        />
        <ReferenceArea
          y1={50}
          y2={60}
          fill="#fef3c7"
          fillOpacity={0.4}
          label="Mild"
        />
        <ReferenceArea
          y1={61}
          y2={70}
          fill="#fde68a"
          fillOpacity={0.4}
          label="Moderate"
        />
        <ReferenceArea
          y1={71}
          y2={100}
          fill="#fecaca"
          fillOpacity={0.4}
          label="Severe"
        />

        <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />

        <XAxis
          dataKey="date"
          type="number"
          domain={[
            startDate.getTime() - 5 * 24 * 60 * 60 * 1000,
            endDate.getTime(),
          ]}
          tick={false} // 隐藏刻度文字
          axisLine={false} // 隐藏坐标轴线
          tickLine={false} // 隐藏刻度线
        />

        <YAxis
          domain={[25, 100]}
          ticks={[49, 60, 70, 85]} // 你可自定义实际显示位置（关键点）
          tickFormatter={(score) => {
            if (score <= 49) return "1";
            if (score <= 60) return "2";
            if (score <= 70) return "3";
            return "4";
          }}
          // tick={{ fontSize: 12, fill: "#4B5563" }}
          tick={false} // 隐藏刻度文字
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
          width={30}
        />

        <Tooltip
          formatter={(value: any) => {
            // Map score → Level text
            return [getLevelLabel(value), "Level"];
          }}
          labelFormatter={(label: number) => {
            return new Date(label).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
          }}
          contentStyle={{
            backgroundColor: "#ffffff",
            borderColor: "#e5e7eb",
            borderRadius: 6,
            fontSize: 13,
          }}
        />

        <Line
          type="monotone"
          dataKey="score"
          stroke="#6366f1"
          strokeWidth={2.5}
          dot={{ r: 4, strokeWidth: 2, fill: "#6366f1" }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
