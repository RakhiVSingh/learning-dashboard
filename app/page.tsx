import { createClient } from '@supabase/supabase-js'
import DashboardClient from './components/DashboardClient'

export default async function Home() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  
  const { data: courses, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching courses:', error)
    return <div style={{ color: 'white', padding: '20px' }}>Error loading courses: {error.message}</div>
  }
  
  return <DashboardClient courses={courses} />
}