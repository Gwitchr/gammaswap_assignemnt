import { useState, FormEvent } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Container, Card, Col, Button } from "components/atoms";
import { Input, Range } from "components/atoms/forms";
import { Dropdown } from "components/molecules";
const CandleChart = dynamic(() => import("components/organisms/CandleChart.ui"), { ssr: false });
import data from "constants/chart_data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave, faCloudRain, faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { currencyFormat } from "utils/currency";
import useSWR from "swr";
import { fetcher } from "utils/fetcher";

const positions = [
  {
    label: "call",
  },
  {
    label: "pull",
  },
  {
    label: "straddle",
  },
];

const calcEarnings = (amount: number, rate: number): number => {
  return Math.ceil(+amount + +amount * +rate);
};

const calcInvest = (amount: number, rate: number): number => {
  return Math.ceil(+amount / (1 / +rate));
};

const rate = 0.15;
const collateralRate = 0.95;
const feeRate = 0.05;

export default function App() {
  const {
    data: serverData,
    error,
    isLoading,
  } = useSWR("/api/data", fetcher, {
    refreshInterval: 10000,
  });

  const [selPos, setSelPos] = useState(positions[0].label);
  const [pay, setPay] = useState<number | string>(0);
  const [positionVal, setPositionVal] = useState<number | string>(0);
  const [leverage, setLeverage] = useState<number | string>(0);

  const collateralAmount = currencyFormat.format(+pay * collateralRate);
  const borrowFee = currencyFormat.format(+pay * feeRate);
  const pnl = currencyFormat.format(+pay + +positionVal * +leverage);

  const handlePositionVal = (val: number | string) => {
    setPositionVal(val);
    setPay(calcEarnings(+val, rate));
  };

  const handleSetPay = (val: number | string) => {
    setPositionVal(calcInvest(+val, rate));
    setPay(val);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("???? Profit!");
  };

  return (
    <>
      <Head>
        <title>GammaSwap - Oracle-Free Volatility DEX</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container fluid className=" bg-gradient-to-br from-slate-300 to-blue-700 min-h-screen">
          <Container className=" grid grid-cols-12 gap-2 text-slate-200">
            <Col className="col-span-12 md:col-span-4 space-y-2">
              <Card small className="flex justify-start space-x-2 items-center relative z-10">
                <Dropdown buttonContent={"Position"} closeOnClick>
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownInformationButton"
                  >
                    {positions.map(({ label }) => (
                      <li key={label}>
                        <button
                          onClick={() => setSelPos(label)}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white capitalize w-full"
                        >
                          {label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </Dropdown>
                <h3 className="font-bold text-lg capitalize">{selPos}</h3>
              </Card>
              <Card className="flex justify-start flex-col space-x-1 items-center z-10">
                <form className="w-full" onSubmit={handleSubmit}>
                  <Input
                    id="pay"
                    type="number"
                    label="Pay"
                    placeholder="0.0"
                    controller={[pay, handleSetPay]}
                    icon={faMoneyBillWave}
                  />
                  <Input
                    id={selPos}
                    type="number"
                    label={selPos}
                    placeholder="0.0"
                    controller={[positionVal, handlePositionVal]}
                    icon={faSackDollar}
                    labelClassName="capitalize"
                  />
                  <Range label="Leverage" id="leverage" controller={[leverage, setLeverage]} />
                  <div className="w-full bg-gray-900/30 my-6 rounded-sm space-y-4 p-4 divide-y divide-gray-100">
                    <div className="flex  justify-between items-end">
                      <h5 className="text-sm font-bold">Leverage</h5>
                      <p className="">{leverage}</p>
                    </div>

                    <div className="flex  justify-between items-end">
                      <h5 className="text-sm font-bold">PnL</h5>
                      <p className="">{pnl}</p>
                    </div>
                    <div className="flex  justify-between items-end">
                      <h5 className="text-sm font-bold">Borrow fee</h5>
                      <p className="">{borrowFee}</p>
                    </div>
                    <div className="flex  justify-between items-end">
                      <h5 className="text-sm font-bold">Collateral</h5>
                      <p className="">{collateralAmount}</p>
                    </div>
                    <div className="flex  justify-between items-end">
                      <h5 className="text-sm font-bold">Total</h5>
                      <p className="">{currencyFormat.format(+pay + +positionVal)}</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4 flex justify-center" type="submit">
                    Let it rain{" "}
                    <FontAwesomeIcon className="w-4 ml-2" size="sm" icon={faCloudRain} />
                  </Button>
                </form>
              </Card>
            </Col>
            <Col className="col-span-12 md:col-span-8 space-y-4">
              <Card small className="flex justify-start space-x-4">
                <div className="flex flex-col justify-center items-start">
                  <h3 className="font-bold text-lg">ETH/USD</h3>
                </div>
                <div className="flex flex-col justify-center items-start">
                  <h5 className="text-sm">Change</h5>
                  <p className="">{currencyFormat.format(20.7)}</p>
                </div>
                <div className="flex flex-col justify-center items-start">
                  <h5 className="text-sm">High</h5>
                  <p className="">{currencyFormat.format(27.44)}</p>
                </div>
                <div className="flex flex-col justify-center items-start">
                  <h5 className="text-sm">Low</h5>
                  <p className="">{currencyFormat.format(12.98)}</p>
                </div>
              </Card>
              <Card small className="h-72 relative">
                <CandleChart
                  data={
                    !error && !isLoading && serverData?.klines?.length ? serverData?.klines : data
                  }
                />
              </Card>
            </Col>
          </Container>
        </Container>
      </main>
    </>
  );
}
