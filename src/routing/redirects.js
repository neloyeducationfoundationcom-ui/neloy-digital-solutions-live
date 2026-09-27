const FUNNEL_URL = "https://info-digitalsolutions-neloy.systeme.io/6b5b820f";
const LANDING_PATH = "/web-design-bangladesh";

function landingRedirect(request, url) {
  if (request.method === "GET" && (url.pathname === LANDING_PATH || url.pathname === `${LANDING_PATH}/`)) {
    return Response.redirect(FUNNEL_URL, 301);
  }
}

export { FUNNEL_URL, landingRedirect };
