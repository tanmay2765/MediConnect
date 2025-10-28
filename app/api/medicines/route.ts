import { type NextRequest, NextResponse } from "next/server"
import { createMedicine, getAllMedicines, getAvailableMedicines, getMedicinesByDonor } from "@/lib/db"
import { mergeSortByExpiry } from "@/lib/dsa"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filter = searchParams.get("filter")
    const donorId = searchParams.get("donorId")
    const sort = searchParams.get("sort")

    let medicines = filter === "available" ? getAvailableMedicines() : getAllMedicines()

    if (donorId) {
      medicines = getMedicinesByDonor(donorId)
    }

    if (sort === "expiry") {
      medicines = mergeSortByExpiry(medicines)
    }

    return NextResponse.json({ success: true, data: medicines })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch medicines" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { donorId, name, description, quantity, unit, expiryDate, batchNumber, manufacturer, city, state, pincode } =
      await request.json()

    if (!donorId || !name || !quantity || !expiryDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const medicine = createMedicine({
      donorId,
      name,
      description: description || "",
      quantity,
      unit: unit || "units",
      expiryDate: new Date(expiryDate),
      batchNumber: batchNumber || "",
      manufacturer: manufacturer || "",
      status: "available",
      location: { city, state, pincode },
    })

    return NextResponse.json({ success: true, data: medicine }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create medicine" }, { status: 500 })
  }
}
