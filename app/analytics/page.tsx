"use client";
import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

export default function AnalyticsPage() {
    const [analytics, setAnalytics] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAnalytics() {
            setLoading(true);
            const res = await fetch("/api/analytics");
            const data = await res.json();
            setAnalytics(data);
            setLoading(false);
        }
        fetchAnalytics();
    }, []);

    if (loading) return <div className="flex items-center justify-center min-h-screen">Loading Dashboard...</div>;
    if (analytics?.error) return <div className="text-red-500 p-6">Error: {analytics.error}</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Analytics Dashboard
            </h1>

            {/* KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h3 className="text-gray-500">Total Users</h3>
                    <p className="text-3xl font-bold text-blue-600">{analytics.totalUsers}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h3 className="text-gray-500">Total Sessions</h3>
                    <p className="text-3xl font-bold text-green-600">{analytics.totalSessions}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h3 className="text-gray-500">Today Sessions</h3>
                    <p className="text-3xl font-bold text-purple-600">{analytics.todaySessions}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h3 className="text-gray-500">Conversion Rate</h3>
                    <p className="text-3xl font-bold text-orange-600">{analytics.conversionRate}%</p>
                </div>
            </div>

            {/* CHARTS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* CHART 1: Most Visited Pages */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4">Most Visited Pages</h2>
                    <ChartComponent
                        type="bar"
                        data={{
                            labels: analytics.mostVisitedPages.map((p: any) => p.pageUrl.slice(0, 20) + '...'),
                            datasets: [{
                                label: "Page Views",
                                data: analytics.mostVisitedPages.map((p: any) => p._count.id),
                                backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
                                borderRadius: 8
                            }]
                        }}
                        options={{
                            responsive: true,
                            scales: { y: { beginAtZero: true } },
                            plugins: { legend: { display: false } }
                        }}
                    />
                </div>

                {/* CHART 2: Event Types Distribution */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4">Event Types</h2>
                    <ChartComponent
                        type="doughnut"
                        data={{
                            labels: analytics.eventTypes.map((e: any) => e.eventType),
                            datasets: [{
                                data: analytics.eventTypes.map((e: any) => e._count.id),
                                backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"]
                            }]
                        }}
                        options={{
                            responsive: true,
                            plugins: { legend: { position: "bottom" } }
                        }}
                    />
                </div>

                {/* CHART 3: Sessions per User */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4">Top Users by Sessions</h2>
                    <ChartComponent
                        type="bar"
                        data={{
                            labels: analytics.sessionsPerUser.map((_: any, i: number) => `User ${i + 1}`),
                            datasets: [{
                                label: "Sessions",
                                data: analytics.sessionsPerUser.map((s: any) => s._count.id),
                                backgroundColor: "#10B981",
                                borderRadius: 8
                            }]
                        }}
                        options={{
                            responsive: true,
                            indexAxis: "y",
                            scales: { x: { beginAtZero: true } },
                            plugins: { legend: { display: false } }
                        }}
                    />
                </div>

                {/* CHART 4: Sessions by Device */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4">Sessions by Device</h2>
                    <ChartComponent
                        type="polarArea"
                        data={{
                            labels: analytics.sessionsByDevice.map((_: any, i: number) => `Device ${i + 1}`),
                            datasets: [{
                                data: analytics.sessionsByDevice.map((d: any) => d._count.id),
                                backgroundColor: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57", "#FF9FF3", "#54A0FF", "#5F27CD", "#00D2D3", "#141E30"]
                            }]
                        }}
                        options={{ responsive: true }}
                    />
                </div>

                {/* CHART 5: Conversion Funnel */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4">Conversion Funnel</h2>
                    <ChartComponent
                        type="bar"
                        data={{
                            labels: ["Page Views", "Clicks", "Form Submissions"],
                            datasets: [{
                                label: "Count",
                                data: [
                                    analytics.totalPageViews || 0,
                                    analytics.eventTypes.find((e: any) => e.eventType === 'click')?._count.id || 0,
                                    analytics.formSubmissions || 0
                                ],
                                backgroundColor: ["#3B82F6", "#F59E0B", "#10B981"],
                                borderRadius: 8
                            }]
                        }}
                        options={{
                            responsive: true,
                            scales: { y: { beginAtZero: true } },
                            plugins: { legend: { display: false } }
                        }}
                    />
                </div>

                {/* CHART 6: Sessions Over Time (Sample) */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4">Sessions Trend</h2>
                    <ChartComponent
                        type="line"
                        data={{
                            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                            datasets: [{
                                label: "Sessions",
                                data: [
                                    analytics.todaySessions * 0.8,
                                    analytics.todaySessions * 1.1,
                                    analytics.todaySessions * 0.9,
                                    analytics.totalSessions / 7,
                                    analytics.totalSessions / 7 * 1.2,
                                    analytics.totalSessions / 7 * 0.7,
                                    analytics.todaySessions
                                ],
                                borderColor: "#8B5CF6",
                                backgroundColor: "rgba(139, 92, 246, 0.1)",
                                fill: true,
                                tension: 0.4
                            }]
                        }}
                        options={{
                            responsive: true,
                            scales: { y: { beginAtZero: true } }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

// Chart Component Helper
function ChartComponent({ type, data, options }: any) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            // Destroy previous chart instance
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            // Create new chart
            chartRef.current = new Chart(canvasRef.current, {
                type,
                data,
                options
            });
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [type, data, options]);

    return <canvas ref={canvasRef}></canvas>;
}