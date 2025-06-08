import { describe, it } from '@jest/globals'
import { createRoot } from 'react-dom/client'
import { Input } from '.'

describe('Input', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    const root = createRoot(div)
    root.render(<Input />)
    root.unmount()
  })
})
