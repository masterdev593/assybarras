import React from 'react';
import clsx from 'clsx';
import memoize from 'memoize-one';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { makeStyles } from '@material-ui/styles';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// import createData from "./data";

const useTableStyles = makeStyles(() => ({
  root: {
    display: 'block',
    flex: 1
  },
  table: {
    height: '100%',
    width: '100%'
  },
  list: {},
  thead: {},
  tbody: {
    width: '100%'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    boxSizing: 'border-box',
    minWidth: '100%',
    width: '100%'
  },
  headerRow: {},
  cell: {
    display: 'block',
    flexGrow: 0,
    flexShrink: 0
    // flex: 1
  },
  expandingCell: {
    flex: 1
  },
  column: {}
}));

const TableColumns = ({ classes, columns }) => {
  return (
    <TableRow className={clsx(classes.row, classes.headerRow)} component='div'>
      {columns.map((column, colIndex) => {
        return (
          <TableCell
            align={column.numeric || false ? 'right' : 'left'}
            className={clsx(
              classes.cell,
              classes.column,
              !column.width && classes.expandingCell
            )}
            component='div'
            key={colIndex}
            scope='col'
            style={{
              flexBasis: column.width || false,
              height: ROW_SIZE
            }}
            variant='head'
            >
            {column.label}
          </TableCell>
        );
      })}
    </TableRow>
  );
};
TableColumns.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.array
};
const ROW_SIZE = 48;

const Row = ({ index, style, data: { columns, items, classes } }) => {
  console.log('1 row');
  const item = items[index];
  console.log(item);
  return (
    <TableRow className={classes.row} component='div' style={style}>
      {columns.map((column, colIndex) => {
        return (
          <TableCell
            align={column.numeric || false ? 'right' : 'left'}
            className={clsx(
              classes.cell,
              !column.width && classes.expandingCell
            )}
            component='div'
            key={item.id + colIndex}
            style={{
              flexBasis: column.width || false,
              height: ROW_SIZE
            }}
            variant='body'
            >
            {item[column.dataKey]}
          </TableCell>
        );
      })}
    </TableRow>
  );
};
Row.propTypes = {
  index: PropTypes.any,
  style: PropTypes.any,
  data: PropTypes.shape({
    columns: PropTypes.array,
    items: PropTypes.array,
    classes: PropTypes.array
  })
};
const itemKey = (index, data) => data.items[index].id;

const createItemData = memoize((classes, columns, data) => ({
  columns,
  classes,
  items: data
}
));

const TablaVirtualizada = ({ data, columns }) => {
  const classes = useTableStyles();
   const itemData = createItemData(classes, columns, data);
   console.table(createItemData);
  return (
    <div className={classes.root}>
      <Table className={classes.table} component='div'>
        <TableHead className={classes.thead} component='div'>
          <TableColumns classes={classes} columns={columns} />
        </TableHead>

        <TableBody className={classes.tbody} component='div'>
          <AutoSizer>
            {({ height, width }) => (
              <List
                className={classes.list}
                height={height}
                itemCount={data.length}
                itemData={itemData}
                itemKey={itemKey}
                itemSize={ROW_SIZE}
                width={width}
                >
                {Row}
              </List>
            )}
          </AutoSizer>
        </TableBody>
      </Table>
    </div>
  );
};

TablaVirtualizada.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
};
export default TablaVirtualizada;
