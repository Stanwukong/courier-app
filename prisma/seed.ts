import { PrismaClient, ShipmentStatus, ServiceType, ShipmentMode } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL ?? "";
const adapter = new PrismaPg({ connectionString });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma = new (PrismaClient as any)({ adapter });

async function main() {
  console.log("Seeding database...");

  // --- Admin User ---
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@courier.com" },
    update: {},
    create: {
      email: "admin@courier.com",
      name: "Admin User",
      passwordHash: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log(`Created admin user: ${admin.email}`);

  // --- Sample Shipments ---
  const shipmentData: {
    trackingNumber: string;
    status: ShipmentStatus;
    senderName: string;
    senderEmail: string;
    senderPhone: string;
    senderAddress: string;
    senderCity: string;
    senderCountry: string;
    receiverName: string;
    receiverEmail: string;
    receiverPhone: string;
    receiverAddress: string;
    receiverCity: string;
    receiverCountry: string;
    packageDescription: string;
    weight: number;
    weightUnit: string;
    serviceType: ServiceType;
    shipmentMode: ShipmentMode;
    shipDate: Date;
    estimatedDelivery: Date;
    actualDelivery: Date | null;
  }[] = [
    {
      trackingNumber: "SS-2025-000001",
      status: "DELIVERED",
      senderName: "John Smith",
      senderEmail: "john.smith@example.com",
      senderPhone: "+1-555-0101",
      senderAddress: "450 Park Avenue",
      senderCity: "New York",
      senderCountry: "United States",
      receiverName: "Emily Johnson",
      receiverEmail: "emily.j@example.com",
      receiverPhone: "+44-20-7946-0958",
      receiverAddress: "12 Baker Street",
      receiverCity: "London",
      receiverCountry: "United Kingdom",
      packageDescription: "Electronic components - 2 boxes",
      weight: 12.5,
      weightUnit: "kg",
      serviceType: "AIR_FREIGHT",
      shipmentMode: "INTERNATIONAL",
      shipDate: new Date("2025-01-10"),
      estimatedDelivery: new Date("2025-01-15"),
      actualDelivery: new Date("2025-01-14"),
    },
    {
      trackingNumber: "SS-2025-000002",
      status: "IN_TRANSIT",
      senderName: "Maria Garcia",
      senderEmail: "maria.g@example.com",
      senderPhone: "+1-555-0102",
      senderAddress: "789 Ocean Drive",
      senderCity: "Miami",
      senderCountry: "United States",
      receiverName: "Hans Mueller",
      receiverEmail: "hans.m@example.com",
      receiverPhone: "+49-30-1234-5678",
      receiverAddress: "Friedrichstrasse 43",
      receiverCity: "Berlin",
      receiverCountry: "Germany",
      packageDescription: "Textile samples - 5 cartons",
      weight: 35.0,
      weightUnit: "kg",
      serviceType: "OCEAN_FREIGHT",
      shipmentMode: "INTERNATIONAL",
      shipDate: new Date("2025-02-01"),
      estimatedDelivery: new Date("2025-03-01"),
      actualDelivery: null,
    },
    {
      trackingNumber: "SS-2025-000003",
      status: "PENDING",
      senderName: "Robert Chen",
      senderEmail: "r.chen@example.com",
      senderPhone: "+1-555-0103",
      senderAddress: "321 Tech Boulevard",
      senderCity: "San Francisco",
      senderCountry: "United States",
      receiverName: "Akiko Tanaka",
      receiverEmail: "a.tanaka@example.com",
      receiverPhone: "+81-3-1234-5678",
      receiverAddress: "2-3-1 Marunouchi",
      receiverCity: "Tokyo",
      receiverCountry: "Japan",
      packageDescription: "Server equipment - 1 pallet",
      weight: 120.0,
      weightUnit: "kg",
      serviceType: "AIR_FREIGHT",
      shipmentMode: "INTERNATIONAL",
      shipDate: new Date("2025-02-15"),
      estimatedDelivery: new Date("2025-02-20"),
      actualDelivery: null,
    },
    {
      trackingNumber: "SS-2025-000004",
      status: "IN_CUSTOMS",
      senderName: "Sophie Laurent",
      senderEmail: "sophie.l@example.com",
      senderPhone: "+33-1-2345-6789",
      senderAddress: "15 Rue de Rivoli",
      senderCity: "Paris",
      senderCountry: "France",
      receiverName: "David Williams",
      receiverEmail: "d.williams@example.com",
      receiverPhone: "+1-555-0104",
      receiverAddress: "500 Fifth Avenue",
      receiverCity: "New York",
      receiverCountry: "United States",
      packageDescription: "Fashion merchandise - 10 boxes",
      weight: 45.0,
      weightUnit: "kg",
      serviceType: "AIR_FREIGHT",
      shipmentMode: "INTERNATIONAL",
      shipDate: new Date("2025-02-05"),
      estimatedDelivery: new Date("2025-02-12"),
      actualDelivery: null,
    },
    {
      trackingNumber: "SS-2025-000005",
      status: "OUT_FOR_DELIVERY",
      senderName: "Michael Brown",
      senderEmail: "m.brown@example.com",
      senderPhone: "+1-555-0105",
      senderAddress: "100 Industrial Way",
      senderCity: "Chicago",
      senderCountry: "United States",
      receiverName: "Sarah Davis",
      receiverEmail: "s.davis@example.com",
      receiverPhone: "+1-555-0106",
      receiverAddress: "250 Commerce Street",
      receiverCity: "Dallas",
      receiverCountry: "United States",
      packageDescription: "Auto parts - 3 crates",
      weight: 85.0,
      weightUnit: "kg",
      serviceType: "ROAD_FREIGHT",
      shipmentMode: "DOMESTIC",
      shipDate: new Date("2025-02-08"),
      estimatedDelivery: new Date("2025-02-11"),
      actualDelivery: null,
    },
    {
      trackingNumber: "SS-2025-000006",
      status: "PICKED_UP",
      senderName: "James Wilson",
      senderEmail: "j.wilson@example.com",
      senderPhone: "+1-555-0107",
      senderAddress: "78 Harbor Boulevard",
      senderCity: "Los Angeles",
      senderCountry: "United States",
      receiverName: "Li Wei",
      receiverEmail: "l.wei@example.com",
      receiverPhone: "+86-21-1234-5678",
      receiverAddress: "88 Nanjing Road",
      receiverCity: "Shanghai",
      receiverCountry: "China",
      packageDescription: "Medical equipment - 2 pallets",
      weight: 200.0,
      weightUnit: "kg",
      serviceType: "OCEAN_FREIGHT",
      shipmentMode: "INTERNATIONAL",
      shipDate: new Date("2025-02-10"),
      estimatedDelivery: new Date("2025-03-15"),
      actualDelivery: null,
    },
    {
      trackingNumber: "SS-2025-000007",
      status: "DELIVERED",
      senderName: "Anna Petrova",
      senderEmail: "a.petrova@example.com",
      senderPhone: "+7-495-123-4567",
      senderAddress: "25 Tverskaya Street",
      senderCity: "Moscow",
      senderCountry: "Russia",
      receiverName: "Carlos Mendoza",
      receiverEmail: "c.mendoza@example.com",
      receiverPhone: "+52-55-1234-5678",
      receiverAddress: "Av. Reforma 222",
      receiverCity: "Mexico City",
      receiverCountry: "Mexico",
      packageDescription: "Chemical samples - temperature controlled",
      weight: 8.5,
      weightUnit: "kg",
      serviceType: "EXPRESS_COURIER",
      shipmentMode: "INTERNATIONAL",
      shipDate: new Date("2025-01-20"),
      estimatedDelivery: new Date("2025-01-23"),
      actualDelivery: new Date("2025-01-22"),
    },
    {
      trackingNumber: "SS-2025-000008",
      status: "ON_HOLD",
      senderName: "Patricia Anderson",
      senderEmail: "p.anderson@example.com",
      senderPhone: "+1-555-0108",
      senderAddress: "600 Congress Avenue",
      senderCity: "Austin",
      senderCountry: "United States",
      receiverName: "Ahmed Hassan",
      receiverEmail: "a.hassan@example.com",
      receiverPhone: "+971-4-123-4567",
      receiverAddress: "Sheikh Zayed Road, Tower B",
      receiverCity: "Dubai",
      receiverCountry: "United Arab Emirates",
      packageDescription: "IT hardware - 15 boxes",
      weight: 150.0,
      weightUnit: "kg",
      serviceType: "AIR_FREIGHT",
      shipmentMode: "INTERNATIONAL",
      shipDate: new Date("2025-02-03"),
      estimatedDelivery: new Date("2025-02-08"),
      actualDelivery: null,
    },
    {
      trackingNumber: "SS-2025-000009",
      status: "RETURNED",
      senderName: "Kevin O'Brien",
      senderEmail: "k.obrien@example.com",
      senderPhone: "+1-555-0109",
      senderAddress: "42 Warehouse Lane",
      senderCity: "Seattle",
      senderCountry: "United States",
      receiverName: "Yuki Nakamura",
      receiverEmail: "y.nakamura@example.com",
      receiverPhone: "+81-6-1234-5678",
      receiverAddress: "1-1 Umeda, Kita-ku",
      receiverCity: "Osaka",
      receiverCountry: "Japan",
      packageDescription: "Fragile glassware - 4 cartons",
      weight: 22.0,
      weightUnit: "kg",
      serviceType: "AIR_FREIGHT",
      shipmentMode: "INTERNATIONAL",
      shipDate: new Date("2025-01-25"),
      estimatedDelivery: new Date("2025-01-30"),
      actualDelivery: null,
    },
    {
      trackingNumber: "SS-2025-000010",
      status: "IN_TRANSIT",
      senderName: "Rachel Green",
      senderEmail: "r.green@example.com",
      senderPhone: "+1-555-0110",
      senderAddress: "300 Logistics Parkway",
      senderCity: "Atlanta",
      senderCountry: "United States",
      receiverName: "Thomas Martin",
      receiverEmail: "t.martin@example.com",
      receiverPhone: "+1-555-0111",
      receiverAddress: "75 Distribution Drive",
      receiverCity: "Denver",
      receiverCountry: "United States",
      packageDescription: "Household furniture - 1 container",
      weight: 500.0,
      weightUnit: "kg",
      serviceType: "SOC_MOVEMENT",
      shipmentMode: "DOMESTIC",
      shipDate: new Date("2025-02-07"),
      estimatedDelivery: new Date("2025-02-14"),
      actualDelivery: null,
    },
  ];

  const trackingEventsMap: Record<string, { location: string; status: string; description: string; timestamp: Date }[]> = {
    "SS-2025-000001": [
      { location: "New York, US", status: "Picked Up", description: "Package collected from sender", timestamp: new Date("2025-01-10T09:00:00Z") },
      { location: "JFK Airport, New York", status: "In Transit", description: "Departed origin facility", timestamp: new Date("2025-01-10T18:00:00Z") },
      { location: "Heathrow Airport, London", status: "In Transit", description: "Arrived at destination country", timestamp: new Date("2025-01-11T06:00:00Z") },
      { location: "London Customs, UK", status: "In Customs", description: "Cleared customs inspection", timestamp: new Date("2025-01-12T10:00:00Z") },
      { location: "London, UK", status: "Delivered", description: "Package delivered to recipient", timestamp: new Date("2025-01-14T14:30:00Z") },
    ],
    "SS-2025-000002": [
      { location: "Miami, US", status: "Picked Up", description: "Cargo received at port warehouse", timestamp: new Date("2025-02-01T08:00:00Z") },
      { location: "Port of Miami, US", status: "In Transit", description: "Loaded onto vessel MV Atlantic Star", timestamp: new Date("2025-02-03T06:00:00Z") },
      { location: "Atlantic Ocean", status: "In Transit", description: "Vessel en route to Hamburg", timestamp: new Date("2025-02-10T12:00:00Z") },
    ],
    "SS-2025-000003": [
      { location: "San Francisco, US", status: "Pending", description: "Shipment registered, awaiting pickup", timestamp: new Date("2025-02-15T10:00:00Z") },
      { location: "San Francisco, US", status: "Pending", description: "Pickup scheduled for Feb 16", timestamp: new Date("2025-02-15T10:30:00Z") },
    ],
    "SS-2025-000004": [
      { location: "Paris, France", status: "Picked Up", description: "Package collected from sender", timestamp: new Date("2025-02-05T09:00:00Z") },
      { location: "CDG Airport, Paris", status: "In Transit", description: "Departed Paris via Air France cargo", timestamp: new Date("2025-02-05T22:00:00Z") },
      { location: "JFK Airport, New York", status: "In Transit", description: "Arrived at JFK International", timestamp: new Date("2025-02-06T04:00:00Z") },
      { location: "US Customs, JFK", status: "In Customs", description: "Undergoing customs inspection - documentation review", timestamp: new Date("2025-02-06T08:00:00Z") },
    ],
    "SS-2025-000005": [
      { location: "Chicago, US", status: "Picked Up", description: "Crates loaded onto truck", timestamp: new Date("2025-02-08T07:00:00Z") },
      { location: "St. Louis, US", status: "In Transit", description: "In transit - rest stop", timestamp: new Date("2025-02-08T18:00:00Z") },
      { location: "Oklahoma City, US", status: "In Transit", description: "Passed through Oklahoma City hub", timestamp: new Date("2025-02-09T10:00:00Z") },
      { location: "Dallas, US", status: "Out for Delivery", description: "Out for delivery to recipient", timestamp: new Date("2025-02-10T08:00:00Z") },
    ],
    "SS-2025-000006": [
      { location: "Los Angeles, US", status: "Picked Up", description: "Pallets collected from warehouse", timestamp: new Date("2025-02-10T11:00:00Z") },
      { location: "Port of Los Angeles, US", status: "Picked Up", description: "Cargo received at port facility, awaiting vessel", timestamp: new Date("2025-02-10T16:00:00Z") },
    ],
    "SS-2025-000007": [
      { location: "Moscow, Russia", status: "Picked Up", description: "Express courier collected package", timestamp: new Date("2025-01-20T08:00:00Z") },
      { location: "Sheremetyevo Airport, Moscow", status: "In Transit", description: "Departed Moscow", timestamp: new Date("2025-01-20T14:00:00Z") },
      { location: "Amsterdam Schiphol, Netherlands", status: "In Transit", description: "Transit hub - connecting flight", timestamp: new Date("2025-01-20T18:00:00Z") },
      { location: "Mexico City Airport, Mexico", status: "In Customs", description: "Cleared Mexican customs", timestamp: new Date("2025-01-21T20:00:00Z") },
      { location: "Mexico City, Mexico", status: "Delivered", description: "Delivered to recipient - signed by C. Mendoza", timestamp: new Date("2025-01-22T11:00:00Z") },
    ],
    "SS-2025-000008": [
      { location: "Austin, US", status: "Picked Up", description: "Boxes collected from sender", timestamp: new Date("2025-02-03T10:00:00Z") },
      { location: "DFW Airport, Dallas", status: "In Transit", description: "Arrived at hub airport", timestamp: new Date("2025-02-03T18:00:00Z") },
      { location: "DFW Airport, Dallas", status: "On Hold", description: "Shipment placed on hold - incomplete export documentation", timestamp: new Date("2025-02-04T09:00:00Z") },
    ],
    "SS-2025-000009": [
      { location: "Seattle, US", status: "Picked Up", description: "Fragile cargo collected with special handling", timestamp: new Date("2025-01-25T09:00:00Z") },
      { location: "Sea-Tac Airport, Seattle", status: "In Transit", description: "Departed Seattle", timestamp: new Date("2025-01-25T20:00:00Z") },
      { location: "Kansai Airport, Osaka", status: "In Transit", description: "Arrived in Osaka", timestamp: new Date("2025-01-27T06:00:00Z") },
      { location: "Osaka Customs, Japan", status: "In Customs", description: "Held for inspection - incorrect HS code", timestamp: new Date("2025-01-27T14:00:00Z") },
      { location: "Kansai Airport, Osaka", status: "Returned", description: "Shipment rejected - returning to origin", timestamp: new Date("2025-01-29T10:00:00Z") },
    ],
    "SS-2025-000010": [
      { location: "Atlanta, US", status: "Picked Up", description: "Container loaded and sealed", timestamp: new Date("2025-02-07T07:00:00Z") },
      { location: "Chattanooga, US", status: "In Transit", description: "Passed through Chattanooga depot", timestamp: new Date("2025-02-07T14:00:00Z") },
      { location: "Nashville, US", status: "In Transit", description: "In transit via I-40 West", timestamp: new Date("2025-02-08T06:00:00Z") },
    ],
  };

  for (const data of shipmentData) {
    const shipment = await prisma.shipment.upsert({
      where: { trackingNumber: data.trackingNumber },
      update: {},
      create: data,
    });

    const events = trackingEventsMap[data.trackingNumber] || [];
    for (const event of events) {
      await prisma.trackingEvent.create({
        data: {
          shipmentId: shipment.id,
          location: event.location,
          status: event.status,
          description: event.description,
          timestamp: event.timestamp,
        },
      });
    }

    console.log(`Created shipment: ${data.trackingNumber} with ${events.length} tracking events`);
  }

  // --- Sample Contact Submissions ---
  const contactData = [
    {
      name: "Jennifer Lee",
      email: "jennifer.lee@example.com",
      phone: "+1-555-0201",
      subject: "International Shipping Inquiry",
      message: "I need to ship a large consignment of electronics from New York to Seoul, South Korea. Could you provide a quote for air freight and ocean freight options? The total weight is approximately 500kg.",
      isRead: true,
    },
    {
      name: "Mark Thompson",
      email: "mark.t@example.com",
      phone: "+1-555-0202",
      subject: "Customs Clearance Help",
      message: "We are importing industrial machinery from Germany and need assistance with customs clearance documentation. Can you assign an importer's representative to handle our case?",
      isRead: true,
    },
    {
      name: "Sandra Williams",
      email: "sandra.w@example.com",
      phone: null,
      subject: "Domestic Moving Quote",
      message: "I am relocating my household goods from Chicago to Phoenix. Looking for a reliable moving service. We have roughly 3 bedrooms worth of furniture and personal items.",
      isRead: false,
    },
    {
      name: "David Kim",
      email: "david.kim@example.com",
      phone: "+1-555-0204",
      subject: "Freight Forwarding Services",
      message: "Our company needs a freight forwarding partner for regular shipments between our US and European offices. We ship approximately 20 pallets monthly. Please send us your rate card.",
      isRead: false,
    },
    {
      name: "Lisa Martinez",
      email: "lisa.m@example.com",
      phone: "+1-555-0205",
      subject: "SOC Container Inquiry",
      message: "We own several shipping containers and need SOC movement services from the port of Long Beach to our warehouse in Riverside, CA. Can you handle SOC movements?",
      isRead: false,
    },
  ];

  for (const data of contactData) {
    await prisma.contactSubmission.create({ data });
    console.log(`Created contact submission from: ${data.name}`);
  }

  console.log("\nDatabase seeding completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
