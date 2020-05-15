import React, { useState, useEffect } from 'react';
import marked from 'marked' //要安装一下 //处理markdown的
// 还要使用一个css样式
import '../static/css/AddArticle.css'
// 使用antd中想要的组件
// 因为是表单，所以肯定有input,还有对类别进行选择的组件Select,提交按钮,日期选择
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import axios from 'axios' //引入后台获得数据的方法
import servicePath from '../config/apiUrl'
const { Option } = Select // 下拉列表中的每一项，这个需要解析出来
const { TextArea } = Input // 多行文本框，这个是在Input里面的，所以注意引入的方式


function AddArticle(props) {
    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息//这里会从后台读出所有文章分类
    const [selectedType, setSelectType] = useState('请选择类型') //选择的文章类别

    //使用获取文章列表信息
    //他也是一个方法，接受一个匿名函数,第二个参数是数组空的意思是只执行一次，就是一进来页面的时候
    useEffect(() => {
        getTypeInfo()
        //获取文章id
        let tmpId = props.match.params.id
        if (tmpId) {
            setArticleId(tmpId)
            getArticleById(tmpId)
        }
        // eslint-disable-next-line
    }, [])
    // 设置marked
    const renderer = new marked.Renderer()
    marked.setOptions({
        renderer: renderer, //后面的是我们的new的实例
        gfm: true,
        pedantic: false,
        sanitize: false,//原始输出，忽略html
        breaks: false,//不使用github的换行符
        smartLists: true,
        smartypants: false//使用更为时髦的标点，比如在引用语法中加入破折号。
    })
    // 变化的时候，右边的预览也要跟着变，一个change方法
    // 传一个e,因为要接受多行文本框中的e
    const changeContent = (e) => {
        // 怎么获得值呢？然后赋给左边的setArticleContent
        setArticleContent(e.target.value);
        // 然后把获得的值用marked转换一下 //？？我们后台保存的值是articleContent,不是转换的值
        let html = marked(e.target.value);//转换成html
        setMarkdownContent(html); //把转换后的赋值给右边预览
    }
    // 文章简介的预览实现
    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value);
        let html = marked(e.target.value);
        setIntroducehtml(html);
    }
    //获得文章类别信息的方法
    const getTypeInfo = () => {
        // 获取远端数据
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            withCredentials: true, //如果要使用跨域cookie就要加这个，因为我们的中间件就是要检验cookie,所以要加这个
        }).then(
            res => {
                if (res.data.data === '没有登录') { //这是后台返回的 中间件路由守卫那里返回的
                    localStorage.removeItem('openId') //没有登录，删除存储信息
                    props.history.push('/') //然后要跳转，需要props
                } else {
                    setTypeInfo(res.data.data) //登录成功，要为文章类型设置值
                }
            }
        )
    }
    // 改变Select
    const selectTypeHandler = (value) => {
        setSelectType(value)
    }
    // 保存文章的时候执行的方法，检验
    const saveArticle = () => { //不用传值了，因为都已经用hooks获得了
        // 是否选择了文章类型,文章标题
        if (selectedType === '请选择类型') {
            message.error('请选择文章类型');
            return false //直接false,就不用存进数据库
        } else if (!articleTitle) {
            message.error('文章标题不能为空');
            return false //直接false,就不用存进数据库
        } else if (!articleContent) {
            message.error('文章内容不能为空');
            return false //直接false,就不用存进数据库
        } else if (!introducemd) {
            message.error('文章简介不能为空');
            return false //直接false,就不用存进数据库
        } else if (!showDate) {
            message.error('发布日期不能为空');
            return false //直接false,就不用存进数据库
        }
        // message.success('检验通过')
        // 首先要声明一个局部的变量，相当于props参数，这里他是一个对象
        // 注意，dataProps对象的名字，要跟数据库的字段一样比如title
        let dataProps = {}
        dataProps.type_id = selectedType; //article表的文章类型
        dataProps.title = articleTitle;
        dataProps.article_content = articleContent;
        dataProps.introduce = introducemd; //文章简介
        // 发布时间，因为这里我们传递过来的是一个字符串，如果直接传递的是时间就不用这步
        // 把字符串变成文本的形式,
        // 进行replace，把-换成/，变成一个可以转变的字符串
        // let dataText = showDate.replace('-','/')
        // dataProps.addTime = (new Date(dataText).getTime())/1000 //时间戳转换，处以以1000就是不需要到秒
        // console.log(showDate);
        dataProps.addTime = showDate;
        // 能把selectType传过去，最后把dataProps用axios传到中台，然后中台就能获得了
        // 然后要到接口中存数据
        // 判断是增加还是修改,
        if (articleId === 0) { //是0的话就是增加，如果是已经有了的,那就是修改（也就是接口那里做了一个返回的id)
            // 说明是新增加
            // 加一个访问时间//用来做文章访问次数的
            dataProps.view_count = 0; //如果是修改，这里就不能为0，要获取原来的值然后赋值？？
            axios({
                method: 'post',
                url: servicePath.addArticle,
                data: dataProps,
                withCredentials: true //还需要使用中间件路由守卫//让cookie起作用，可以跨域
            }).then(
                res => {
                    // ？？？
                    setArticleId(res.data.insertId) //这样再次保存的时候就是修改，不是新增了
                    if (res.data.isSuccess) {
                        message.success('发布成功')
                    } else {
                        message.error('发布失败')
                    }
                }
            )
        } else {
            // 这里是修改
            // 这里要传文章id，记得
            dataProps.id = articleId //就是要修改哪条
            // 然后就可以调用接口修改数据了
            axios({
                method: 'post',
                url: servicePath.updataArticle,
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    if (res.data.isSuccess) {
                        message.success('更新成功');
                    } else {
                        message.error('修改失败');
                    }
                }
            )
        }
    }
    // 通过id获取文章,主要是把修改时，要修改的内容显示出来
    const getArticleById = (id) => {
        axios(servicePath.getArticleById + id, { withCredentials: true }).then(
            res => {
                console.log(res.data.data[id - 1]);
                let articleInfo = res.data.data[id - 1] //是一个数组 //这里注意
                setArticleTitle(articleInfo.title);
                setArticleContent(articleInfo.article_content);
                // 对应的还要把预览地方的markdown放上去
                let html = marked(articleInfo.article_content);
                setMarkdownContent(html);
                setIntroducemd(articleInfo.introduce);
                let temInt = marked(articleInfo.introduce)
                setIntroducehtml(temInt);
                setShowDate(articleInfo.addTime);
                setSelectType(articleInfo.typeId)
            }
        )
    }
    // 暂存文章
    // const temSaveArticle = () => {
    //     
    // }

    return (
        // 页面分为两个部分文章内容和预览内容
        <div>
            {/* 间距gutter5个像素 */}
            <Row gutter={5}>
                {/* Col是24格布局 */}
                {/* 左边 */}
                <Col span={18}>
                    <Row gutter={10}>
                        {/* 最上面那一行 */}
                        <Col span={20}>
                            <Input
                                // 然后要加上我们写的值，articleTitle，不写是不会发生变化的，
                                value={articleTitle}
                                placeholder="博客标题"
                                size="large"
                                onChange={e => { setArticleTitle(e.target.value) }}
                            ></Input>
                        </Col>
                        {/* 类别选择*/}
                        {/* defaultValue默认选哪个 */}
                        {/* Option中的value要跟select对应 */}
                        <Col span={4}>
                            {/* 获取到接口的数据之后，放值 */}
                            <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                                {/* <Option value="1">视频教程</Option> */}
                                {
                                    // 用map的形式循环
                                    typeInfo.map((item, index) => {
                                        return (
                                            // 记住是有一个key值的
                                            <Option key={index} value={item.id}>{item.typeName}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    {/* 行里面列的间距 */}
                    <Row gutter={10}>
                        {/* 左右都是12，对半分 */}
                        <Col span={12}>
                            {/* 多行文本框，antd的组件 */}
                            {/* rows:默认行数是35行，其实也就相当于默认的高 */}
                            <TextArea
                                className="markdown-content"
                                rows={35}
                                placeholder="文章内容"
                                value={articleContent}
                                onChange={changeContent}></TextArea>
                        </Col>
                        <Col span={12}>
                            <div className="show-html"
                                dangerouslySetInnerHTML={{ __html: markdownContent }}>
                                {/* 记住这里不能直接写markdownContent，也就是html, 要用那个属性的方法*/}
                            </div>
                        </Col>
                    </Row>
                </Col>
                {/* 右边 */}
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            {/* 用样式分开一点 */}
                            <Button size="large" >暂存文章</Button>
                            {/* 主按钮：用于主行动点，一个操作区域只能有一个主按钮 */}
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                        </Col>
                        <Col span={24}>
                            {/* 简介以后也是要用markdown转化为html */}
                            <TextArea
                                className="markdown-introduce"
                                rows={4}
                                placeholder="文章简介"
                                value={introducemd}
                                onChange={changeIntroduce}
                            ></TextArea>
                            {/* 预览 */}
                            <div className="introduce-html"
                                dangerouslySetInnerHTML={{ __html: introducehtml }}>
                                {/* introducehtml这个值是已经用marked转换了的 */}
                            </div>
                        </Col>
                        {/* 发布日期 */}
                        {/* 有一个自带的onChange方法，第二个参数，就是把我们的日期转化为String的 */}
                        <Col span={12}>
                            <div className="data-select">
                                <DatePicker
                                    placeholder="发布日期"
                                    size="large"
                                    onChange={(data, dataString) => { setShowDate(dataString) }}></DatePicker>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle;
