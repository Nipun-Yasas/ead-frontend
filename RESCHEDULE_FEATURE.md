# Appointment Reschedule Feature - Implementation Summary

## ✅ Feature Overview

The reschedule feature allows administrators to send customers multiple alternative time slots when an appointment needs to be rescheduled. Each time slot generates a unique booking link that auto-fills the customer's booking form.

## 🎯 Key Components Created/Modified

### 1. **RescheduleModal.tsx** (New Component)
Location: `src/components/admin/appointments/RescheduleModal.tsx`

**Features:**
- ✅ Add multiple reschedule date/time options
- ✅ Generate unique booking links for each option with query parameters
- ✅ Email preview showing formatted message with all links
- ✅ Automatic appointment status change to REJECTED when email sent
- ✅ Professional email template with customer details
- ✅ Form validation (no past dates, required fields)
- ✅ Real-time link generation with full URL encoding

**Query Parameters Generated:**
```
?date=2025-11-10&time=09:00&vehicleType=car&vehicleNumber=ABC123&service=maintenance&reschedule=true
```

### 2. **AppointmentsByStatus.tsx** (Modified)
Location: `src/components/admin/appointments/AppointmentsByStatus.tsx`

**Changes:**
- ✅ Added "Reschedule" button next to "Change Status" button
- ✅ Imported RescheduleModal component
- ✅ Added state management for reschedule modal
- ✅ Added handler functions for modal open/close/success
- ✅ Integrated success feedback with snackbar notifications

### 3. **BookingAppointment.tsx** (Modified)
Location: `src/components/customer/BookingAppointment.tsx`

**Changes:**
- ✅ Added `useSearchParams` hook to read URL parameters
- ✅ Auto-fill form on component mount when `reschedule=true` parameter present
- ✅ Parse and populate: date, time, vehicleType, vehicleNumber, service
- ✅ Show info snackbar when form is auto-filled
- ✅ Updated snackbar to support 'info' severity

## 🔄 User Flow

### Admin Side (Rescheduling):

1. **Navigate to Appointments**
   - Admin goes to any appointment status view (Pending, Approved, etc.)

2. **Click "Reschedule" Button**
   - Orange outlined button appears on each appointment card
   - Opens RescheduleModal dialog

