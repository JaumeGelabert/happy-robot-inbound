"use server";

export async function getRunByRunIdAction(runId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_HAPPYROBOT_BASE}/runs/${runId}`, {
    headers: {
      Authorization: `Bearer ${process.env.HAPPYROBOT_API_KEY}`,
      "x-organization-id": process.env.HAPPYROBOT_ORG_ID!
    }
  });
  const data = await response.json();
  return data;
}