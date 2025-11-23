// --------------------------------------------------
// SIGNUP FUNCTION WITH ACTIVATION SUPPORT (LOCAL STORAGE)
// --------------------------------------------------
export async function signupUser(userData) {
  const { email, phone, referral, password, repeatPassword, model } = userData;

  // --- VALIDATION ---
  if (!email || !phone || !password || !repeatPassword || !model) {
    return { success: false, message: "All required fields must be filled." };
  }

  if (password.length < 6) {
    return { success: false, message: "Password must be at least 6 characters long." };
  }

  if (password !== repeatPassword) {
    return { success: false, message: "Passwords do not match." };
  }

  // --- GET EXISTING USERS FROM LOCAL STORAGE ---
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // --- CHECK IF EMAIL EXISTS ---
  if (users.some(u => u.email === email)) {
    return { success: false, message: "Email already exists." };
  }

  // --- CHECK IF PHONE EXISTS ---
  if (users.some(u => u.phone === phone)) {
    return { success: false, message: "Phone number already exists." };
  }

  // --- ACTIVATION SYSTEM VALUES ---
  const activationCode = Math.floor(100000 + Math.random() * 900000).toString();
  const activated = false;

  // --- CREATE NEW USER OBJECT ---
  const newUser = {
    email,
    phone,
    referral: referral || null,
    password,              // ⚠ Not hashed, consider hashing later
    model,
    activated,
    activation_code: activationCode,
    activation_status: "pending",
    created_at: new Date().toISOString(),
  };

  // --- SAVE USER TO LOCAL STORAGE ---
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // OPTIONAL: you can trigger sending activation code via email/SMS here

  return {
    success: true,
    message: "Signup successful! Please activate your account.",
    user: newUser
  };
}