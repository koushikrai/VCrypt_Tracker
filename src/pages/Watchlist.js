import React, { useEffect, useState, useCallback, useMemo } from "react";
import Button from "../components/Common/Button";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import { get100Coins } from "../functions/get100Coins";

function Watchlist() {
  // Using useMemo to prevent re-computation on every render
  const watchlist = useMemo(() => JSON.parse(localStorage.getItem("watchlist")) || [], []);

  const [coins, setCoins] = useState([]);

  const getData = useCallback(async () => {
    const allCoins = await get100Coins();
    if (allCoins) {
      setCoins(allCoins.filter((coin) => watchlist.includes(coin.id)));
    }
  }, [watchlist]); // Now, watchlist is stable and doesn't change on every render

  useEffect(() => {
    if (watchlist.length > 0) {
      getData();
    }
  }, [getData, watchlist]); // Dependencies are stable, so no extra renders

  return (
    <div>
      <Header />
      {watchlist?.length > 0 ? (
        <TabsComponent coins={coins} />
      ) : (
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, No Items In The Watchlist.
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
      )}
    </div>
  );
}

export default Watchlist;
