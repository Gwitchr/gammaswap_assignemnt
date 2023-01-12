import type { NextApiResponse, NextApiRequest } from "next";

export const binance = `https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1m&limit=1000`;

console.log(`${process.env.BIN_KEY !== undefined && process.env.BIN_KEY?.length} ⚠️`);

export const getCryptoData = async () => {
  const string = binance;
  try {
    const result = await fetch(string, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-MBX-APIKEY": process.env.BIN_KEY || "",
      },
    }).then((r) => r.json());
    return result;
  } catch (e) {
    console.warn(e);
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //const { query } = req;

  if (req.method === "GET") {
    try {
      const data = await getCryptoData();
      const klines = data.map((el: string[]) => ({
        time: +el[0],
        open: +el[1],
        high: +el[2],
        low: +el[3],
        close: +el[4],
      }));
      res.json({ klines, key: process.env.BIN_KEY !== undefined && process.env.BIN_KEY?.length });
    } catch (error) {
      res.json(error);
    }
  }
}
