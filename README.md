# PayGuard – Payment Tracking and Verification System

#### PayGuard is a secure, role-based payment management system built with Next.js, Tailwind CSS, MongoDB, and Prisma. It allows users to track payment requests, upload verification documents, and process payments using PayPal Sandbox, while admins manage and verify those requests through a responsive dashboard.

[========]

## Features

### Authentication

- Role-based access control (Admin/User).
- Secure signup and login functionality implemented with Auth.js.

### User Features

- Create payment requests with a title, amount, and status.
- Upload verification documents (PDF/JPG/PNG) stored in Cloudinary.
- Track payment requests and their statuses (Pending, Approved, Rejected).
- Make payments through PayPal Sandbox.

### Admin Features

- View and manage all payment requests.
- Approve or reject payment requests and update their status.
- Review uploaded verification documents.
- Filter payments by status and date.

### Notifications

- Email updates for status changes sent using Resend.
- This feature is build but havent used

### Tech Stack

- Frontend: Next.js (React), Tailwind CSS
- Backend: Next.js API Routes
- Database: MongoDB
- ORM: Prisma
- Authentication: Auth.js
- Payments: PayPal Sandbox
- File Storage: Cloudinary
- Email Service: Resend
- Hosting: Vercel

[========]

### Setup Instructions

#### Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### Install Dependencies

###### Since some dependencies do not natively support Next.js, use the --force flag to install dependencies:

```bash
npm install --force
```

### Set Up Environment Variables

###### Create a .env file in the root directory and add the following variables:

    DATABASE_URL=<Your MongoDB Connection String>
    AUTH_SECRET=<Your Auth.js Secret Key>
    RESEND_API_KEY=<Your Resend API Key>
    NEXT_PUBLIC_PAYPAL_CLIENT_ID=<Your PayPal Sandbox Client ID>
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
    NEXT_PUBLIC_CLOUDINARY_API_KEY=<Your Cloudinary API Key>
    CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>

### Run Database Migrations & Prisma

    npx pirsma generate
    npx prisma db push
    npx prisma migrate dev

### Development Server

```bash
npm run dev
```

[========]

## API Details

### Authentication

- POST /api/auth/callback: Handles login via Auth.js.
- POST /api/auth/session: Handles session retrieval.

### Payment Management

- POST /api/create-payment: Create a new payment request.
- POST /api/get-payments: Retrieve payment requests (role-based: user/admin).
- PUT /api/change-payment-status: Update payment status (admin only).

### Document Upload

- Used nextjs server action for easy management: Upload a document for verification.
- Used nextjs server action for easy management (role-based: user/admin).

### PayPal Integration

- POST /api/paypal/checkout: Initiates a payment through PayPal Sandbox.

### Email Notifications

- POST /api/email: Sends email notifications via Resend.

[========]

## Test User/Admin Credentials

### Admin Login

- Email: `admin@test.com`

- Password: `admin123`

### User Login

- Email: `user@test.com`

- Password: `user123`

[========]

## Live Application URL

##### [PayGuard Hosted on Vercel](https://payguard-dev.vercel.app "PayGuard Hosted on Vercel")

[========]

### Contact Me-

##### sakibhassan.webdev@gmail.com
