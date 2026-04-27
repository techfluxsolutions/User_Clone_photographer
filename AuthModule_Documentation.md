# AuthModule Documentation

## Overview
The AuthModule handles user authentication for the Photographer User Website using phone-based OTP (One-Time Password) login system.

---

## File Structure

```
src/AuthModule/
├── AuthModule.js              # Main module wrapper (empty placeholder)
├── AuthModule.css             # Styles for auth module
├── Login/
│   ├── Login.js              # Main login component with OTP
│   └── Login.css             # Login component styles
├── SignIn/
│   ├── SignIn.js             # Not implemented (placeholder)
│   └── SignIn.css            # SignIn styles
├── SignUp/
│   ├── SignUp.js             # Not implemented (placeholder)
│   └── SignUp.css            # SignUp styles
├── VerifyOTP/
│   ├── VerifyOTP.js          # Not implemented (OTP logic is in Login.js)
│   └── VerifyOTP.css         # VerifyOTP styles
└── PleaseLoginModal/
    └── PleaseLoginModal.js   # Modal to prompt user to login
```

---

## Components

### 1. AuthModule.js
**Status:** Empty placeholder component

**Code:**
```javascript
import React from 'react'

const AuthModule = () => {
  return (
    <div>AuthModule</div>
  )
}

export default AuthModule
```

**Purpose:** Main wrapper component (not currently used)

---

### 2. Login Component (`Login/Login.js`)

**Purpose:** Main authentication component that handles phone login and OTP verification

#### State Variables

| Variable | Type | Initial Value | Purpose |
|----------|------|---------------|---------|
| `showOtp` | boolean | `false` | Toggle between phone input and OTP input screens |
| `phone` | string | `""` | Store 10-digit phone number |
| `otp` | array | `["", "", "", ""]` | Store 4-digit OTP (one digit per array element) |
| `loading` | boolean | `false` | Show/hide loader during API calls |
| `showMessageModal` | boolean | `false` | Show/hide message modal |
| `modalTitle` | string | `"Message"` | Title for message modal |
| `modalMessage` | string | `""` | Message text for modal |
| `redirectAfterModal` | boolean | `false` | Whether to redirect after modal closes |
| `timer` | number | `60` | Countdown timer for OTP resend (in seconds) |
| `canResend` | boolean | `false` | Enable/disable resend OTP button |
| `isLoggedIn` | boolean | `false` | Flag to track login status |

#### Key Functions

##### `handleVerify()`
**Purpose:** Send OTP to user's phone number

**Flow:**
1. Resets OTP input fields
2. Shows loader
3. Calls `LoginAPI` with phone number and role
4. If successful:
   - Shows OTP input screen
   - Starts 60-second countdown timer
   - Auto-focuses first OTP input
5. Shows success/error message in modal
6. Hides loader

**API Used:** `LoginAPI(payload)`

**Payload:**
```javascript
{
  mobileNumber: "9876543210",
  role: "user"
}
```

---

##### `handleLogin()`
**Purpose:** Verify OTP and create user session

**Flow:**
1. Shows loader
2. Calls `VerifyOTP` with phone, role, and OTP
3. If successful:
   - Saves encrypted token to localStorage
   - Saves user data to localStorage
   - Sets login flags
4. Shows success/error message in modal
5. Hides loader

**API Used:** `VerifyOTP(payload)`

**Payload:**
```javascript
{
  mobileNumber: "9876543210",
  role: "user",
  otp: "1234"
}
```

**localStorage Keys Set:**
- `PhotographerUserToken` - Encrypted JWT token
- `isLoggedIn` - Set to `"true"`
- `mobileNumber` - User's phone number
- `client_id` - User's unique ID from backend
- `user` - JSON string with user object

---

##### `handleOtpChange(value, index)`
**Purpose:** Handle OTP input changes

**Parameters:**
- `value` - The digit entered (0-9)
- `index` - Position in OTP array (0-3)

**Logic:**
1. Validates input is numeric
2. Updates OTP array at specified index
3. Auto-focuses next input if digit entered
4. Ignores non-numeric input

---

