import React,{Component} from 'react';
import {Dimmer,Loader,Container } from 'semantic-ui-react'
import '../index.css'

export default class DetailsPage extends Component {
	state = {
		data:{},
		loading:false,
		error:false
	}

	componentDidMount(){
		const id = this.props.match.params.id
		console.log(this.props)
		const url = `https://api.mfapi.in/mf/${id}`
		fetch(url)
			.then(response => response.json())
			.then(data => {
				this.setState({
					loading:true,
					data,
					error:false
				}, console.log(this.state.data));
			},
			(error) => {
				this.setState({
					loading:false,
					error:true
				});
			})
		}
    render(){
			if(this.state.loading){
				const {fund_house, scheme_type, scheme_category, scheme_code, scheme_name} = this.state.data.meta;
				const {date, nav} = this.state.data.data[0]
				return(
					<div style={{marginLeft:"66px",marginRight:"66px",marginTop:"20px"}}>	
						<Container>
							Fund House : {fund_house}
							<br/>
							Scheme Category : {scheme_category}
							<br/>
							Scheme Type: {scheme_type}
							<br/>
							Scheme Code: {scheme_code}
							<br/>
							Scheme Name: {scheme_name}
							<br/>
							Latest Nav : Date - {date} Nav - {nav}
						</Container>
					</div>		
					)
			}else{
				return(
					<div className="preloader">
						<Dimmer active inverted>
							<Loader size='massive'>Loading</Loader>
						</Dimmer>
					</div>
				)
			}    
    }
}