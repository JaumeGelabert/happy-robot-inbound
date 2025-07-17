import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const carrier_number = searchParams.get("carrier_number");

    if (!carrier_number) {
      return NextResponse.json(
        { error: "Carrier number is required" },
        { status: 400 }
      );
    }

    const BASE_URL = "https://mobile.fmcsa.dot.gov/qc/services/carriers/";
    const FMCSA_WEB_KEY = process.env.FMCSA_WEB_KEY;

    const response = await fetch(
      `${BASE_URL}${carrier_number}?webKey=${FMCSA_WEB_KEY}`
    );

    const data = await response.json();

    if (!data.content || !data.content.carrier) {
      return NextResponse.json(
        {
          allowed: false,
          error: `Carrier not found for ${carrier_number}.`
        },
        { status: 404 }
      );
    }

    const allowed = data.content.carrier.allowedToOperate === "Y";
    return NextResponse.json({ allowed, error: null });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
