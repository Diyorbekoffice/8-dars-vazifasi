import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { SwapHoriz, Send, ShowChart, Notifications } from "@mui/icons-material";
import axios from "axios";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [result, setResult] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const currencies = {
    USD: { label: "USD - US Dollar", flag: "🇺🇸" },
    EUR: { label: "EUR - Euro", flag: "🇪🇺" },
    GBP: { label: "GBP - British Pound", flag: "🇬🇧" },
    JPY: { label: "JPY - Japanese Yen", flag: "🇯🇵" },
    AUD: { label: "AUD - Australian Dollar", flag: "🇦🇺" },
    CAD: { label: "CAD - Canadian Dollar", flag: "🇨🇦" },
    CHF: { label: "CHF - Swiss Franc", flag: "🇨🇭" },
    CNY: { label: "CNY - Chinese Yuan", flag: "🇨🇳" },
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const fetchExchangeRate = async () => {
    try {
      const response = await axios.get(
        `https://api.apilayer.com/exchangerates_data/latest?base=${fromCurrency}&symbols=${toCurrency}`,
        {
          headers: {
            apikey: "YOUR_API_KEY", 
          },
        }
      );
      const rate = response.data.rates[toCurrency];
      setExchangeRate(rate);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    setResult((amount * exchangeRate).toFixed(2));
  }, [amount, exchangeRate]);

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        maxWidth: 500,
        margin: "auto",
      }}
    >
      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        centered
        textColor="inherit"
        TabIndicatorProps={{ style: { backgroundColor: "#1A73E8" } }}
        sx={{
          "& .MuiTab-root": {
            minWidth: 100,
            fontWeight: 500,
            textTransform: "none",
          },
          "& .Mui-selected": { color: "#1A73E8" },
        }}
      >
        <Tab icon={<SwapHoriz />} label="Convert" />
        <Tab icon={<Send />} label="Send" />
        <Tab icon={<ShowChart />} label="Charts" />
        <Tab icon={<Notifications />} label="Alerts" />
      </Tabs>

      {/* Convert Section */}
      {tabValue === 0 && (
        <Box sx={{ padding: "20px" }}>
          <TextField
            label="Amount"
            variant="outlined"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            sx={{ marginBottom: "20px" }}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />

          <Box display="flex" justifyContent="space-between" mb={2}>
            <TextField
              select
              label="From"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              sx={{ width: "48%" }}
            >
              {Object.keys(currencies).map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currencies[currency].flag} {currencies[currency].label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="To"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              sx={{ width: "48%" }}
            >
              {Object.keys(currencies).map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currencies[currency].flag} {currencies[currency].label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={() => fetchExchangeRate()}
            fullWidth
            sx={{
              marginBottom: "16px",
              backgroundColor: "#1A73E8",
              "&:hover": { backgroundColor: "#1765c4" },
            }}
          >
            Convert
          </Button>

          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {amount} {fromCurrency} = {result} {toCurrency}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CurrencyConverter;
