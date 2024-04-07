interface Login {
  email: string
  password: string
}

interface MFA {
  auth_session: string
  email: string
  totp_code: string
}

interface Verify {
  verification_code: string
  email: string
}

export type { Login, MFA, Verify }
