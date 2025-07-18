"use server";

export async function getRunsByUseCaseIdAction(useCaseId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HAPPYROBOT_BASE}/runs?use_case_id=${useCaseId}`,
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
