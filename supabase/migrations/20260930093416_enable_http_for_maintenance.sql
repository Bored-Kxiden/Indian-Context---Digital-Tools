-- Synchronous HTTP from SQL, used for maintenance (loading the chat index, calling index-sync).
create extension if not exists http with schema extensions;
revoke all on function extensions.http_get(varchar) from anon, authenticated;
revoke all on function extensions.http_post(varchar, varchar, varchar) from anon, authenticated;
