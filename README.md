# Vercel Geo IP

Vercel offers geo IP headers to accounts using the Pro or Teams tier. Hobby
tier (free) cannot be upgraded to Pro or Teams, so I have created a new team
and am using the free 14 day trial to play around with these headers to see
how useful they would be to me and if they are worth the upgrade.

I am tracking a few basic things:

- A hit to the middleware
- A hit to an API route
- A UI hit from the client

The order in which they should happen is UI, middleware, API. The database used
to store this data is Supabase. I am tracking the geo IP headers of each request
as well as the possible IP values provided by various Node and Vercel APIs to
see which address Vercel uses to fetch the geo IP data:

- `request.ip` in the middleware
- `request.socket.remoteAddress` in the API route handler
- `X-Real-IP` and `X-Forwarded-For` in both

I think Vercel uses `X-Forwarded-For` for the geo IP stuff. Vercel uses AWS for
the free hosting of your deployments, so some of the IPs showing up are AWS from
the region used to host the app. In my case, this is the AWS Germany IP range,
which can be verified using https://ipinfo.io, however, interestingly, I cannot
find those AWS IPs identified as such by IP Info in the AWS IP ranges JSON at
https://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html. I am not sure
why this is.

## To-Do

### Track `request.socket.localAddress` as remote address is always localhost

I think I got the wrong end of the two.

### Decypher hits from the middleware to the API routes, how they show up

In some of my projects, my middleware is making calls to the API route handlers
and I am curious to see if I can still get the original IP (my IP) in this
scenario of if I'll just see an AWS to AWS call being made with no obvious
trace of the originator IP.
