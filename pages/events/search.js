import Link from 'next/link'
import qs from 'qs'
import { useRouter } from 'next/router'

import Layout from "@/components/Layout"
import { API_URL } from '@/config/index'
import EventItem from '@/components/EventItem'

const SearchPage = ({events}) => {
    const router = useRouter()
    return (
        <Layout>
            <Link href="/events">Go Back</Link>
            <h1>Search Results for : ${router.query.term}</h1>
            {events.length === 0 && <h3>No events to show</h3>}

            {events.map((evt) => (
                <EventItem key={evt.id} event={evt} />
            ))}

            {events.length > 0 && (
                <Link href='/events' className='btn-secondary'>View All Events
                
                </Link>
            )}
        </Layout>

    )
}

export default SearchPage

export async function getServerSideProps({query : { term}}) {
    const query = qs.stringify({
        filters: {
            $or: [
                { name: {$containsi: term}},
                { venue: {$containsi: term}},
                { performers: {$containsi: term}},
                { description: {$containsi: term}},
            ],
        },
    }, {
        encodeValuesOnly: true, // prettify URL
    })

    const res = await fetch(`${API_URL}/api/events?${query}&populate=*}`)
    const events = await res.json()
    
    return {
        props: { events: events.data },
    }
}