3. **Add Reschedule Options**
   - Select date using date picker (can't select past dates)
   - Select time using time picker
   - Click "+" button to add option
   - Repeat to add multiple options
   - View generated links in real-time

4. **Review Email Preview**
   - See formatted email message
   - Each option shows formatted date/time
   - Each option includes clickable booking link

5. **Send Email**
   - Click "Send Reschedule Email & Reject" button
   - System sends email via `/api/email/send` endpoint
   - Appointment status automatically changed to "REJECTED"
   - Success notification appears
   - Appointment list refreshes

### Customer Side (Rebooking):

1. **Receive Email**
   - Customer gets email with multiple time slot options
   - Each option has a clickable link

2. **Click Preferred Time Link**
   - Opens booking page with URL parameters
   - Example: `/booking-appointment?date=2025-11-10&time=09:00&...`

3. **Form Auto-Fills**
   - Date field pre-filled
   - Time field pre-filled
   - Vehicle type pre-filled
   - Vehicle number pre-filled
   - Service type pre-filled
   - Info message: "Form auto-filled from reschedule link. Please review and confirm."

4. **Review and Submit**
   - Customer reviews pre-filled information
   - Can modify if needed
   - Submits new appointment

## 📧 Email Template

### Subject
"Message from AutoCare"

### Content Structure
```
Dear [Customer Name],

We regret to inform you that we need to reschedule your appointment for [Service] service on your [Vehicle Type] ([Vehicle Number]).

We apologize for any inconvenience this may cause. Please choose one of the following alternative time slots to book your new appointment:

Option 1: Monday, November 10, 2025 at 09:00 AM
   Click here to book: [Full URL with parameters]

Option 2: Tuesday, November 11, 2025 at 02:00 PM
   Click here to book: [Full URL with parameters]

Option 3: Wednesday, November 12, 2025 at 10:30 AM
   Click here to book: [Full URL with parameters]

Each link will automatically fill in your vehicle and service details. Simply click your preferred time slot and confirm your booking.

If none of these times work for you, please contact us directly to find a suitable alternative.

We appreciate your understanding and look forward to serving you.

Best regards,
AutoCare Team
```

## 🔌 API Endpoints Used

### 1. Send Email
```
POST /api/email/send
Headers: Authorization: Bearer {token}
Body: {
  "email": "customer@example.com",
  "message": "{formatted reschedule message}"
}
```

### 2. Update Appointment Status
```
PATCH /appointments/{id}/status
Headers: Authorization: Bearer {token}
Body: {
  "status": "REJECTED",
  "notes": "Appointment rescheduled - email sent with alternative time slots"
}
```

## 🎨 UI Components

### Reschedule Button
- **Style:** Outlined button with warning color
- **Icon:** EventRepeatIcon (calendar with arrows)
- **Position:** Left side, next to "Change Status" button
- **Hover Effect:** Scale up with orange background

### Modal Dialog
- **Width:** Medium (md)
- **Sections:**
  1. Header with customer info
  2. Date/Time input section
  3. Options list with remove buttons
  4. Email preview section
  5. Action buttons (Cancel, Send)

### Date/Time Inputs
- **Date Picker:** HTML5 date input with min validation
- **Time Picker:** HTML5 time input
- **Add Button:** Circular icon button with primary color

### Options List
- **Display:** Bordered list items
- **Each Item Shows:**
  - Option number chip
  - Formatted date/time
  - Generated booking link (truncated)
  - Delete button

## 🛡️ Validation & Error Handling

### Form Validation
- ✅ Date and time required to add option
- ✅ Cannot select dates in the past
- ✅ At least one option required to send email
- ✅ Duplicate prevention not implemented (users can add same time)

### Error States
- ✅ Network errors caught and displayed
- ✅ API errors shown in alert banner
- ✅ Loading states during email sending
- ✅ Disabled buttons during processing

### Success Handling
- ✅ Success message shown via snackbar
- ✅ Modal automatically closes
- ✅ Appointment list refreshes
- ✅ Form resets for next use

## 🔗 Generated Link Format

**Base URL:** `{window.location.origin}/booking-appointment`

**Query Parameters:**
- `date` - YYYY-MM-DD format
- `time` - HH:mm format (24-hour)
- `vehicleType` - car, van, jeep, cab, truck
- `vehicleNumber` - License plate number
- `service` - Service type
- `reschedule` - Always "true" to trigger auto-fill

**Example Link:**
```
https://yourapp.com/booking-appointment?date=2025-11-10&time=09:00&vehicleType=car&vehicleNumber=ABC123&service=maintenance&reschedule=true
```

## 📱 Responsive Design

- ✅ Modal is mobile-friendly
- ✅ Date/Time inputs stack on small screens
- ✅ Links wrap properly in email preview
- ✅ Buttons resize appropriately

## 🎯 Testing Checklist

### Admin Reschedule Flow
- [ ] Click Reschedule button opens modal
- [ ] Add multiple time slots
- [ ] Remove time slots
- [ ] View email preview updates
- [ ] Send email succeeds
- [ ] Appointment status changes to REJECTED
- [ ] Success message appears
- [ ] Modal closes automatically

### Customer Rebooking Flow
- [ ] Click email link opens booking page
- [ ] Form auto-fills with all parameters
- [ ] Info message displays
- [ ] Can modify pre-filled data
- [ ] Can submit appointment successfully

### Edge Cases
- [ ] Cannot select past dates
- [ ] Cannot send without options
- [ ] Error handling for network failures
- [ ] Loading states work correctly
- [ ] Invalid URL parameters handled gracefully

## 🚀 Future Enhancements (Optional)

1. **Copy Link Button** - Quick copy to clipboard
2. **SMS Support** - Send reschedule options via SMS
3. **Calendar Integration** - Add to Google/Outlook calendar
4. **Duplicate Prevention** - Warn if adding same time
5. **Timezone Support** - Handle different timezones
6. **Template Customization** - Allow custom email messages
7. **Batch Reschedule** - Reschedule multiple appointments
8. **Appointment History** - Track reschedule history
9. **Customer Preferences** - Remember preferred times
10. **Automated Reminders** - Follow-up if customer doesn't rebook

## 📝 Notes

- Email sending is asynchronous - API responds immediately
- Appointment status change is synchronous - waits for confirmation
- Links are URL-encoded to handle special characters
- All dates/times use user's local timezone
- Email template uses professional AutoCare branding
- Modal state resets on close for clean next use

## ✨ Success Indicators

When implementation is complete, you should see:
- ✅ Orange "Reschedule" button on all appointment cards
- ✅ Modal opens with customer information
- ✅ Can add/remove multiple time slots
- ✅ Email preview shows formatted message
- ✅ Sending email updates appointment to REJECTED
- ✅ Customer links auto-fill booking form
- ✅ Info notification shows when form auto-fills
