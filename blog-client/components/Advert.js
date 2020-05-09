import '../public/style/components/Advert.css'
// 用全静态的形式编写，因为这里面的都是广告，变动的几率很小，如果写到数据库里，每次查询都要用到数据库，这样对数据库的压力很大
const Advert = () => {
    return (
        <div className="ad-div comm-box">
            {/* 这里的100%不是整个屏幕的100%，是占满父div的100%(相对于的父是ad-div) */}
            <div><img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=149394306,784079254&fm=26&gp=0.jpg" width="100%"></img></div>
            <div><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588417906991&di=31c53f82e79fcf8cb575271f4b1d0a08&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F111221%2F10011-1112211FS033.jpg" width="100%"></img></div>
            <div><img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1181001283,3304105179&fm=26&gp=0.jpg" width="100%"></img></div>

        </div>
    )
}

//导出组件
export default Advert;