##### `handleOtpKeyDown(e, index)`
**Purpose:** Handle keyboard navigation in OTP inputs

**Parameters:**
- `e` - Keyboard event
- `index` - Current input position

**Logic:**
- If Backspace pressed on empty field
- Moves focus to previous input

---

##### `openModal(title, message, redirect)`
**Purpose:** Display message modal

**Parameters:**
- `title` - Modal title (e.g., "Success", "Error")
- `message` - Message to display
- `redirect` - Whether to redirect after closing (default: false)

---

##### `useEffect()` - Auto-Login Check
**Purpose:** Check for existing valid session on component mount

**Flow:**
1. Gets token from localStorage
2. If token exists:
   - Shows loader
   - Calls `getTokenAPI` to validate
   - If valid: redirects to `/editProfile`
   - If invalid: clears localStorage
3. Hides loader

**API Used:** `getTokenAPI(token)`

---

##### `useEffect()` - Timer Countdown
**Purpose:** Manage OTP resend timer

**Dependencies:** `[showOtp, timer]`

**Flow:**
1. When OTP screen shown and timer > 0
2. Decrements timer every second
3. When timer reaches 0:
   - Enables "Resend OTP" button
   - Stops countdown

---

#### UI Elements

##### Phone Input Screen
```
┌─────────────────────────────────┐
│  Login to your Account          │
│                                 │
│  Phone                          │
│  ┌───────────────┐  ┌────────┐ │
│  │ 9876543210    │  │ Verify │ │
│  └───────────────┘  └────────┘ │
└─────────────────────────────────┘
```

##### OTP Input Screen
```
┌─────────────────────────────────┐
│  Login to your Account          │
│                                 │
│  Please enter your OTP          │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐      │
│  │ 1 │ │ 2 │ │ 3 │ │ 4 │      │
│  └───┘ └───┘ └───┘ └───┘      │
│                                 │
│  Resend OTP in 45s              │
│                                 │
│  ┌─────────────────────────┐   │
│  │        Login            │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

---

### 3. PleaseLoginModal Component

**Purpose:** Modal that prompts users to login before accessing protected features

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `show` | boolean | Yes | Controls modal visibility |
| `onClose` | function | Yes | Function called when modal closes |

#### Features
- Displays message: "Before going forward, please login."
- Two action buttons:
  - **Login** - Redirects to `/login` page
  - **Cancel** - Closes modal without action
- Uses same styling as CommonMessageModal
- Blocks background interaction (`backdrop="static"`)
- Cannot be closed with Escape key (`keyboard={false}`)

#### Usage Example
```javascript
<PleaseLoginModal 
  show={showLoginModal} 
  onClose={() => setShowLoginModal(false)} 
/>
```

---

### 4. SignIn Component (`SignIn/SignIn.js`)

**Status:** Not implemented (placeholder)

**Code:**
```javascript
import React from 'react'

const SignIn = () => {
  return (
    <div>SignIn</div>
  )
}

export default SignIn
```

---

### 5. SignUp Component (`SignUp/SignUp.js`)

**Status:** Not implemented (placeholder)

**Code:**
```javascript
import React from 'react'

const SignUp = () => {
  return (
    <div>SignUp</div>
  )
}

export default SignUp
```

---

### 6. VerifyOTP Component (`VerifyOTP/VerifyOTP.js`)

**Status:** Not implemented (OTP logic is in Login.js)

**Code:**
```javascript
import React from 'react'

const VerifyOTP = () => {
  return (
    <div>VerifyOTP</div>
  )
}

