import React from 'react';
import PropTypes from 'prop-types';

export class Table extends React.PureComponent {
  renderBodyCells(Template, row) {
    const {header} = this.props;
    return header.map(headerCell => {
      let cellValue = row.hasOwnProperty(headerCell.name) ? row[headerCell.name] : '';
      if(headerCell.hasOwnProperty('transform')) {
        cellValue = headerCell.transform(row);
      }
      return this.renderCell(Template.td, cellValue, headerCell.name, headerCell.label);
    });
  }

  renderBodyRow(Template, row, index) {
    return (
      <Template.tr
        className="Table-row"
        key={index + '-' + Math.random()}
      >
        {this.renderBodyCells(Template, row)}
      </Template.tr>
    );
  }

  renderBodyRows(Template) {
    const {rows} = this.props;
    return rows.map((tableRow, index) => {
      return this.renderBodyRow(Template, tableRow, index);
    });
  }

  renderHeaderRow(Template) {
    return (
      <Template.tr className="Table-row">
        {this.renderHeaderCells(Template.th)}
      </Template.tr>
    );
  }

  renderHeaderCells(Template) {
    const {header} = this.props;
    return header.map(headerCell => {
      return this.renderCell(Template, headerCell.label, headerCell.name, headerCell.label);
    });
  }

  renderCell(Template, value, id, label) {
    const cellProps = {
      className: 'Table-cell',
      key: (value + Math.random().toString()),
      'data-label': label,
      id
    };

    return (
      <Template {...cellProps}>
        {value}
      </Template>
    );
  }

  render() {
    const {Template} = this.props;
    return (
      <Template.table className="Table">
        <Template.thead className="Table-header">
          {this.renderHeaderRow(Template)}
        </Template.thead>
        <Template.tbody className="Table-body">
          {this.renderBodyRows(Template)}
        </Template.tbody>
      </Template.table>
    );
  }
}

Table.propTypes = {
  header: PropTypes.array,
  rows: PropTypes.array,
  Template: PropTypes.object
};

Table.defaultProps = {
  Template: {
    table: 'table',
    tr: 'tr',
    thead: 'thead',
    th: 'th',
    tbody: 'tbody',
    td: 'td'
  }
};