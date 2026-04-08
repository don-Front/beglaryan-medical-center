import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '../layouts/RootLayout'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { StubPage } from '../pages/StubPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about-us', element: <StubPage /> },
      { path: 'departments', element: <StubPage /> },
      { path: 'team', element: <StubPage /> },
      { path: 'gallery', element: <StubPage /> },
      { path: 'news', element: <StubPage /> },
      { path: 'contacts', element: <StubPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
