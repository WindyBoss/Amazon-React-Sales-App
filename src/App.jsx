import React from "react";

import { Routes, Route, NavLink } from "react-router-dom";

import AppBar from "./components/AppBar";

import SalesPerSKU from "./pages/SalesPerSKU";
import SKU from "./pages/SKU";
import SKUMonthSales from "./pages/SKUMonthSales";
import AddData from "./pages/AddData/AddData";
import Total from "./pages/Total";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppBar />}>
          <Route path="publish" element={<AddData />} />
          <Route path="totalSales" element={<Total />} />

          <Route path="salesPerSKU" element={<SalesPerSKU />} />
          <Route path="salesPerSKU/:skuId" element={<SKU />}>
            {/* <Route path=":skuId" element={<SKU />}>
              <Route path=":monthId" element={<SKUMonthSales />} />
            </Route> */}
          </Route>
        </Route>
      </Routes>
    </>
  );
}
