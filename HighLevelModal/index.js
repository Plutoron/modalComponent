import React, {Component} from 'react';
import Modal from './Modal.js';

class Mymodal extends Component {
	constructor(props) {
		super(props);
		
		this.state={
			visible:false
		}
	}
	onSelect(res){
		if(res.confirm){
			console.log("conform");
		}else{
			console.log("cancel");
		}
	}
	showModal(){
		this.setState({
			visible: true
		})
	}
	render() {
		let { visible } = this.state;
		return (
			<div>
				<div>我的modal</div>
				<div onClick={()=>{this.showModal();}}>显示modal</div>
				<Modal 
					visible={visible} 
					title={"titlefdsfs"} 
					content={"contentfdsfsdf"} 
					onSelect={ (res) => {this.onSelect(res); }}
				/>
			</div>
		);
	}
}

export default Mymodal;