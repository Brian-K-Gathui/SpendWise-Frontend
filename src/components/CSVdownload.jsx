import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Papa from "papaparse";

const DataDownload = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const downloadCSV = () => {
    const csvData = data.map((item) => ({
      id: item.id,
      wallet_id: item.wallet_id,
      category_id: item.category_id,
      amount: item.amount,
      type: item.type,
      description: item.description,
      date: item.date,
      is_recurring: item.is_recurring,
      recurring_interval: item.recurring_interval,
      created_by: item.created_by,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Download Transactions</h2>
      <Button onClick={downloadCSV} className="bg-blue-500 text-white px-4 py-2 rounded">
        CSV
      </Button>
    </div>
  );
};

export default DataDownload;
