module.exports = app => {
    const { router, controller } = app
    // 路由守卫
    // 这里的adminauth不用引入，这是我们的框架自带的，直接用app可以使用我们的中间件app.middleware
    var adminauth = app.middleware.adminauth() //会帮我们生成这个方法
    // 用的时候，加在第二个参数上就行了
    router.get('/admin/index',controller.admin.main.index)
    router.post('/admin/checkLogin', controller.admin.main.checkLogin) //记得跟方法对应起来
    router.get('/admin/getTypeInfo',adminauth, controller.admin.main.getTypeInfo)//使用路由守卫
    // 守卫放在第二个参数处，他会自动帮我们进行中间件（其实这个不叫守卫，在egg.js中叫做中间件）
    // 保存文章内容 也加上路由守卫
    router.post('/admin/addArticle',adminauth, controller.admin.main.addArticle)//使用路由守卫
    router.post('/admin/updataArticle',adminauth, controller.admin.main.updataArticle)//使用路由守卫
    router.get('/admin/getArticleList',adminauth, controller.admin.main.getArticleList)//使用路由守卫
    router.get('/admin/delArticle/:id',adminauth, controller.admin.main.delArticle)//使用路由守卫
    router.get('/admin/getArticleById/:id',adminauth, controller.admin.main.getArticleById)//使用路由守卫
    
}

// 配置路由，然后要引入到app/router.js中，这里的app才有用