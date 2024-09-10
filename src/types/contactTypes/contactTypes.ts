export type ContactStatusType = 'active' | 'inActive'

export type ContactType = {
  id: string
  firstName: string
  lastName: string
  status: ContactStatusType
}
