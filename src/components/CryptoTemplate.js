import { useEffect, useState } from "react";
import "../ComponentsStyles/screenerTemplate.css";
import { useNavigate } from "react-router-dom";

export default function ScreenerTemplate() {
    const navigate = useNavigate();

    const [cryptoPairs, setCryptoPairs] = useState([]);
    const [selectedSymbol, setSelectedSymbol] = useState("");
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [results, setResults] = useState(null);

    /* ----------------------------------------
       Fetch crypto pairs from Kraken
    -----------------------------------------*/
    useEffect(() => {
        fetch("https://api.kraken.com/0/public/AssetPairs")
            .then(res => res.json())
            .then(data => {
                const pairs = Object.keys(data.result)
                    .sort();
                setCryptoPairs(pairs);
            })
            .catch(err => console.error(err));
    }, []);

    /* ----------------------------------------
       Handle filter checkbox toggle
    -----------------------------------------*/
    function toggleFilter(filter) {
        setSelectedFilters(prev =>
            prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    }

    /* ----------------------------------------
       Submit screener request
    -----------------------------------------*/
    function handleSubmit(e) {
        e.preventDefault();

        const token = sessionStorage.getItem("token");

        fetch("http://localhost:5000/crypto/screener", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                symbol: selectedSymbol,
                filters: selectedFilters
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.msg) {
                    alert("You're not logged in!");
                    navigate("/login");
                } else {
                    setResults(data.results);
                }
            });
    }

    return (
        <div className="template">
            <h1>Crypto Screener</h1>

            {/* ---------------- Crypto selector ---------------- */}
            <label>Select Crypto Pair</label>
            <select
                value={selectedSymbol}
                onChange={e => setSelectedSymbol(e.target.value)}
            >
                <option value="">-- Choose a pair --</option>
                {cryptoPairs.map(pair => (
                    <option key={pair} value={pair}>
                        {pair}
                    </option>
                ))}
            </select>

            {/* ---------------- Filters ---------------- */}
            <div className="filters">
                <label>
                    <input
                        type="checkbox"
                        onChange={() => toggleFilter("trend")}
                    />
                    Price above SMA (Trend)
                </label>

                <label>
                    <input
                        type="checkbox"
                        onChange={() => toggleFilter("volume")}
                    />
                    Volume Spike
                </label>

                <label>
                    <input
                        type="checkbox"
                        onChange={() => toggleFilter("volatility")}
                    />
                    Volatility Expansion
                </label>

                <label>
                    <input
                        type="checkbox"
                        onChange={() => toggleFilter("orderbook")}
                    />
                    Order Book Imbalance
                </label>

                <label>
                    <input
                        type="checkbox"
                        onChange={() => toggleFilter("spread")}
                    />
                    Tight Spread (Liquidity)
                </label>
            </div>

            <button
                className="filter-btn"
                disabled={!selectedSymbol || selectedFilters.length === 0}
                onClick={handleSubmit}
            >
                Run Crypto Screener
            </button>

            {/* ---------------- Results ---------------- */}
            {results && (
                <div className="results">
                    <h3>Results for {selectedSymbol}</h3>
                    <ul>
                        {Object.entries(results).map(([filter, value]) => (
                            <li key={filter}>
                                {filter}:{" "}
                                <strong>
                                    {typeof value === "boolean"
                                        ? value ? "PASS ✅" : "FAIL ❌"
                                        : value}
                                </strong>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
