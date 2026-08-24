import React from 'react'
import { List, Table, useTable } from '@pankod/refine-antd'

export default function Users() {
  const { tableProps } = useTable({ resource: 'NguoiDung' })
  return (
    <div>
      <h2>Users</h2>
      <List>
        <Table {...tableProps} rowKey={(r) => r.id_nguoi_dung} />
      </List>
    </div>
  )
}
