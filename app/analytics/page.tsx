// app/analytics/page.tsx

"use client";
import { useEffect, useState } from "react";

export default function AnalyticsPage() {
    const [analytics, setAnalytics] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Fetch analytics data from the API route when the page loads
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

    // Display loading state while fetching data
    if (loading) {
        return <div>Loading...</div>;
    }

    // Handle case if there's an error or no data
    if (analytics?.error) {
        return <div>Error: {analytics.error}</div>;
    }

    return (
        <div className="container p-6">
            <h1 className="text-3xl font-bold mb-6">Analytics</h1>

            <section>
                <h2 className="text-xl font-semibold mb-2">Total Users</h2>
                <p className="text-lg">{analytics.totalUsers}</p>
            </section>

            <section className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Total Sessions</h2>
                <p className="text-lg">{analytics.totalSessions}</p>
            </section>

            <section className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Active Sessions Today</h2>
                <p className="text-lg">{analytics.todaySessions}</p>
            </section>

            <section className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Sessions per User</h2>
                <ul>
                    {analytics.sessionsPerUser.map((user: any) => (
                        <li key={user.userId}>
                            User {user.userId} has {user._count.userId} sessions.
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Most Visited Endpoints</h2>
                <ul>
                    {analytics.mostVisitedEndpoints.map((endpoint: any) => (
                        <li key={endpoint.endPoint}>
                            {endpoint.endPoint} - {endpoint._count.endPoint} visits
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Sessions by IP Address</h2>
                <ul>
                    {analytics.sessionsByIp.map((ip: any) => (
                        <li key={ip.ipAddress}>
                            IP {ip.ipAddress} - {ip._count.ipAddress} sessions
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
