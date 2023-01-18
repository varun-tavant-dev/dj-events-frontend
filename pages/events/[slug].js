import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import qs from 'qs'

import { parseCookies } from '@/helpers/index'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'

export default function EventPage({ evt, token }) {
    const router = useRouter()
    
    const deleteEvent = async (e) => {
        if(confirm('Are you sure?')) {
            const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            const data = await res.json()
            
            if (!res.ok) {
                if (res.status === 403 || res.status === 401) {
                    toast.error(res.statusText)
                    return
                }
                toast.error(data.message)
            } else {
                router.push(`/events`)
            }
        }
    }

    return (
        <Layout>
        <div className={styles.event}>
            <div className={styles.controls}>
                <Link href={`/events/edit/${evt.id}`}>
                    <FaPencilAlt /> Edit Event
                </Link>
                <a href="#" className={styles.delete} onClick={deleteEvent}>
                    <FaTimes /> Delete Event
                </a>
            </div>
            <span>
                {new Date(evt.attributes.date).toLocaleDateString('en-US')} at {evt.attributes.time}
            </span>
            <h1>{evt.attributes.name}</h1>
            <ToastContainer />

                    <div className={styles.image}>
                        <Image
                            src={
                              evt.attributes?.image?.data
                                ? evt.attributes.image.data.attributes?.formats?.medium?.url
                                : '/images/event-default.png'
                            }
                            width={960}
                            height={600}
                            alt={evt.attributes.name}
                        />
                    </div>

            <h3>Performers:</h3>
            <p>{evt.attributes.performers}</p>
            <h3>Description:</h3>
            <p>{evt.attributes.description}</p>
            <h3>Venue: {evt.attributes.venue}</h3>
            <p>{evt.attributes.address}</p>

            <Link href='/events'className={styles.back}>{'<'} Go Back
            </Link>
        </div>
        </Layout>
    )
}

// export async function getStaticPaths() {
//     const res = await fetch(`${API_URL}/api/events`)
//     const events = await res.json()

//     const paths = events.data.map((evt) => ({
//         params: { slug: evt.attributes.slug },
//     }))

//     return {
//         paths,
//         fallback: true,
//     }
// }

// export async function getStaticProps({ params: { slug } }) {
//     const res = await fetch(`${API_URL}/api/events?slug=${slug}`)
//     const events = await res.json()
    
//     return {
//         props: {
//             evt: events.data[0],
//         },
//         revalidate: 1,
//     }
// }

export async function getServerSideProps({req, query : { slug}}) {
    const headerQuery = qs.stringify({
        filters: {slug: {$eq: slug}},
    }, {
        encodeValuesOnly: true, // prettify URL
    })
    const res = await fetch(`${API_URL}/api/events?${headerQuery}&populate=*`)
    const events = await res.json()
    
    const { token } = parseCookies(req)

    // return {
    //     props: {
    //         token,
    //     },
    // }
    return {
        props: {
            evt: events.data[0],
            token
        },
    }
}