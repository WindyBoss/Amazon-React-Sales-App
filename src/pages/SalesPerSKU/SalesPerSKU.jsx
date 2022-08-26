import { useState, useEffect } from 'react';
import { getData } from './../../service/apiService';

import { NavLink, Outlet } from 'react-router-dom';

import { getDataCurrency } from 'service/currencyAPI';

import markets from '../../data/markets.json';
import months from '../../data/month.json';

import { withApiState } from './../../service/stateMachine';

import { useFetch } from './../../hooks/useFetch';
import { useModal } from '../../hooks/useModal';

import Pending from '../../components/Pending';

import SKUTable from './components/SKUTable';
import { useCallback } from 'react';

import MainContainer from 'components/MainContainer';

function createRow(
  sku,
  totalQuantity,
  de,
  fr,
  uk,
  it,
  es,
  nl,
  pl,
  se,
  salesEUR,
  salesPLN
) {
  return {
    sku,
    totalQuantity,
    de,
    fr,
    uk,
    it,
    es,
    nl,
    pl,
    se,
    salesEUR,
    salesPLN,
  };
}

function createHead(markets) {
  const marketsHead = [];

  markets.forEach(market => {
    marketsHead.push({
      id: market.id,
      numeric: true,
      label: market.fullName,
      link: true,
    });
  });

  return [
    {
      id: 'sku',
      numeric: false,
      disablePadding: true,
      label: 'SKU',
      filter: true,
    },
    {
      id: 'totalQuantity',
      numeric: true,
      disablePadding: false,
      label: 'Total Ordered Items',
    },
    ...marketsHead,
  ];
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function SalesPerSKU({ apiState }) {
  const jsonData = useFetch({
    apiState: apiState,
    fetchAPI: getData,
    param: 'skuData',
  });

  const rates = useFetch({
    apiState: apiState,
    fetchAPI: getDataCurrency,
    // param: "currency",
  });

  const [mainData, setMainData] = useState([]);
  const [sort, setSort] = useState('asc');
  const [sortBy, setSortBy] = useState('sku');
  const [tableRows, setTableRows] = useState([]);
  const [filteredTableRows, setFilteredTableRows] = useState([]);
  const [sumUpRow, setSumUpRow] = useState([]);
  const [filteredSumUpRow, setFilteredSumUpRow] = useState([]);
  const [skuFilter, setSkuFilter] = useState('');
  const [hover, setHover] = useState(false);

  const filterByDate = useCallback(
    timePeriod => {
      const rows = [];

      const totalQuantity = [];
      const de = [];
      const fr = [];
      const uk = [];
      const it = [];
      const es = [];
      const nl = [];
      const pl = [];
      const se = [];

      jsonData.forEach(el => {
        const filteredData = el.dayData.filter(timeP => {
          console.log(timeP);
          const timeDate = new Date(
            Number(timeP.id.slice(timeP.id.length > 10 ? 7 : 6, 11)),
            Number(
              months.months.filter(
                m =>
                  m.id ===
                  timeP.id.slice(
                    timeP.id.indexOf('/') + 1,
                    timeP.id.length > 10 ? 6 : 5
                  )
              )[0].month
            ),
            Number(timeP.id.slice(0, timeP.id.indexOf('/')))
          );
          return timeDate >= timePeriod.min && timeDate <= timePeriod.max;
        });

        console.log(filteredData);

        const row = {
          totalQuantity: filteredData.reduce(
            (acc, el) => acc + el.totalQuantity,
            0
          ),
          de: filteredData.reduce(
            (acc, el) => acc + Number(el.markets[0].totalQuantity),
            0
          ),
          fr: filteredData.reduce(
            (acc, el) => acc + Number(el.markets[1].totalQuantity),
            0
          ),
          uk: filteredData.reduce(
            (acc, el) => acc + Number(el.markets[2].totalQuantity),
            0
          ),
          it: filteredData.reduce(
            (acc, el) => acc + Number(el.markets[3].totalQuantity),
            0
          ),
          es: filteredData.reduce(
            (acc, el) => acc + Number(el.markets[4].totalQuantity),
            0
          ),
          nl: filteredData.reduce(
            (acc, el) => acc + Number(el.markets[5].totalQuantity),
            0
          ),
          pl: filteredData.reduce(
            (acc, el) => acc + Number(el.markets[6].totalQuantity),
            0
          ),
          se: filteredData.reduce(
            (acc, el) => acc + Number(el.markets[6].totalQuantity),
            0
          ),
        };

        filteredData.forEach(el => {
          totalQuantity.push(el.totalQuantity);
          de.push(el.markets[0].totalQuantity);
          fr.push(el.markets[1].totalQuantity);
          uk.push(el.markets[2].totalQuantity);
          it.push(el.markets[3].totalQuantity);
          es.push(el.markets[4].totalQuantity);
          nl.push(el.markets[5].totalQuantity);
          pl.push(el.markets[6].totalQuantity);
          se.push(el.markets[7].totalQuantity);
        });

        rows.push(row);
      });

      for (let i = 0; i < rows.length; i++) {
        rows[i].sku = jsonData[i].id;
      }

      const mainRow = setSumRow(totalQuantity, de, fr, uk, it, se, nl, pl, se);

      setFilteredSumUpRow(mainRow);

      setFilteredTableRows(rows);
    },
    [jsonData]
  );

  const resetFilter = useCallback(() => {
    setFilteredTableRows(tableRows);
    setFilteredSumUpRow(sumUpRow);
  }, [sumUpRow, tableRows]);

  const [openSkuFilterModal, toggleFilter] = useModal({ addFunc: resetFilter });

  useEffect(() => {
    setMainData(jsonData);
  }, [jsonData]);

  useEffect(() => {
    const rows = [];
    console.log(mainData);
    mainData.forEach(data => {
      console.log(data);
      const row = [];
      row.push(data.id);
      row.push(data.totalQuantity);
      data.markets.forEach(market => {
        row.push(market.totalQuantity);
      });
      rows.push(createRow(...row));
    });

    setTableRows(rows);
    setFilteredTableRows(rows);
  }, [mainData]);

  const handleSort = sortType => event => {
    const isAsc = sortBy === sortType && sort === 'asc';
    setSort(isAsc ? 'desc' : 'asc');
    setSortBy(sortType);
  };

  function handleChange(e) {
    setSkuFilter(e.target.value);
  }

  useEffect(() => {
    if (tableRows.length === 0) {
      return;
    }
    const totalQuantity = [];
    const de = [];
    const fr = [];
    const uk = [];
    const it = [];
    const es = [];
    const nl = [];
    const pl = [];
    const se = [];

    const salesInCurrency = {
      sku: [],
    };

    const filteredRows = tableRows.filter(row => {
      return row.sku.toLowerCase().includes(skuFilter.toLowerCase());
    });

    filteredRows.forEach(row => {
      totalQuantity.push(row.totalQuantity);
      de.push(row.de);
      fr.push(row.fr);
      uk.push(row.uk);
      it.push(row.it);
      es.push(row.es);
      nl.push(row.nl);
      pl.push(row.pl);
      se.push(row.se);
      // salesInCurrency.PLN.push({totalQuantity: })
    });

    setFilteredTableRows(filteredRows);

    const sumRow = setSumRow(totalQuantity, de, fr, uk, it, se, nl, pl, se);
    setSumUpRow(sumRow);
    setFilteredSumUpRow(sumRow);
  }, [skuFilter, tableRows]);

  function setSumRow(totalQuantity, de, fr, uk, it, es, nl, pl, se) {
    return [
      {
        value: totalQuantity.reduce((acc, el) => acc + el, 0),
        name: 'Total Quantity',
      },
      { value: de.reduce((acc, el) => acc + el, 0), name: 'Germany', id: 'de' },
      { value: fr.reduce((acc, el) => acc + el, 0), name: 'France', id: 'fr' },
      {
        value: uk.reduce((acc, el) => acc + el, 0),
        name: 'United Kingdom',
        id: 'uk',
      },
      { value: it.reduce((acc, el) => acc + el, 0), name: 'Italy', id: 'it' },
      { value: es.reduce((acc, el) => acc + el, 0), name: 'Spain', id: 'es' },
      {
        value: nl.reduce((acc, el) => acc + el, 0),
        name: 'Netherlands',
        id: 'nl',
      },
      { value: pl.reduce((acc, el) => acc + el, 0), name: 'Poland', id: 'pl' },
      { value: se.reduce((acc, el) => acc + el, 0), name: 'Sweden', id: 'se' },
    ];
  }

  return (
    <>
      {apiState.isPending() && <Pending />}
      {apiState.isSuccess() && (
        <MainContainer>
          <SKUTable
            handleSubmit={filterByDate}
            resetFilter={resetFilter}
            isOpenModal={openSkuFilterModal}
            toggleFilter={toggleFilter}
            handleChange={handleChange}
            handleSort={handleSort}
            sortBy={sortBy}
            sort={sort}
            createHead={createHead}
            filteredSumUpRow={filteredSumUpRow}
            markets={markets.markets}
            stableSort={stableSort}
            getComparator={getComparator}
            rates={rates}
            onHover={setHover}
            hover={hover}
            filteredTableRows={filteredTableRows}
          />
          <Outlet />
        </MainContainer>
      )}
    </>
  );
}

export default withApiState(SalesPerSKU);
