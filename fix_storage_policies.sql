    -- ================================================
    -- FIX: Storage Bucket RLS Policies for Profile Images
    -- ================================================
    -- This script creates proper RLS policies for storage buckets
    -- Run this in your Supabase SQL Editor

    -- ================================================
    -- IMPORTANT: First, create the storage buckets in Supabase Dashboard
    -- ================================================
    -- 1. Go to Storage in Supabase Dashboard
    -- 2. Create these buckets if they don't exist:
    --    - profile-pictures (set to PUBLIC)
    --    - banner-images (set to PUBLIC)
    --    - meme-uploads (set to PUBLIC)
    --
    -- Then run this SQL to set up the policies:

    -- ================================================
-- PROFILE PICTURES BUCKET POLICIES
-- ================================================

-- Drop existing policies first
DROP POLICY IF EXISTS "Public Access for Profile Pictures" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload profile pictures" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own profile pictures" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own profile pictures" ON storage.objects;

-- Allow anyone to read profile pictures (since bucket is public)
CREATE POLICY "Public Access for Profile Pictures"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-pictures');

-- Allow authenticated users to upload their own profile pictures
CREATE POLICY "Users can upload profile pictures"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-pictures' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to update their own profile pictures
CREATE POLICY "Users can update own profile pictures"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-pictures'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own profile pictures
CREATE POLICY "Users can delete own profile pictures"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-pictures'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- ================================================
-- BANNER IMAGES BUCKET POLICIES
-- ================================================

-- Drop existing policies first
DROP POLICY IF EXISTS "Public Access for Banner Images" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload banner images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own banner images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own banner images" ON storage.objects;

-- Allow anyone to read banner images (since bucket is public)
CREATE POLICY "Public Access for Banner Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'banner-images');

-- Allow authenticated users to upload their own banner images
CREATE POLICY "Users can upload banner images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'banner-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to update their own banner images
CREATE POLICY "Users can update own banner images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'banner-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own banner images
CREATE POLICY "Users can delete own banner images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'banner-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- ================================================
-- MEME UPLOADS BUCKET POLICIES
-- ================================================

-- Drop existing policies first
DROP POLICY IF EXISTS "Public Access for Meme Uploads" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload memes" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own memes" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own memes" ON storage.objects;

-- Allow anyone to read meme uploads (since bucket is public)
CREATE POLICY "Public Access for Meme Uploads"
ON storage.objects FOR SELECT
USING (bucket_id = 'meme-uploads');

-- Allow authenticated users to upload memes
CREATE POLICY "Users can upload memes"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'meme-uploads'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to update their own memes
CREATE POLICY "Users can update own memes"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'meme-uploads'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own memes
CREATE POLICY "Users can delete own memes"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'meme-uploads'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
    -- ================================================
    -- Verify the policies were created
    -- ================================================
    SELECT schemaname, tablename, policyname, permissive, roles, cmd
    FROM pg_policies
    WHERE tablename = 'objects'
    ORDER BY policyname;

    -- ================================================
    -- Your profile picture and banner uploads should now work!
    -- ================================================
