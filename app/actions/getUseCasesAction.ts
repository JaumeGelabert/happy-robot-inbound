"use server";

export async function getUseCasesAction() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HAPPYROBOT_BASE}/use-cases`,
      {
        headers: {
          Authorization: `Bearer ${process.env.HAPPYROBOT_API_KEY}`,
          "x-organization-id": process.env.HAPPYROBOT_ORG_ID!
        }
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
