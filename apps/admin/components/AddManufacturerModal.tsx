'use client'

import React, { useState, FormEvent } from 'react'
import { X } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { type CreateManufacturerPayload } from '@repo/dto'

interface AddManufacturerModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Omit<CreateManufacturerPayload, 'userIds'>) => Promise<void>
  selectedUserCount: number
  isLoading: boolean
  error: string | null
}

export const AddManufacturerModal: React.FC<AddManufacturerModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  selectedUserCount,
  isLoading,
  error
}) => {
  const [name, setName] = useState('')
  const [industry, setIndustry] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !industry.trim()) {
      setFormError('Manufacturer Name and Industry are required.')
      return
    }
    setFormError(null)
    await onSubmit({
      name,
      industry,
      contactPerson: {
        name: contactName,
        email: contactEmail,
        phone: contactPhone
      }
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add {selectedUserCount} User(s) to New Manufacturer</h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close modal">
            <X className="w-6 h-6" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="manufacturerName" className="block text-sm font-medium text-gray-700">
              Manufacturer Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="manufacturerName"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
              Industry <span className="text-red-500">*</span>
            </label>
            <Input
              id="industry"
              value={industry}
              onChange={e => setIndustry(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <h3 className="text-md font-medium text-gray-700 pt-2">Contact Person (Optional)</h3>
          <div>
            <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input
              id="contactName"
              value={contactName}
              onChange={e => setContactName(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              id="contactEmail"
              value={contactEmail}
              onChange={e => setContactEmail(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <Input
              type="tel"
              id="contactPhone"
              value={contactPhone}
              onChange={e => setContactPhone(e.target.value)}
              className="mt-1"
            />
          </div>

          {(formError || error) && <p className="text-sm text-red-600">{formError || error}</p>}

          <div className="flex justify-end space-x-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Create Manufacturer'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

AddManufacturerModal.displayName = 'AddManufacturerModal'
