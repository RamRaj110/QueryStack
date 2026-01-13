const ROUTES = {
    HOME: '/',
    ABOUT: '/about',
    CONTACT: '/contact',
    BLOG: '/blog',
    SERVICES: '/services',
    SIGNUP: '/signup',
    SIGNIN: '/signin',
    COLLECTION: '/collection',
    COMMUNITY: '/community',
    TAGS: '/tags',
    JOBS:'/jobs',
    ASK_QUESTION: '/ask-question',
    PROFILE:(id: string) => `/profile/${id}`,
    QUESTION:(id: string) => `/question/${id}`,
    TAG: (id: string) => `/tags/${id}`,
    SIGN_IN_WITH_OAUTH:'/signin-with-oauth',
    NOT_FOUND: '/not-found',
}

export default ROUTES;