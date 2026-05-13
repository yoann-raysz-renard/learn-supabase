# Supabase Learning Plan — Todo App

Each step teaches one Supabase pillar. Complete them in order — they build on each other.

---

## Step 1 — Database + PostgREST

**What to build:** basic todo CRUD (list, add, toggle complete, delete)

**Tasks:**
- [ ] Install `@supabase/supabase-js`
- [ ] Create the Supabase client (env vars for URL + anon key)
- [ ] Write first migration: `todos` table (`id`, `title`, `is_complete`, `created_at`)
- [ ] Add seed data in `supabase/seed.sql`
- [ ] Build Angular todo list component (display todos)
- [ ] Add create todo (input + button)
- [ ] Add toggle complete (checkbox)
- [ ] Add delete todo

**Concepts:** migrations, PostgREST auto-generated API, `.select()` / `.insert()` / `.update()` / `.delete()`

---

## Step 2 — Auth

**What to build:** signup/login screen, guarded routes, logout

**Tasks:**
- [ ] Build login/signup form component
- [ ] Wire up `supabase.auth.signUp()` and `supabase.auth.signInWithPassword()`
- [ ] Create an Angular auth service that exposes the current session
- [ ] Listen to auth state changes with `supabase.auth.onAuthStateChange()`
- [ ] Add an Angular route guard to protect the todo list
- [ ] Add logout button
- [ ] Inspect confirmation emails in Inbucket (http://localhost:54324)

**Concepts:** Supabase Auth, JWT sessions, auth state listener, local email catcher

---

## Step 3 — Row Level Security (RLS)

**What to build:** per-user todo isolation — users only see and modify their own todos

**Tasks:**
- [ ] Add `user_id uuid references auth.users` column to `todos` (new migration)
- [ ] Set `user_id` automatically on insert (default `auth.uid()` or app-side)
- [ ] Enable RLS on the `todos` table
- [ ] Write SELECT policy: `auth.uid() = user_id`
- [ ] Write INSERT policy: `auth.uid() = user_id`
- [ ] Write UPDATE and DELETE policies
- [ ] Test policies in Supabase Studio (http://localhost:54323)
- [ ] Verify anon key cannot read other users' todos

**Concepts:** RLS policies, `auth.uid()`, anon key vs service role key, security at DB level

---

## Step 4 — Realtime

**What to build:** live-updating todo list (changes appear instantly across browser tabs)

**Tasks:**
- [ ] Enable Realtime on the `todos` table (Supabase Studio or migration)
- [ ] Subscribe to postgres changes with `supabase.channel().on('postgres_changes', ...)`
- [ ] Update the Angular component state reactively on INSERT / UPDATE / DELETE events
- [ ] Test by opening two browser tabs side by side

**Concepts:** Postgres CDC, Realtime channels, broadcast vs presence vs postgres_changes

---

## Step 5 — Storage

**What to build:** attach an image or file to a todo

**Tasks:**
- [ ] Create a `todo-attachments` storage bucket (private)
- [ ] Add file upload input to the todo detail view
- [ ] Upload files with `supabase.storage.from('todo-attachments').upload()`
- [ ] Retrieve files using signed URLs
- [ ] Add storage RLS policies (mirror the table policies: only owner can read/write)

**Concepts:** storage buckets, public vs private, signed URLs, storage RLS policies

---

## Step 6 — Edge Functions

**What to build:** a serverless function, e.g. return a summary of the user's todos

**Tasks:**
- [ ] Create a function with `supabase functions new todo-summary`
- [ ] Implement the Deno handler (query todos via supabase-js with service role)
- [ ] Serve locally with `supabase functions serve`
- [ ] Call it from Angular with `supabase.functions.invoke('todo-summary')`
- [ ] Display the result in the UI

**Concepts:** Edge Functions, Deno runtime, service role client inside a function, invoking from the browser
