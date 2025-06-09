import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Info from "../components/CoinPage/Info";
import LineChart from "../components/CoinPage/LineChart";
import SelectDays from "../components/CoinPage/SelectDays";
import ToggleComponents from "../components/CoinPage/ToggleComponent";
import Button from "../components/Common/Button";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import List from "../components/Dashboard/List";
import { getCoinData } from "../functions/getCoinData";
import { getPrices } from "../functions/getPrices";
import { settingChartData } from "../functions/settingChartData";
import { settingCoinObject } from "../functions/settingCoinObject";

function Coin() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({ labels: [], datasets: [{}] });
  const [coin, setCoin] = useState({});
  const [days, setDays] = useState(30);
  const [priceType, setPriceType] = useState("prices");

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const coinData = await getCoinData(id, setError);
      console.log("Coin DATA >>>>", coinData);

      if (!coinData || !coinData.id) {
        setError(true);
        return;
      }

      settingCoinObject(coinData, setCoin);

      const prices = await getPrices(id, days, priceType, setError);
      if (prices) {
        settingChartData(setChartData, prices);
      }
    } catch (err) {
      console.error("Error fetching coin data:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [id, days, priceType]);

  useEffect(() => {
    if (id) getData();
  }, [id, getData]);

  const handleDaysChange = async (event) => {
    const value = event.target.value;
    setLoading(true);
    setDays(value);
    const prices = await getPrices(id, value, priceType, setError);
    if (prices) {
      settingChartData(setChartData, prices);
    }
    setLoading(false);
  };

  const handlePriceTypeChange = async (event) => {
    const value = event.target.value;
    setLoading(true);
    setPriceType(value);
    const prices = await getPrices(id, days, value, setError);
    if (prices) {
      settingChartData(setChartData, prices);
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      {!error && !loading && coin.id ? (
        <>
          <div className="grey-wrapper">
            <List coin={coin} delay={0.5} />
          </div>
          <div className="grey-wrapper">
            <SelectDays handleDaysChange={handleDaysChange} days={days} />
            <ToggleComponents
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <LineChart chartData={chartData} />
          </div>
          <Info title={coin.name} desc={coin.desc} />
        </>
      ) : error ? (
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, couldn't find the coin you're looking for 😞
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <a href="/dashboard">
              <Button text="Dashboard" />
            </a>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Coin;