export default VerifyOTP
```

**Note:** OTP verification functionality is currently implemented in the Login component.

---

## Authentication APIs

### 1. LoginAPI (Send OTP)

**File:** `src/utils/APIs/credentialsApis.js`

**Endpoint:** `POST /api/auth/login`

**Request:**
```javascript
{
  mobileNumber: "9876543210",  // 10-digit phone number
  role: "user"                  // Always "user" for this app
}
```

**Response (Success):**
```javascript
{
  success: true,
  message: "OTP sent successfully"
}
```

**Response (Error):**
```javascript
{
  success: false,
  message: "Invalid phone number" // or other error
}
```

**Used In:** Login.js → `handleVerify()`

---

### 2. VerifyOTP (Verify OTP)

**File:** `src/utils/APIs/credentialsApis.js`

**Endpoint:** `POST /api/auth/verify`

**Request:**
```javascript
{
  mobileNumber: "9876543210",  // 10-digit phone number
  role: "user",                 // Always "user"
  otp: "1234"                   // 4-digit OTP
}
```

**Response (Success):**
```javascript
{
  success: true,
  message: "Login successful",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",  // JWT token
  id: "client_abc123"                                  // Client ID
}
```

**Response (Error):**
```javascript
{
  success: false,
  message: "Invalid OTP" // or "OTP expired"
}
```

**Used In:** Login.js → `handleLogin()`

---

### 3. getTokenAPI (Validate Token)

**File:** `src/utils/APIs/credentialsApis.js`

**Endpoint:** `POST /api/auth/getToken`

**Request:**
```javascript
{
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  // Decrypted JWT token
}
```

**Response (Success):**
```javascript
{
  success: true,
  message: "Token is valid"
}
```

**Response (Error):**
```javascript
{
  success: false,
  message: "Expired token" // or "Invalid token"
}
```

**Used In:** Login.js → `useEffect()` for auto-login check

---

## Data Storage (localStorage)

### Keys Set by AuthModule

| Key | Type | Value Example | Purpose |
|-----|------|---------------|---------|
| `PhotographerUserToken` | Encrypted String | `U2FsdGVkX1+abc...` | JWT token (encrypted with AES) |
| `isLoggedIn` | String | `"true"` | Quick login status flag |
| `mobileNumber` | String | `"9876543210"` | User's phone number |
| `client_id` | String | `"client_abc123"` | User's unique ID from backend |
| `user` | JSON String | `{"mobileNumber":"9876543210","role":"user"}` | User object |

### Token Encryption

**Encryption Method:** AES (Advanced Encryption Standard)

**Encryption Key:**
```javascript
"this-is-my-secret-key-for-token-of-dine-right-user-website"
```

**Functions Used:**
- `encryptData(text)` - Encrypts JWT token before storing
- `decryptData(encryptedData)` - Decrypts token when needed

**File:** `src/utils/CRYPTO/cryptoFunction.js`

---

## Authentication Flow

### Step 1: User Enters Phone Number
```
User opens Login page
  ↓
Enters 10-digit phone number
  ↓
Clicks "Verify" button
  ↓
System calls LoginAPI
  ↓
OTP sent to phone
```

### Step 2: User Enters OTP
```
OTP input screen appears
  ↓
User enters 4-digit OTP
  ↓
Clicks "Login" button
  ↓
System calls VerifyOTP
  ↓
Token received from backend
```

### Step 3: Session Created
```
Token encrypted and saved to localStorage
  ↓
User data saved to localStorage
  ↓
Login flags set
  ↓
User redirected to profile page
```

### Step 4: Auto-Login (Next Visit)
```
User opens app
  ↓
System checks for token in localStorage
  ↓
If token exists → Validates with getTokenAPI
  ↓
If valid → Auto-redirect to profile
  ↓
