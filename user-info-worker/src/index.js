/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		const authHeader = request.headers.get('cf-access-jwt-assertion')
		if (!authHeader) {
			return new Response('Unauthorized', { status: 401 })
		}

		const url = new URL(request.url);

		if (url.pathname.endsWith('/secure') || url.pathname.endsWith('/secure/')) {
			// Extract the username from the Authorization header
			const token = atob(authHeader.split('.')[1]);
			const tokenData = JSON.parse(token);
			const email = tokenData.email;
			return new Response(`${request.url}<br><br><br>${email} authenticated at ${new Date()} from <a href="${url.href}/${request.cf.country}">${request.cf.country}</a>`, {
				headers: {
					"content-type": "text/html;charset=UTF-8",
				},
			});
		} else {
			const country = url.pathname.split('/')[2];
			const r2subdomain = env.R2_SUBDOMAIN;
			return fetch(`https://${r2subdomain}.r2.dev/${country}.jpg`, {
				headers: {
					"content-type": "image/jpeg",
				}
			});
		}
	},
};
