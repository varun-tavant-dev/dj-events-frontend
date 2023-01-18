import Link from 'next/link'

import Layout from "@/components/Layout"
import { API_URL, PER_PAGE } from '@/config/index'
import EventItem from '@/components/EventItem'
import Pagination from '@/components/Pagination'

const EventsPage = ({events, page, total}) => {
    return (
        <Layout>
            <h1>Upcoming Events</h1>
            {events.length === 0 && <h3>No events to show</h3>}

            {events.map((evt) => (
                <EventItem key={evt.id} event={evt} />
            ))}

            {/* {events.length > 0 && (
                <Link href='/events' className='btn-secondary'>View All Events
                
                </Link>
            )} */}

            <Pagination page={page} total={total} />
        </Layout>

    )
}

export default EventsPage

// export async function getStaticProps() {
//     const res = await fetch(`${API_URL}/api/events?_sort=date:ASC&_limit=3&populate=*`)
//     const events = await res.json()
  
//     return {
//         props: { events: events.data },
//         revalidate: 1,
//     }
// }

export async function getServerSideProps({ query: { page = 1 } }) {
    // Calculate start page
    const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE
  
    // Fetch events
    const eventRes = await fetch(
      `${API_URL}/api/events?pagination[limit]=${PER_PAGE}&pagination[start]=${start}&populate=*`
    )
    const events = await eventRes.json()
    
    return {
      props: { events : events.data, page: +page, total: events.meta.pagination.total },
    }
}