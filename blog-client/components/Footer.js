import '../public/style/components/footer.css'
// react hooks声明组件
// 后面接一个箭头函数，因为我们底部组件没有什么逻辑编码，直接用小括号就行
const Footer = () => (
    // 一个外层包裹
    <div className="footer-div">
        {/* 系统是由什么驱动的 */}
        <div>系统是由React + Node(cover或者刚上层的框架) + Ant Design(UI库)</div>
        {/* 版权信息 */}
        <div>@Linan 临安</div>
    </div>
)

//把组件导出去
export default Footer;
// 然后写样式，导入