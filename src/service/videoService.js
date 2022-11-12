import { createClient } from '@supabase/supabase-js'

const PROJECT_URL = "https://jugenmkwwwiiwnuzmyio.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1Z2VubWt3d3dpaXdudXpteWlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMDM3MjAsImV4cCI6MTk4Mzc3OTcyMH0.3rOmyQ4hUU1X9N_HWpgAIV4OqIt3ttg5nzEZvZCURK4";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video").select("*").order("created_at", { ascending: false })
        }
    }
}