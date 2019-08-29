import React, { useState, useEffect } from 'react';
import {
  PagingState,
  SortingState,
  CustomPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-bootstrap4';

import { Loading } from '../../../theme-sources/bootstrap4/components/loading';
import { CurrencyTypeProvider } from '../../../theme-sources/bootstrap4/components/currency-type-provider';

const URL = 'https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems';

export default () => {
  const [columns] = useState([
    { name: 'OrderNumber', title: 'Order #' },
    { name: 'OrderDate', title: 'Order Date' },
    { name: 'StoreCity', title: 'Store City' },
    { name: 'Employee', title: 'Employee' },
    { name: 'SaleAmount', title: 'Sale Amount' },
  ]);
  const [rows, setRows] = useState([]);
  const [currencyColumns] = useState(['SaleAmount']);
  const [tableColumnExtensions] = useState([
    { columnName: 'OrderNumber', align: 'right' },
    { columnName: 'SaleAmount', align: 'right' },
  ]);
  const [sorting, setSorting] = useState([{ columnName: 'StoreCity', direction: 'asc' }]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageSizes] = useState([5, 10, 15]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState();

  const changePageSize = (value) => {
    const totalPages = Math.ceil(totalCount / value);
    const updatedCurrentPage = Math.min(currentPage, totalPages - 1);

    setPageSize(value);
    setCurrentPage(updatedCurrentPage);
  };

  const getQueryString = () => {
    let queryString = `${URL}?take=${pageSize}&skip=${pageSize * currentPage}`;

    const columnSorting = sorting[0];
    if (columnSorting) {
      const sortingDirectionString = columnSorting.direction === 'desc' ? ' desc' : '';
      queryString = `${queryString}&orderby=${columnSorting.columnName}${sortingDirectionString}`;
    }

    return queryString;
  };

  const loadData = () => {
    const queryString = getQueryString();
    if (queryString !== lastQuery && !loading) {
      setLoading(true);
      fetch(queryString)
        .then(response => response.json())
        .then((data) => {
          setRows(data.items);
          setTotalCount(data.totalCount);
          setLoading(false);
        })
        .catch(() => setLoading(false));
      setLastQuery(queryString);
    }
  };

  useEffect(() => loadData());

  return (
    <div className="card" style={{ position: 'relative' }}>
      <Grid
        rows={rows}
        columns={columns}
      >
        <CurrencyTypeProvider
          for={currencyColumns}
        />
        <SortingState
          sorting={sorting}
          onSortingChange={setSorting}
        />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={changePageSize}
        />
        <CustomPaging
          totalCount={totalCount}
        />
        <Table
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow showSortingControls />
        <PagingPanel
          pageSizes={pageSizes}
        />
      </Grid>
      {loading && <Loading />}
    </div>
  );
};
