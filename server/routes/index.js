
const routes = [
    { path: '/auth', router: require('./authRoutes.js') },
    { path: '/blog', router: require('./blogRoute.js') },
    { path: '/dashboard', router: require('./dashboardRoute.js') },
    { path: '/comment', router: require('./commentRoute.js') },
]


const setRoutes = (app) => {
    routes.forEach(route => {
        app.use(route.path, route.router)
    })
}

module.exports = setRoutes;