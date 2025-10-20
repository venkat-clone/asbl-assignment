import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Total Users
    const totalUsers = await prisma.user.count();

    // 2. Total Sessions
    const totalSessions = await prisma.session.count();

    // 3. Active Sessions Today
    const todaySessions = await prisma.session.count({
      where: { startTime: { gte: today } }
    });

    // 4. Sessions per User (Top 10)
    const sessionsPerUser = await prisma.session.groupBy({
      by: ["userId"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10
    });

    // 5. Most Visited Pages (from Events)
    const mostVisitedPages = await prisma.event.groupBy({
      by: ["pageUrl"],
      where: { eventType: "page_view" },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10
    });

    // 6. Sessions by Device (Top 10)
    const sessionsByDevice = await prisma.session.groupBy({
      by: ["deviceId"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10
    });

    // 7. Event Types Distribution
    const eventTypes = await prisma.event.groupBy({
      by: ["eventType"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } }
    });

    // 8. Conversion Rate
    const totalPageViews = await prisma.event.count({
      where: { eventType: "page_view" }
    });
    const formSubmissions = await prisma.event.count({
      where: { eventType: "form_submission" }
    });
    const conversionRate = totalPageViews > 0 ? 
      ((formSubmissions / totalPageViews) * 100).toFixed(1) : 0;

    return NextResponse.json({
      totalUsers,
      totalSessions,
      todaySessions,
      sessionsPerUser,
      mostVisitedPages,
      sessionsByDevice,
      eventTypes,
      conversionRate
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}