import React, { Component } from 'react';
import './Modal.css';
import WrappedComponent from './WrappedComponent.js';

// 纯展示层 UI

class Modal extends Component {
	componentWillUpdate(nextProps, nextState) {
        console.log('Modal将会更新');
  		// 这一个不执行 应该是因为 内部没有state 所以也没有state更改事件
    }
	componentDidMount() {
		console.log("Modal加载完毕");
		document.querySelector("body").style.overflow="hidden";
	}
	componentWillUnmount(){
		console.log("Modal卸载");
		document.querySelector("body").style.overflow="";
	}
	render() {

		let { title, content, cancelColor, cancelText, confirmColor, confirmText, showCancel, visible, onCancel, onConfirm } = this.props;

		return (
			<div className="modalMask show" onWheel={preventBackgroundScroll} >

				<div className="modalBlock popIn">  
					<div className="title">{title}</div>
					<div className="content">{content}</div>
					<div className="buttons">
						{ 
							showCancel ? 
							<div 
								style={{color:cancelColor}} 
								onClick={(e)=>{onCancel(e);}}
							>
								{cancelText}
							</div> : ""
						}
						<div 
							style={{color:confirmColor}} 
							onClick={(e)=>{ onConfirm(e);}}
						>
							{confirmText}
						</div>
					</div>
				</div>
			</div>
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

Modal = WrappedComponent(Modal);

export default Modal;