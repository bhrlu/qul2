export const COUNTRY_CODE = {
  countryCode: '/Country/CountryCode'
}

export const OTP = {
  smsSendToken: '/OTP/SMS/SendToken',
  smsValidateToken: '/OTP/SMS/ValidateToken',
  emailSendToken: '/OTP/Email/SendToken',
  emailValidateToken: '/OTP/Email/ValidateToken'
}

export const REGISTER = {
  personalAccount: '/Register/PersonalAccount',
  companyAccount: '/Register/CompanyAccount'
}

export const LOGIN = {
  otpSmsToken: '/Login/OTP/SMS/Token',
  otpEmailToken: '/Login/OTP/Email/Token'
}

export const GOOGLE_AUTH = {
  request: '/GoogleAuth/Request',
  auth: '/GoogleAuth/Auth'
}

export const USER_PROFILE = {
  user: '/User/GetProfile'
}
