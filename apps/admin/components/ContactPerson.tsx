import React from 'react'

export const ContactPerson: React.FC<{ contact?: { name?: string; email?: string; phone?: string } }> = ({
  contact
}) => {
  if (!contact) return null

  const name = contact.name?.trim()
  const email = contact.email?.trim()
  const phone = contact.phone?.trim()

  if (!name && !email && !phone) {
    return null
  }

  const contactDisplayParts: string[] = []
  if (name) {
    contactDisplayParts.push(name)
  }

  const details: string[] = []
  if (email) details.push(email)
  if (phone) details.push(phone)

  if (details.length > 0) {
    if (name) {
      contactDisplayParts.push(`(${details.join(', ')})`)
    } else {
      contactDisplayParts.push(details.join(', '))
    }
  }

  return <p className="text-sm text-gray-500 mb-3">Contact: {contactDisplayParts.join(' ')}</p>
}

ContactPerson.displayName = 'ContactPerson'
