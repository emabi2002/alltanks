// src/utils/exportToCSV.ts

export function exportOrdersToCSV(orders: any[]) {
  if (!orders || orders.length === 0) {
    alert("No orders to export.");
    return;
  }

  const headers = Object.keys(orders[0]);
  const csvRows = [
    headers.join(","), // header row
    ...orders.map(order =>
      headers.map(header => JSON.stringify(order[header], (_, value) => value ?? "")).join(",")
    )
  ];

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "orders.csv";
  a.click();
  window.URL.revokeObjectURL(url);
}
