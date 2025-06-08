import { describe, it } from '@jest/globals'
import { createRoot } from 'react-dom/client'
import { Checkbox } from '.'

describe('Checkbox', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    const root = createRoot(div)
    root.render(<Checkbox id="test-checkbox" />)
    root.unmount()
  })
})
