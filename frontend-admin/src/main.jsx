import React from 'react'
import { createRoot } from 'react-dom/client'
import { Refine } from '@pankod/refine-core'
import {notificationProvider, RefineSnackbarProvider} from '@pankod/refine-antd'
import { Layout, ReadyPage, ErrorComponent } from '@pankod/refine-antd'
import routerProvider from '@pankod/refine-react-router-v6'
import dataProvider from './utils/dataProvider'
import authProvider from './utils/authProvider'
import 'antd/dist/reset.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Refine
      Layout={Layout}
      dataProvider={dataProvider}
      authProvider={authProvider}
      routerProvider={routerProvider}
      notificationProvider={notificationProvider}
      ReadyPage={ReadyPage}
      catchAll={ErrorComponent}
      resources={[
        { name: 'SanPham', list: '/products', create: '/products/create', edit: '/products/edit/:id' },
        { name: 'DanhMuc', list: '/categories' },
        { name: 'NguoiDung', list: '/users' },
      ]}
    >
      <RefineSnackbarProvider>
        <App />
      </RefineSnackbarProvider>
    </Refine>
  </React.StrictMode>
)
