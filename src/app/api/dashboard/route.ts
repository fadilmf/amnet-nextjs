import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch total content count
    const totalContent = await prisma.content.count();

    // Fetch total visitors from VisitorHistory (summing visitor_public)
    const totalVisitorsResult = await prisma.visitorHistory.aggregate({
      _sum: {
        visitor_public: true,
      },
    });
    const totalVisitors = totalVisitorsResult._sum.visitor_public || 0;

    // Fetch total new users (e.g., created within the last month)
    const newUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
    });

    // Fetch total registered users
    const registeredUsers = await prisma.user.count();

    // Fetch total posts by country
    const postsByCountry = await prisma.country.findMany({
      select: {
        countryName: true,
        _count: {
          select: {
            contents: true,
          },
        },
      },
    });

    // Format postsByCountry data
    const postsByCountryFormatted = postsByCountry.map((country) => ({
      country: country.countryName,
      posts: country._count.contents,
    }));

    // Fetch most popular content (e.g., based on views)
    const mostPopularContent = await prisma.content.findMany({
      orderBy: {
        visitorRegistered: "desc", // or replace with a views field if available
      },
      take: 5, // Top 5 popular content
      select: {
        title: true,
        visitorRegistered: true,
      },
    });

    const mostPopularContentFormatted = mostPopularContent.map((content) => ({
      title: content.title,
      views: content.visitorRegistered,
    }));

    // Create the final response object
    const dashboardData = {
      summary: {
        totalContent,
        totalVisitors,
        newUsers,
        registeredUsers,
      },
      postsByCountry: postsByCountryFormatted,
      mostPopularContent: mostPopularContentFormatted,
    };

    return NextResponse.json(dashboardData, { status: 200 });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
