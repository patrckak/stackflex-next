import type { NextApiRequest, NextApiResponse } from "next";

type ReponseType = {
  message: string;
};

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ReponseType>
) {
  res.json({ message: `Olá` });
}
