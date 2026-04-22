import { NextRequest, NextResponse } from "next/server";

const GHL_BUSINESS_TYPE_FIELD_ID = "business_type";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, businessType } = body;

    const contactData = {
      firstName,
      lastName,
      name: `${firstName} ${lastName}`.trim(),
      email,
      locationId: "0FS1VjeNDhjfvVfG4d4x",
      source: "TalentMucho",
      tags: ["claude-for-business"],
      ...(businessType && {
        customFields: [
          {
            id: GHL_BUSINESS_TYPE_FIELD_ID,
            value: businessType,
          },
        ],
      }),
    };

    const ghlResponse = await fetch(`${process.env.GHL_BASE_URL}contacts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Version: "2021-07-28",
        Authorization: `Bearer ${process.env.GHL_TOKEN}`,
      },
      body: JSON.stringify(contactData),
    });

    const responseData = await ghlResponse.json();

    if (!ghlResponse.ok) {
      console.error("GHL API Error:", responseData);

      if (
        responseData.statusCode === 400 &&
        responseData.message?.includes("duplicated contacts")
      ) {
        return NextResponse.json(
          {
            error: "duplicate",
            message: "You are already registered. Check your inbox for the Zoom link.",
            contactId: responseData.meta?.contactId,
          },
          { status: 400 },
        );
      }

      return NextResponse.json(
        { error: "Failed to create contact", details: responseData },
        { status: ghlResponse.status },
      );
    }

    return NextResponse.json({ success: true, data: responseData });
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
