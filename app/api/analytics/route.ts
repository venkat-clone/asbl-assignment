import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';


export async function GET() {
  try {
    // 1. Total number of users
    const totalUsers = await prisma.user.count();

    // 2. Total number of sessions
    const totalSessions = await prisma.session.count();

    // 3. Number of active sessions today (sessions created today)
    const todaySessions = await prisma.session.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)), // Start of today
        },
      },
    });

    // 4. Sessions per user (example: how many sessions each user has)
    const sessionsPerUser = await prisma.session.groupBy({
      by: ["userId"],
      _count: {
        userId: true,
      },
    });

    // 5. Most visited endpoints (count of sessions per endpoint)
    const mostVisitedEndpoints = await prisma.session.groupBy({
      by: ["endPoint"],
      _count: {
        endPoint: true,
      },
      orderBy: {
        _count: {
          endPoint: "desc",
        },
      },
    });

    // 6. Sessions by IP address (example: count of sessions per unique IP)
    const sessionsByIp = await prisma.session.groupBy({
      by: ["ipAddress"],
      _count: {
        ipAddress: true,
      },
      orderBy: {
        _count: {
          ipAddress: "desc",
        },
      },
    });

    return NextResponse.json({
      totalUsers,
      totalSessions,
      todaySessions,
      sessionsPerUser,
      mostVisitedEndpoints,
      sessionsByIp,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
