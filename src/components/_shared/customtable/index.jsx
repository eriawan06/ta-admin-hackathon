import React from 'react'
import { Table } from 'antd'

const CustomTable = ({
  column,
  dataSource,
  rowKey,
  pagination = {},
  pageSize = 10,
  onChangePagination = () => {},
  hideOnSinglePage = true,
  onShowSizeChange = () => {},
  totalData,
  current = 1,
  loading = false,
  tipLoading = '',
  ...props
}) => {
  return (
    <>
      <Table
        columns={column}
        dataSource={dataSource}
        rowKey={rowKey}
        loading={{ spinning: loading, tip: tipLoading }}
        pagination={
          Object.keys(pagination).length !== 0
            ? { ...pagination, hideOnSinglePage: true }
            : {
                pageSize: pageSize || dataSource?.length,
                onChange: onChangePagination,
                total: totalData,
                showSizeChanger: false,
                current: current,
                hideOnSinglePage: hideOnSinglePage,
                onShowSizeChange: onShowSizeChange
              }
        }
        {...props}
      />
    </>
  )
}

export default CustomTable
