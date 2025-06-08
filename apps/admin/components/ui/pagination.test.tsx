import * as React from 'react'
import { describe, it } from '@jest/globals'
import { createRoot } from 'react-dom/client'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '.'

describe('Pagination Components', () => {
  const components = [
    { name: 'Pagination', Component: Pagination, props: {} },
    { name: 'PaginationContent', Component: PaginationContent, props: {} },
    { name: 'PaginationEllipsis', Component: PaginationEllipsis, props: {} },
    { name: 'PaginationItem', Component: PaginationItem, props: {} },
    { name: 'PaginationLink', Component: PaginationLink, props: { href: '#' } },
    { name: 'PaginationNext', Component: PaginationNext, props: { href: '#' } },
    { name: 'PaginationPrevious', Component: PaginationPrevious, props: { href: '#' } }
  ]

  components.forEach(({ name, Component, props }) => {
    it(`${name} renders without crashing`, () => {
      const div = document.createElement('div')
      const root = createRoot(div)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      root.render(React.createElement(Component as React.ComponentType<any>, props))
      root.unmount()
    })
  })
})
