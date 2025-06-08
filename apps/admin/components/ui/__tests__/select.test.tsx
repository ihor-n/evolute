import { describe, it } from '@jest/globals'
import { createRoot } from 'react-dom/client'
import { Select } from '..'

describe('Select', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    const root = createRoot(div)
    root.render(<Select />)
    root.unmount()
  })
})
