import React, { Component } from 'react';
import {Card, Dimmer, Loader} from 'semantic-ui-react'
import '../index.css'
import {Link} from 'react-router-dom'

export default class MFList extends Component {
    state = {
      data:[],
      loading:false,
      error:false,
      userInput:'',
    }
	componentDidMount() {
		const url = "https://api.mfapi.in/mf/search?q=Navi"
		fetch(url)
			.then(response => response.json())
			.then(
				(data) => {
					this.setState({
						data,
			loading:true,
					});
				},
				(error) => {
					this.setState({
						loading:false,
						error:true
					});
				}
			)
      this.mydebounce = this.debounce(2000);
    }
    
    handleOptionChange = (changeEvent) => {
      this.setState({
        userInput:changeEvent.target.value
      }, () => {
          this.mydebounce(this.state.userInput);
      })
    }

    debounce = (time) => {
      let timer;
      return (userInput) => {
        console.log(timer);
        clearTimeout(timer);
        timer = setTimeout(() => {
          if(userInput === ''){
            userInput = "Navi"
          }
          fetch(
            `https://api.mfapi.in/mf/search?q=${userInput}`
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              this.setState({
                data,
                loading:true,
              });
            });
        }, time);
      };
    };

    render(){
			if(this.state.loading){
		    var mflist = this.state.data.map((item,index) => {
          const param = (item.schemeCode)
            return(
              <Card key={index}>
                <Card.Content>
                    <Card.Header>{item.schemeName}</Card.Header>
                    <Card.Description>
                      {item.schemeCode}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Link to ={`/navi/${param}`} style={{color:'black'}}>Read More</Link>
				        </Card.Content>
              </Card>
            );   
		});
		return(
          <div>
            <div style={{marginLeft:"66px",marginRight:"66px",marginTop:"20px", alignContent:"center"}}>
              
                <input type="text" onChange={this.handleOptionChange} value={this.state.userInput}/>
              
              <Card.Group style={{marginTop:"10px"}}>
                {mflist}
              </Card.Group>
					  </div>
          </div>	
        );
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