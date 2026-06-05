import { createClient } from '@supabase/supabase-js'

const supabaseUrl =https://dxazxsbuzeqilgsodvxh.supabase.co

const supabaseKey =sb_publishable_rVBL0VZr5O-e9u-Ch6TQPA_qDRGZSpJ

console.log('URL:', supabaseUrl)
console.log('KEY:', supabaseKey)

export const supabase = createClient(
  supabaseUrl!,
  supabaseKey!
)