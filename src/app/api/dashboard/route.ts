import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     // Fetch total content count
//     const totalContent = await prisma.content.count();

//     // Fetch total new users (e.g., created within the last month)
//     const newUsers = await prisma.user.count({
//       where: {
//         createdAt: {
//           gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
//         },
//       },
//     });

//     // Fetch total registered users
//     const registeredUsers = await prisma.user.count();

//     // Fetch total posts by country
//     const postsByCountry = await prisma.country.findMany({
//       select: {
//         countryName: true,
//         _count: {
//           select: {
//             contents: true,
//           },
//         },
//       },
//     });

//     // Format postsByCountry data
//     const postsByCountryFormatted = postsByCountry.map((country) => ({
//       country: country.countryName,
//       posts: country._count.contents,
//     }));

//     // Fetch most popular content (e.g., based on views)
//     const mostPopularContent = await prisma.content.findMany({
//       orderBy: {
//         views: "desc",
//       },
//       take: 5, // Top 5 popular content
//       select: {
//         title: true,
//         views: true,
//       },
//     });

//     const mostPopularContentFormatted = mostPopularContent.map((content) => ({
//       title: content.title,
//       views: content.views,
//     }));

//     // Create the final response object
//     const dashboardData = {
//       summary: {
//         totalContent,
//         newUsers,
//         registeredUsers,
//       },
//       postsByCountry: postsByCountryFormatted,
//       mostPopularContent: mostPopularContentFormatted,
//     };

//     return NextResponse.json(dashboardData, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching dashboard data:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error", details: String(error) },
//       { status: 500 }
//     );
//   }
// }
export async function GET() {
  try {
    // Fetch total content count
    const totalContent = await prisma.content.count();

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
            contents: {
              where: {
                status: "PUBLISHED",
              },
            },
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
      where: {
        status: "PUBLISHED",
      },
      orderBy: {
        views: "desc",
      },
      take: 5, // Top 5 popular content
      select: {
        title: true,
        views: true,
      },
    });

    const mostPopularContentFormatted = mostPopularContent.map((content) => ({
      title: content.title,
      views: content.views,
    }));

    // Create the final response object
    const dashboardData = {
      summary: {
        totalContent,
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
      { error: "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}
