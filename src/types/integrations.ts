export interface GoogleAccount {
  id: string
  email: string
  verified_email: boolean
  name: string
  picture: string
  given_name?: string
  family_name?: string
  locale?: string
}
