import type { NextApiResponse, NextApiRequest } from "next";

export const binance = `https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1d&limit=150`;

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
    })
      .then((r) => r.json())
      .catch(console.warn);
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
      const klines: Record<string, string | number>[] = data.map((el: string[]) => {
        const date = new Date(+el[0]);
        const stringDate = `${date.getFullYear()}-${String(+date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(+date.getDate()).padStart(2, "0")}`;
        return {
          time: stringDate,
          open: +el[1],
          high: +el[2],
          low: +el[3],
          close: +el[4],
        };
      });
      res.json({
        klines,
        key: process.env.BIN_KEY !== undefined && process.env.BIN_KEY?.length,
        data,
      });
    } catch (error) {
      res.json({ error, key: process.env.BIN_KEY !== undefined && process.env.BIN_KEY?.length });
    }
  }
}
