const OTP_REGEX = new RegExp('^[0-9]{1,6}$');
const PASS_REGEX = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,30}$');

export { OTP_REGEX, PASS_REGEX };
