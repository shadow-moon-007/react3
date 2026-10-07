import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { KPIWidget } from '../../components/cards/KPIWidget';
import { analyticsApi } from '../../api/analyticsApi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import { Users, TrendingUp, DollarSign, Activity, Award, CheckCircle2 } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsApi.getDashboardAnalytics().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="p-12 text-center text-gray-400">
        <div className="w-8 h-8 border-2 border-[#D71920] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <span className="text-xs">Computing analytics models...</span>
      </div>
    );
  }

  const PIE_COLORS = ['#16A34A', '#2563EB', '#F59E0B', '#9CA3AF'];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Enterprise Analytics & Performance Telemetry"
        description="Executive operational cockpit displaying real-time SLA adherence, headcount distribution, resource utilization, and verified cost avoidance."
        badge="Live Telemetry"
      />

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPIWidget
          label="Overall Service SLA"
          value={data.overview.overallSLA}
          change="+0.4%"
          trend="up"
          subtext="Target: 99.5%"
          icon={Activity}
        />
        <KPIWidget
          label="Annualized Savings"
          value={data.overview.annualizedValue}
          change="+18.5%"
          trend="up"
          subtext="FY2026 Run Rate"
          icon={DollarSign}
        />
        <KPIWidget
          label="Active Initiatives"
          value={data.overview.totalProjects}
          change="84 Total"
          trend="neutral"
          subtext="Cross-functional"
          icon={TrendingUp}
        />
        <KPIWidget
          label="Total Global Staff"
          value="1,420"
          change="+80 YoY"
          trend="up"
          subtext="6 Major Hubs"
          icon={Users}
        />
      </div>

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Global Headcount by Regional Hub (BarChart) */}
        <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-xs">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900">
              Headcount Distribution by Global Delivery Hub
            </h3>
            <p className="text-xs text-gray-400">GBS-BTS (Technology) vs GBS-BO (Operations)</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.locationData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="location" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="bts" name="GBS-BTS (Tech)" fill="#D71920" radius={[4, 4, 0, 0]} />
                <Bar dataKey="bo" name="GBS-BO (Operations)" fill="#111111" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Quarterly Savings & Automation ROI (AreaChart) */}
        <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-xs">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900">
              Verified Value Generation & Cost Avoidance ($M)
            </h3>
            <p className="text-xs text-gray-400">Quarterly Target vs Achieved Financial Impact</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.savingsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAchieved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="quarter" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area
                  type="monotone"
                  dataKey="achievedSavings"
                  name="Achieved ($M)"
                  stroke="#16A34A"
                  fillOpacity={1}
                  fill="url(#colorAchieved)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="targetSavings"
                  name="Target ($M)"
                  stroke="#9CA3AF"
                  fillOpacity={0}
                  strokeDasharray="4 4"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Resource Center SOP Consumption (LineChart) */}
        <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-xs">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900">
              Monthly SOP & Governance Asset Consumption
            </h3>
            <p className="text-xs text-gray-400">Employee downloads of audited compliance docs</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.resourceUsage} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="sops"
                  name="SOPs & Manuals"
                  stroke="#D71920"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="templates"
                  name="Templates"
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="policies"
                  name="Corporate Policies"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Strategic Projects Status Breakdown (PieChart) */}
        <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-xs">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900">
              Transformation Initiatives by Lifecycle Status
            </h3>
            <p className="text-xs text-gray-400">Current portfolio delivery status</p>
          </div>
          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="count"
                  nameKey="status"
                  label={(entry: any) => `${entry.status || entry.name}: ${entry.count || entry.value}`}
                >
                  {data.projectStatusData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Operational SLA Compliance Scorecard Table */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-gray-900 mb-1">
          Global Operational SLA & Resilience Benchmark
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          Continuously audited metrics across IT availability, procurement cadence, and employee satisfaction
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-2.5 px-4">Performance Index</th>
                <th className="py-2.5 px-4">Target Benchmark</th>
                <th className="py-2.5 px-4">Actual Score</th>
                <th className="py-2.5 px-4 text-right">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.slaMetrics.map((sla: any, idx: number) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-900">{sla.metric}</td>
                  <td className="py-3 px-4 font-mono text-gray-500">{sla.target}%</td>
                  <td className="py-3 px-4 font-mono font-bold text-gray-900">{sla.score}%</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      <CheckCircle2 className="w-3 h-3" />
                      {sla.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
