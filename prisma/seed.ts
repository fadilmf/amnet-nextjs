const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Hash password untuk super admin
  const password = process.env.ADMIN_PASSWORD;
  const hashedPassword = await bcrypt.hash(password, 10); // Menggunakan bcrypt untuk meng-hash password

  // Menambahkan data negara ke dalam tabel Country
  const countries = await prisma.country.createMany({
    data: [
      {
        countryName: "Brunei Darussalam",
        latitude: 4.5353,
        longitude: 114.7277,
        landAreas: "5,765 km²",
        forestAreas: "4,900 km²",
        totalForestAreas: "4,900 km²",
        mangroveAreas: "0.08%",
        totalMangroveAreas: 0.08,
        percentage: 73.8,
        challenges: "Limited land area, conservation challenges",
        recommendation: "Focus on sustainable development and conservation",
        programActivities: "Forest and wildlife conservation programs",
        policy: "National Forestry Policy",
      },
      {
        countryName: "Cambodia",
        latitude: 12.5657,
        longitude: 104.991,
        landAreas: "181,035 km²",
        forestAreas: "10,900 km²",
        totalForestAreas: "10,900 km²",
        mangroveAreas: "30 km²",
        totalMangroveAreas: 30,
        percentage: 59.4,
        challenges: "Deforestation, illegal logging",
        recommendation: "Reforestation and enforcement of conservation laws",
        programActivities: "Forest protection and rehabilitation programs",
        policy: "Forestry Law 2002",
      },
      {
        countryName: "Indonesia",
        latitude: -0.7893,
        longitude: 113.9213,
        landAreas: "1,904,569 km²",
        forestAreas: "1,240,000 km²",
        totalForestAreas: "2,016,000 km²",
        mangroveAreas: "3,300 km²",
        totalMangroveAreas: 3300,
        percentage: 49.2,
        challenges: "Deforestation, illegal logging, forest fires",
        recommendation: "Reforestation programs, stricter enforcement of laws",
        programActivities: "National forest programs, environmental education",
        policy: "Forestry Law No. 41/1999",
      },
      {
        countryName: "Laos",
        latitude: 19.8563,
        longitude: 102.4955,
        landAreas: "237,955 km²",
        forestAreas: "16,000 km²",
        totalForestAreas: "16,000 km²",
        mangroveAreas: "N/A",
        totalMangroveAreas: 0,
        percentage: 60.5,
        challenges: "Deforestation, land degradation",
        recommendation: "Improve forest management and reduce deforestation",
        programActivities: "Sustainable forest management",
        policy: "Forestry Law 2007",
      },
      {
        countryName: "Malaysia",
        latitude: 4.2105,
        longitude: 101.9758,
        landAreas: "330,803 km²",
        forestAreas: "20,000 km²",
        totalForestAreas: "20,000 km²",
        mangroveAreas: "1,400 km²",
        totalMangroveAreas: 1400,
        percentage: 59.6,
        challenges: "Illegal logging, habitat destruction",
        recommendation: "Strengthen law enforcement and conservation efforts",
        programActivities: "National park and wildlife protection",
        policy: "National Forestry Policy",
      },
      {
        countryName: "Myanmar",
        latitude: 21.9162,
        longitude: 95.955,
        landAreas: "676,578 km²",
        forestAreas: "29,000 km²",
        totalForestAreas: "29,000 km²",
        mangroveAreas: "2,500 km²",
        totalMangroveAreas: 2500,
        percentage: 47.4,
        challenges: "Deforestation, political instability",
        recommendation: "Reforestation and environmental protection laws",
        programActivities: "Forest conservation programs",
        policy: "Myanmar Forestry Policy",
      },
      {
        countryName: "Philippines",
        latitude: 12.8797,
        longitude: 121.774,
        landAreas: "300,000 km²",
        forestAreas: "7,000 km²",
        totalForestAreas: "7,000 km²",
        mangroveAreas: "50 km²",
        totalMangroveAreas: 50,
        percentage: 54.2,
        challenges: "Illegal logging, deforestation",
        recommendation: "Reforestation and stricter conservation laws",
        programActivities: "Forest protection and reforestation",
        policy: "Forestry Code of the Philippines",
      },
      {
        countryName: "Singapore",
        latitude: 1.3521,
        longitude: 103.8198,
        landAreas: "728.6 km²",
        forestAreas: "250 km²",
        totalForestAreas: "250 km²",
        mangroveAreas: "2.3 km²",
        totalMangroveAreas: 2.3,
        percentage: 20.0,
        challenges: "Urbanization, limited natural resources",
        recommendation: "Urban green space and environmental management",
        programActivities: "Environmental sustainability programs",
        policy: "Sustainable Development Blueprint",
      },
      {
        countryName: "Thailand",
        latitude: 15.87,
        longitude: 100.9925,
        landAreas: "513,120 km²",
        forestAreas: "20,000 km²",
        totalForestAreas: "20,000 km²",
        mangroveAreas: "3,000 km²",
        totalMangroveAreas: 3000,
        percentage: 32.9,
        challenges: "Deforestation, biodiversity loss",
        recommendation: "Protect forest ecosystems and biodiversity",
        programActivities: "Conservation and sustainable forestry",
        policy: "National Forestry Policy",
      },
      {
        countryName: "Timor Leste",
        latitude: -8.8743,
        longitude: 125.7275,
        landAreas: "14,874 km²",
        forestAreas: "1,800 km²",
        totalForestAreas: "1,800 km²",
        mangroveAreas: "6 km²",
        totalMangroveAreas: 6,
        percentage: 51.0,
        challenges: "Deforestation, soil erosion",
        recommendation: "Reforestation and soil conservation programs",
        programActivities: "National reforestation initiative",
        policy: "Forestry Sector Master Plan",
      },
      {
        countryName: "Vietnam",
        latitude: 14.0583,
        longitude: 108.2772,
        landAreas: "331,210 km²",
        forestAreas: "14,000 km²",
        totalForestAreas: "14,000 km²",
        mangroveAreas: "4,000 km²",
        totalMangroveAreas: 4000,
        percentage: 42.2,
        challenges: "Deforestation, biodiversity loss",
        recommendation: "Enforce forest conservation laws, reforestation",
        programActivities: "Forest protection and reforestation",
        policy: "Vietnam Forestry Law",
      },
    ],
  });

  console.log("Countries created:", countries);

  // Menambahkan akun super admin dan mengaitkan dengan negara Indonesia
  const indonesia = await prisma.country.findUnique({
    where: { countryName: "Indonesia" },
  });

  const superAdmin = await prisma.user.create({
    data: {
      username: "superadmin",
      firstName: "Super",
      lastName: "Admin",
      email: "superadmin@example.com",
      handphone: "1234567890",
      institution: "Admin Institution",
      position: "Super Admin",
      //   image: "", // Anda bisa menambahkan URL gambar profil jika diperlukan
      password: hashedPassword, // Menyimpan password yang sudah di-hash
      role: "ADMIN", // Menentukan role sebagai ADMIN
      countryId: indonesia?.id, // Mengaitkan super admin dengan negara Indonesia
    },
  });

  console.log("Super Admin account created:", superAdmin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
