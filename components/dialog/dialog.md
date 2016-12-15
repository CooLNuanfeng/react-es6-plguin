#### dialog 组件使用说明

    <Dialog show={} onHide={} config={} />

参数

1、config 必须 对象类型

    config = {
        type :  icon 类型 目前只支持 loading、success 和 warning 三种
        text :  提示信息文本
        textAlign :  文本对齐方式 left center right
        buttons :  {
            type : 按钮类型 boostrap 样式 success warning info primary等
            text : 按钮文本
            disTrigger : 是否禁用按钮的事件冒泡，禁用后 toast 无法关闭
            buttonStyle : 按钮样式设置
            callback : 按钮点击的回调函数
        }
        opacity :  mask遮罩透明度
        enabledMask :  mask 遮罩点击关闭是否有效
    }

2、show 必须 布尔类型

    控制 dialog 是否显示 需要在组件中通过 state 状态控制

3、onHide 函数类型或 null

    当dialog显示出来后需要关闭时设置，在该函数中将 show 的 state 状态关闭
