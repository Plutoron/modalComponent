import React, {Component} from 'react'

// 纯逻辑层 

export default (WrappedComponent) => {
    class NewComponent extends Component {
        constructor(props) {
            super(props);

            this.state = Object.assign({
                cancelColor:'#000',
                cancelText:'取消',
                confirmColor:'#1AAD16',
                confirmText:'确认',
                showCancel: true
            },this.props);
        }
        onConfirm(e){
            this.setState({
                visible: false
            })
            this.state.onSelect({
                confirm: true,
                cancel: false
            })
            e.stopPropagation();
        }
        onCancel(e){
            this.setState({
                visible: false
            })
            this.state.onSelect({
                confirm: false,
                cancel: true
            })
            e.stopPropagation();
        }
        componentWillUpdate(nextProps, nextState) {
            console.log('高阶将会更新');
        }
        componentWillReceiveProps(nextProps) {
            this.setState({
                visible: nextProps.visible
            })
        }
        componentDidMount() {
            console.log("高阶加载完毕");
            // 这一个不执行 应该是因为组件本体是传入的组件 这里 NewComponent 只是形组件（对应形参，哈哈）
        }
        componentWillUnmount(){
            console.log("高阶卸载");
            // 这一个不执行
        }
        render() {
            let { title, content, cancelColor, cancelText, confirmColor, confirmText, showCancel, visible } = this.state;
            let options = {
                title, 
                content, 
                cancelColor, 
                cancelText, 
                confirmColor, 
                confirmText,
                showCancel,
                visible
            }
            return(
                visible ? 
                <WrappedComponent 
                    {...options} 
                    onConfirm={ (e) => {  this.onConfirm(e); }}
                    onCancel={ (e) => {  this.onCancel(e); }} 
                />  : ""
            )
        }
    }
    return NewComponent
}