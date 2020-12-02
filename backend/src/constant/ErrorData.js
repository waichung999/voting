module.exports = {
  ERROR_STATUS_ARRAY: [
    {
      status: "401",
      message: "Unauthorized",
      data: "Unauthorized."
    },
    {
      status: "404",
      message: "Not Found"
    },
    {
      status: "405",
      message: "User already voted.",
      data: "User already voted."
    },
    {
      status: "413",
      message: "Verification code eror",
      data: "verification code are not match please try again."
    },
    {
      status: "414",
      message: "Token Error",
      data: "Invalid token found."
    },
    {
      status: "416",
      message: "User not verified",
      data: "Your are not verified."
    },
    {
      status: "417",
      message: "Authentication error.",
      data: "You are not authorized to perform this action."
    },
    {
      status: "502",
      message: "JWT token Error",
      data: "Error occure while genrating user token."
    },
    {
      status: "503",
      message: "Database error",
      data: "Database operation error."
    },
  ]
}
