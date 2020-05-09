let ipUrl = 'http://127.0.0.1:7001/default/';//默认的部分
// 到时候换成了网址，直接在这里复制。该网址就行

let servicePath = {//服务端的地址
    // 变成key-value形式 接口
    getArticleList: ipUrl + 'getArticleList',//首页接口
    getArticleById: ipUrl + 'getArticleById/', //详细页接口
    getTypeInfo: ipUrl + 'getTypeInfo', //
    getListById: ipUrl + 'getListById/' //也是要传id的，所以记得也要加一个/，因为要加参数
} 

//要让外部能使用
export default servicePath