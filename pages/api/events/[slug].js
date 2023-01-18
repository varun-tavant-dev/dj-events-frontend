// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {events} from './data.json'

export default (req, res) => {
    const event = events.filter(evt => evt.slug === req.query.slug)
    if(req.method === 'GET')
        res.status(200).json(event)
    else {
        res.setHeader('Allow',['GET'])
        res.status(405).json({ message : `Method ${req.method} is not allowed`})
    }
}
