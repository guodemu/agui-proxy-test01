addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const upstream = 'four.meme'

async function handleRequest(request) {
  const url = new URL(request.url)
  url.hostname = upstream

  const modifiedRequest = new Request(url, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow'
  })

  const response = await fetch(modifiedRequest)

  const newHeaders = new Headers(response.headers)
  newHeaders.set('Access-Control-Allow-Origin', '*')
  newHeaders.delete('Content-Security-Policy')
  newHeaders.delete('Content-Security-Policy-Report-Only')

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  })
}
