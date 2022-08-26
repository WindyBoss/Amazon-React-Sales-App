import { useContext, useState, useEffect } from "react";
import { NavLink, useParams, Outlet, useLocation } from "react-router-dom";
import dataMonths from "./../../data/month.json";

import MonthBarChart from "./components/MonthBarChart";

import { authContext } from "../../context/authContext";
import setTimeDate from "../../helpers/setTimeDate";

import { countSumDate } from "../../helpers/countSum";

import months from "../../data/month.json";
import { useMemo } from "react";

console.log(months);

export default function SKUMonthSales() {
  const params = useParams();
  const data = useContext(authContext);
  const location = useLocation();

  const [currentYearMonthData, setCurrentYearMonthData] = useState([]);
  const [lastYearMonthData, setLastYearMonthData] = useState([]);

  // const findLastDay = useMemo(() => {
  //   if(!params.monthId) {
  //     return;
  //   };

  //   return months.months.filter(
  //     (month) => month.id === Number(params.monthId)
  //   )[0].lastDay;
  // }, [params.monthId]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { minParsed, maxParsed } = setTimeDate(
      `01.0${params.monthId}.2022`,
      `${
        months.months.filter((month) => month.id === Number(params.monthId))[0]
          .lastDay
      }.0${params.monthId}.2022`
    );
    // setCurrentYearMonthData(
    //   countSumDate(data, maxParsed, minParsed, "quantity", params.skuId)
    // );
  }, [data, params]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { minParsed, maxParsed } = setTimeDate(
      `01.0${params.monthId}.2021`,
      `${
        months.months.filter((month) => month.id === Number(params.monthId))[0]
          .lastDay
      }.0${params.monthId}.2021`
    );
    // setLastYearMonthData(
    //   countSumDate(data, maxParsed, minParsed, "quantity", params.skuId)
    // );
  }, [data, params]);

  return (
    <>
      <MonthBarChart
        data={[
          {
            uv: lastYearMonthData,
            name: `${
              months.months.filter(
                (month) => month.id === Number(params.monthId)
              )[0].name
            }/2021`,
          },
          {
            uv: currentYearMonthData,
            name: `${
              months.months.filter(
                (month) => month.id === Number(params.monthId)
              )[0].name
            }/2022`,
          },
        ]}
      />
    </>
  );
}
