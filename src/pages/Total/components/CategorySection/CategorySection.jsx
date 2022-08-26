import SectionContainer from 'components/SectionContainer';
import { useFetch } from 'hooks/useFetch';
import { useCallback, useEffect, useState } from 'react';
import { getData } from 'service/apiService';
import { withApiState } from 'service/stateMachine';

import skuList from 'data/skuList';
import mathRound from 'helpers/mathRound';

import TimeForm from 'components/TimeForm';
import CategoryTable from './components/CategoryTable';
import PieChart from './components/PieChart';

const categories = [
  'Water Glass Category',
  'Wine Glass Category',
  'Champagne Glass Category',
  'Carafe Category',
  'Cocktail Glass Category',
  'Beer Glass Category',
  'Other',
  'Whiskey Glass Category',
];

function CategorySection({ apiState }) {
  const [mainData, setMainData] = useState(null);
  const [sectionData, setSectionData] = useState(null);
  const [dates, setDates] = useState({
    min: new Date('01-01-2021').getTime(),
    max: new Date().getTime(),
  });
  const data = useFetch({
    apiState: apiState,
    fetchAPI: getData,
    param: 'skuData',
  });

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    setMainData(data);
  }, [data]);

  const filterDates = useCallback(
    dates => {
      if (!mainData) {
        return;
      }
      const allCategories = [];
      categories.forEach(category => {
        const categorySKUs = skuList.sku.filter(
          sku => sku.category === category
        );

        const categorySKUData = [];

        categorySKUs.forEach(element => {
          mainData.forEach(sku => {
            if (sku.id === element.sku) {
              categorySKUData.push(sku);
            }
          });
        });

        const skuData = categorySKUData.map(sku => {
          const dayData = [];
          sku.dayData.forEach(day => {
            if (
              new Date(day.date).getTime() <= dates.max &&
              new Date(day.date).getTime() >= dates.min
            ) {
              dayData.push(day);
            }
          });
          const newSkuData = {
            dayData: dayData,
            skuName: sku.id,
          };
          return newSkuData;
        });

        //   console.log(categoryData);

        const categoryData = {
          totalQuantity: skuData
            .map(sku =>
              sku.dayData.reduce((acc, el) => acc + el.totalQuantity, 0)
            )
            .reduce((acc, el) => acc + el, 0),
          totalSalesEUR: mathRound(
            skuData
              .map(sku =>
                sku.dayData.reduce((acc, el) => acc + el.totalSalesEUR, 0)
              )
              .reduce((acc, el) => acc + el, 0),
            100
          ),
          totalSalesPLN: mathRound(
            skuData
              .map(sku =>
                sku.dayData.reduce((acc, el) => acc + el.totalSalesPLN, 0)
              )
              .reduce((acc, el) => acc + el, 0),
            100
          ),

          categoryName: category,
          id: category,
        };
        allCategories.push(categoryData);
      });

      setSectionData(allCategories);
    },
    [mainData]
  );

  useEffect(() => {
    filterDates(dates);
  }, [dates, filterDates]);

  const resetFilter = () => {
    setDates({
      min: new Date('01-01-2021').getTime(),
      max: new Date().getTime(),
    });
  };

  return (
    <SectionContainer id="category-analysis">
      <h2>Categories Analysis</h2>
      {sectionData && (
        <div style={{ display: 'flex' }}>
          <PieChart data={sectionData} />
          <TimeForm
            position={{
              maxHeight: '200px',
              marginRight: '50px',
              marginLeft: '-250px',
            }}
            submitForm={filterDates}
            onClick={resetFilter}
          />
          <CategoryTable data={sectionData} />
        </div>
      )}
    </SectionContainer>
  );
}

export default withApiState(CategorySection);

// averageOrder: 1.03
// currentDate: "1/Jan/2021"
// date: "2020-12-31T23:00:00.000Z"
// dayInWeek: 5
// id: "1/Jan/2021"
// iteration: 0
// mainMarket: {name: 'Germany', id: 'de', totalQuantity: 271, totalSalesLocalCurrency: 7307.61, totalSalesPLN: 34615.34, …}
// markets: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// monthId: 1
// orderNumber: 411
// totalQuantity: 425
// totalSalesEUR: 12823.57
// totalSalesPLN: 60743.61
// weekId: 1
// yearId: 2021
