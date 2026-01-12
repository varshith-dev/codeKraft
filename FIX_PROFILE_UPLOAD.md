# 🔧 Quick Fix: Profile Picture Upload Error

## Problem
Getting error: **"Failed to upload profile picture: new row violates row-level security policy"**

## Root Cause
The storage buckets don't have proper RLS policies set up to allow authenticated users to upload images.

---

## Solution (2 Steps)

### Step 1: Create Storage Buckets
1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Create these buckets (if they don't exist):
   - `profile-pictures` ← Set to **PUBLIC**
   - `banner-images` ← Set to **PUBLIC**
   - `meme-uploads` ← Set to **PUBLIC**

**Important:** Make sure to toggle "Public bucket" to **ON** for each bucket!

---

### Step 2: Run SQL to Set RLS Policies
1. Go to **SQL Editor** in Supabase
2. Open the file `fix_storage_policies.sql`
3. Copy and paste the entire contents
4. Click **Run** (or press Ctrl+Enter)
5. You should see "Success" message

---

## Test the Fix
1. Go to your profile page
2. Click **Edit Profile**
3. Try uploading a profile picture or banner image
4. Click **Save Changes**
5. ✅ It should work without errors!

---

## What This Does
The SQL script creates proper RLS policies that:
- Allow **anyone** to view/read images (since buckets are public)
- Allow **authenticated users** to upload their own images
- Allow **users** to update/delete only their own images
- Organizes files by user ID for security

---

## Still Having Issues?

If you still get errors, check:
1. ✅ Buckets are set to **PUBLIC** in Supabase Dashboard
2. ✅ You're logged in (authenticated)
3. ✅ The SQL script ran without errors
4. ✅ Try logging out and back in
