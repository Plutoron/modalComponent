import React, { Component } from 'react';
import './index.css';

/**
 * @param {String} title 标题
 * @param {String} content 内容
 * @param {Function} onSelect 点击事件
 * @param {Boolean} showCancel 是否显示取消按钮
 * @param {String} cancelText 取消按钮文案
 * @param {HexColor} cancelColor  取消文案颜色，默认为"#000"
 * @param {String} confirmText 确定按钮文案
 * @param {HexColor} confirmColor  确定文案颜色，默认为"#1AAD16"
 * @param {Function} onSelect 选中事件
 * @param {String} className 外层样式

 * options = {
	  title:'title',
	  content:'content',
	  showCancel:'showCancel',
	  cancelText:'cancelText',
	  cancelColor:'cancelColor',
	  confirmText:'confirmColor',
	  confirmColor:'confirmColor',
	  onSelect(res){
		 if (res.confirm){
			console.log('用户点击确定')
		 } else if (res.concel){
			console.log('用户点击取消')
		 }
	  }
	}
 */

class Modal extends Component {

	constructor(props) {
		super(props);

		this.state = Object.assign({
			title: 'title',
			content: 'content',
			cancelColor:'#000',
			cancelText:'取消',
			confirmColor:'#1AAD16',
			confirmText:'确认',
			showCancel: true
		},this.props);
	}

	componentDidMount() {
		console.log("加载完毕");
		document.querySelector("body").style.overflow="hidden";
	}

	componentWillUnmount(){
		console.log("卸载");
		document.querySelector("body").style.overflow="";
	}

	componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible
        })
    }

    onConfirm(e){
        this.setState({
            visible: false
        })
        this.props.onConfirm();
        e.stopPropagation();
    }
    onCancel(e){
        this.setState({
            visible: false
        })
        this.props.onCancel();
        e.stopPropagation();
    }

	render() {

		let { title, content, cancelColor, cancelText, confirmColor, confirmText, showCancel, visible } = this.state;

		return (

			visible ?
			<div className="modalMask" onWheel={preventBackgroundScroll} >
				<div className="modalBlock">
					<div className="title">{title}</div>
					<div className="content">{content}</div>
					<div className="buttons">
						{ 
							showCancel ? 
							<div 
								style={{color:cancelColor}} 
								onClick={(e)=>{this.onCancel(e);}}
							>{cancelText}</div> : ""
						}
						<div 
							style={{color:confirmColor}} 
							onClick={(e)=>{this.onConfirm(e);}}
						>{confirmText}</div>
					</div>
				</div>
			</div>  :  ''
		);
	} 
}

const preventBackgroundScroll = (e: React.WheelEvent<HTMLDivElement>) => {
  const target = e.currentTarget
  if (
    (e.deltaY < 0 && target.scrollTop <= 0) ||
    (e.deltaY > 0 && target.scrollHeight - target.clientHeight - target.scrollTop <= 0)
  ) {
    e.stopPropagation()
    e.preventDefault()
  }
}

export default Modal;
