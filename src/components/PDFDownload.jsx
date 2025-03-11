import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import "jspdf-autotable";

const DataDownloadPDF = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/transactions") 
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Transactions Report", 14, 10);

    const tableColumn = [
      "ID", "Wallet ID", "Category ID", "Amount", "Type", "Description", "Date",
      "Recurring", "Interval", "Created By", "Created At", "Updated At"
    ];
    
    const tableRows = data.map((item) => [
      item.id,
      item.wallet_id,
      item.category_id,
      item.amount,
      item.type,
      item.description,
      item.date,
      item.is_recurring ? "Yes" : "No",
      item.recurring_interval || "-",
      item.created_by,
      item.created_at,
      item.updated_at
    ]);
    
    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save("transactions.pdf");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Download Transactions</h2>
      <Button onClick={downloadPDF} className="bg-red-500 text-white px-4 py-2 rounded">
        PDF
      </Button>
    </div>
  );
};

export default DataDownloadPDF;