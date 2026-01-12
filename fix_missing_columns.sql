-- ================================================
-- FIX: Missing Columns in Profiles Table
-- ================================================
-- This script adds the missing columns that the application expects
-- Run this in your Supabase SQL Editor

-- Add missing columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS website TEXT,
ADD COLUMN IF NOT EXISTS profile_picture_url TEXT,
ADD COLUMN IF NOT EXISTS banner_image_url TEXT;

-- Verify the columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'profiles'
ORDER BY ordinal_position;

-- ================================================
-- Your profile updates should now work!
-- ================================================
-- After running this, you can:
-- 1. Update your display name and bio
-- 2. Upload profile pictures
-- 3. Upload banner images
