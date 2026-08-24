import React from 'react'
import { List, Table, useTable, Create, Edit, Form, Input, useForm, SaveButton } from '@pankod/refine-antd'

export default function Products() {
  const { tableProps } = useTable()

  return (
    <div>
      <h2>Products</h2>
      <List>
        <Table {...tableProps} rowKey={(r) => r.id_san_pham || r.id_san_pham} />
      </List>
    </div>
  )
}
