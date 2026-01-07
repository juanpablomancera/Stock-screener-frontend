import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    FormControlLabel,
    Button,
    Stack,
    Divider,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CryptoTemplate() {
    const navigate = useNavigate();

    const [cryptoPairs, setCryptoPairs] = useState([]);
    const [selectedSymbol, setSelectedSymbol] = useState("");
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [results, setResults] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const IMPORTANT_BASES = [
        "XBT", "ETH", "SOL", "ADA", "AVAX",
        "DOT", "LINK", "MATIC", "ATOM", "LTC",
        "XRP", "BCH", "UNI", "AAVE"
    ];

    const IMPORTANT_QUOTES = ["USD", "USDT", "EUR"];

    useEffect(() => {
        fetch("https://api.kraken.com/0/public/AssetPairs")
            .then(res => res.json())
            .then(data => {
                const pairs = Object.values(data.result)
                    .map(pair => {
                        // Normalize base/quote for whitelist
                        let base = pair.base.replace(/^X/, "");
                        let quote = pair.quote.replace(/^Z/, "");
                        return `${base}/${quote}`;
                    })
                    .filter(name => {
                        const [base, quote] = name.split("/");
                        return IMPORTANT_BASES.includes(base) && IMPORTANT_QUOTES.includes(quote);
                    })
                    .sort((a, b) => a.localeCompare(b));

                setCryptoPairs(pairs);
            })
            .catch(err => console.error("Kraken fetch error:", err));
    }, []);

    function toggleFilter(filter) {
        setSelectedFilters(prev =>
            prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    }

    // Request
    function handleSubmit(e) {
        e.preventDefault();
        const token = sessionStorage.getItem("token");

        // If token missing, show modal
        if (!token) {
            setShowLoginModal(true);
            return;
        }

        fetch("http://localhost:5000/crypto/screener", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
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
                    // Token expired
                    setShowLoginModal(true);
                } else {
                    setResults(data.results);
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <Box display="flex" justifyContent="center" mt={6} mb={6}>
            <Card sx={{ width: 420 }}>
                <CardContent>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Crypto Screener
                    </Typography>

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Crypto Pair</InputLabel>
                        <Select
                            value={selectedSymbol}
                            label="Crypto Pair"
                            onChange={e => setSelectedSymbol(e.target.value)}
                        >
                            {cryptoPairs.map(pair => (
                                <MenuItem key={pair} value={pair}>
                                    {pair}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="subtitle1" fontWeight="bold">
                        Filters
                    </Typography>

                    <Stack>
                        {[
                            ["trend", "Price above SMA"],
                            ["volume", "Volume Spike"],
                            ["volatility", "Volatility Expansion"],
                            ["orderbook", "Order Book Imbalance"],
                            ["spread", "Tight Spread"]
                        ].map(([key, label]) => (
                            <FormControlLabel
                                key={key}
                                control={<Checkbox onChange={() => toggleFilter(key)} />}
                                label={label}
                            />
                        ))}
                    </Stack>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                        disabled={!selectedSymbol || selectedFilters.length === 0}
                        onClick={handleSubmit}
                    >
                        Run Screener
                    </Button>

                    {results && (
                        <>
                            <Divider sx={{ my: 3 }} />
                            <Typography fontWeight="bold">
                                Results – {selectedSymbol}
                            </Typography>

                            <Stack spacing={1} mt={2}>
                                {Object.entries(results).map(([filter, value]) => (
                                    <Chip
                                        key={filter}
                                        label={`${filter}: ${
                                            value === true
                                                ? "PASS"
                                                : value === false
                                                    ? "FAIL"
                                                    : value
                                        }`}
                                        color={value === true ? "success" : "default"}
                                    />
                                ))}
                            </Stack>
                        </>
                    )}

                    {/* Not logged modal */}
                    <Dialog
                        open={showLoginModal}
                        onClose={() => setShowLoginModal(false)}
                    >
                        <DialogTitle>Not Logged In</DialogTitle>
                        <DialogContent>
                            <Typography>
                                You are not logged in or your session has expired.
                                Please log in to use the Crypto Screener.
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => {
                                    setShowLoginModal(false);
                                    navigate("/login");
                                }}
                                variant="contained"
                                color="primary"
                            >
                                Go to Login
                            </Button>
                            <Button onClick={() => setShowLoginModal(false)}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </CardContent>
            </Card>
        <Card sx={{ m: 6 }}>
            <h1 sx={{ m: 6 }}>Some text</h1>
        </Card>
        </Box>
    );
}