If invalid → Clear localStorage, stay on login
```

---

## User Experience Features

### 1. OTP Input
- 4 separate input boxes (one per digit)
- Auto-focus next box when digit entered
- Auto-focus previous box on backspace
- Only accepts numeric input (0-9)
- Visual feedback for each digit

### 2. Resend OTP Timer
- 60-second countdown starts after OTP sent
- Shows "Resend OTP in Xs" message
- "Resend OTP" link appears when timer reaches 0
- Clicking resend resets timer to 60 seconds
- Clears previous OTP inputs on resend

### 3. Loading States
- Global loader component shows during API calls
- Prevents multiple button clicks
- Provides visual feedback to user

### 4. Auto-Login
- Checks for existing session on page load
- Validates token with backend
- Auto-redirects if valid
- Clears invalid/expired tokens

### 5. Error Handling
- Shows backend error messages in modal
- Clear error descriptions
- Modal can be closed by clicking "OK"
- Appropriate error titles ("Error", "Success")

---

## Error Messages

| Error | Cause | User Action |
|-------|-------|-------------|
| "Invalid phone number" | Wrong format or non-existent number | Re-enter correct phone number |
| "OTP sent successfully" | Success message | Enter OTP received on phone |
| "Invalid OTP" | Wrong OTP entered | Re-enter correct OTP |
| "OTP expired" | OTP timeout (usually 5-10 min) | Click "Resend OTP" |
| "Expired token" | Session expired | Login again |
| "No token found" | Token missing from storage | Login again |

---

## Security Features

### 1. Token Encryption
- JWT tokens encrypted before storing in localStorage
- Uses AES encryption with secret key
- Prevents token theft from browser storage

### 2. Token Validation
- Token validated on every app load
- Expired tokens automatically cleared
- Invalid tokens trigger re-login

### 3. OTP Expiration
- OTP valid for limited time (backend controlled)
- Resend option available after expiration
- Each OTP request generates new code

### 4. Role-Based Access
- All requests include role: "user"
- Backend validates user role
- Prevents unauthorized access

---

## Integration with Other Modules

### Protected Routes
When user tries to access protected pages without login:
```javascript
// Example usage in any component
const [showLoginModal, setShowLoginModal] = useState(false);

// Check if user is logged in
if (!localStorage.getItem("isLoggedIn")) {
  setShowLoginModal(true);
}

// Show modal
<PleaseLoginModal 
  show={showLoginModal} 
  onClose={() => setShowLoginModal(false)} 
/>
```

### After Login Actions
The Login component handles post-login actions:
- Checks for pending bookings in localStorage
- Checks for pending quotes in localStorage
- Creates bookings/quotes after successful login
- Redirects to appropriate page

---

## Component Dependencies

### External Libraries
- `react` - Core React library
- `react-router-dom` - For navigation (`useNavigate`)
- `react-bootstrap` - For Modal component (PleaseLoginModal)
- `react-icons` - For icons (MdEmail)
- `crypto-js` - For AES encryption/decryption

### Internal Dependencies
- `Loader` component - Shows loading spinner
- `CommonMessageModal` - Displays messages
- API functions from `credentialsApis.js`
- Encryption functions from `cryptoFunction.js`

---

## Future Enhancements

### Planned Features
1. Implement SignIn component (email/password login)
2. Implement SignUp component (new user registration)
3. Separate VerifyOTP into its own component
4. Add "Remember Me" functionality
5. Add biometric authentication support
6. Add social login (Google, Facebook)
7. Add two-factor authentication option

### Current Limitations
- Only phone-based OTP login available
- No email/password option
- No social login integration
- SignIn, SignUp, VerifyOTP components not implemented

---

## Troubleshooting

### Issue: OTP not received
**Possible Causes:**
- Wrong phone number format
- Backend SMS service issue
- Network connectivity problem

**Solution:**
- Verify phone number is correct
- Check network connection
- Try resending OTP
- Contact support if issue persists

---

### Issue: "Invalid OTP" error
**Possible Causes:**
- Wrong OTP entered
- OTP expired
- OTP already used

**Solution:**
- Re-enter OTP carefully
- Request new OTP if expired
- Check for typos in OTP

---

### Issue: Auto-login not working
**Possible Causes:**
- Token expired
- Token decryption failed
- localStorage cleared

**Solution:**
- Login again manually
- Check browser localStorage settings
- Clear cache and try again

---

### Issue: Stuck on loading screen
**Possible Causes:**
- API timeout
- Network issue
- Backend server down

**Solution:**
- Refresh page
- Check internet connection
- Try again after some time

---

## Summary

The AuthModule provides:
- ✅ Phone-based OTP authentication
- ✅ Secure token storage with encryption
- ✅ Auto-login for returning users
- ✅ User-friendly OTP input interface
- ✅ Resend OTP functionality
- ✅ Loading states and error handling
- ✅ Login prompt modal for protected routes
- ✅ Session validation on app load

**Main Component:** Login.js handles all authentication logic

**Placeholder Components:** SignIn, SignUp, VerifyOTP (not yet implemented)

**Helper Component:** PleaseLoginModal for login prompts
