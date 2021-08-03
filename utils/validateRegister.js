const validateRegister = (
  fullname,
  address,
  username,
  password,
  cf_password
) => {
  if (!fullname || !address || !username || !password || !cf_password) {
    return "Hãy nhập tất cả các trường!";
  }

  if (isNum(username) && !isVietnamesePhoneNumber(username)) {
    return "SĐT không hợp lệ!";
  }

  if (!isNum(username) && !validateEmail(username)) {
    return "Email không hợp lệ!";
  }

  if (password.length < 6) {
    return "Mật khẩu phải ít nhất 6 ký tự!";
  }

  if (password !== cf_password) {
    return "Mật khẩu không khớp nhau!";
  }
};

function isNum(val) {
  return /^\d+$/.test(val);
}

function isVietnamesePhoneNumber(number) {
  return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default validateRegister;
