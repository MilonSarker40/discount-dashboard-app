// components/StatCard.tsx
import { Store, Users, Gift, Ticket, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  color: "purple" | "blue" | "pink" | "green";
  icon: React.ReactNode;
}

const colorStyles = {
  purple: "bg-violet-100",
  blue: "bg-blue-100",
  pink: "bg-pink-100",
  green: "bg-green-100",
};

const gradientStyles = {
  purple: "from-violet-500 to-purple-700",
  blue: "from-blue-500 to-cyan-500",
  pink: "from-pink-500 to-fuchsia-500",
  green: "from-green-500 to-emerald-500",
};

export default function StatCard({ title, value, change, color, icon }: StatCardProps) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-20 h-20 rounded-full ${colorStyles[color]} flex items-center justify-center`}>
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradientStyles[color]} flex items-center justify-center text-white`}>
              {icon}
            </div>
          </div>
          <div>
            <p className="text-[#7a7699] text-sm font-medium">{title}</p>
            <h2 className="stat-number text-xl">{value}</h2>
            <p className="text-emerald-500 text-sm font-semibold mt-1 flex items-center gap-1">
              <TrendingUp size={14} /> {change} this month
            </p>
          </div>
        </div>
        <div className="text-violet-300 text-3xl">📈</div>
      </div>
    </div>
  );
}