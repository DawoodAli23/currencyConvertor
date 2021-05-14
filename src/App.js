import React, { Component } from 'react'
import './App.css';
import {Container,Row,Col, Navbar, InputGroup, FormControl,DropdownButton, Dropdown} from 'react-bootstrap';
import {fetchCountry,convertor} from './components/api';
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryList:[],
      toCode: "PKR",
      fromCode: "EUR",
      toPrice:0,
      fromPrice:0
    };
  }
  componentDidMount=async()=>{
    const data = await fetchCountry();
    this.setState({countryList:Object.keys(data.symbols)});
  }
  componentDidUpdate=async(prevProps, prevState, snapshot)=>{
    if(prevState.fromCode!==this.state.fromCode || prevState.toCode!==this.state.toCode || prevState.fromPrice!==this.state.fromPrice ){
      const data = await convertor(this.state.fromCode,this.state.toCode,this.state.fromPrice);
      //this.handleToPrice(data);
      this.setState({toPrice:data});
    }
  }
  handleFromChnage=(e)=>{
    this.setState({fromCode:e});
  }
  handleFromValChange=(e)=>{
    this.setState({fromPrice:e});
  }
  handleToChnage=(e)=>{
    this.setState({toCode:e});
  }
  handleToValChange=(e)=>{
    this.setState({toPrice:e});
  }
  handleToPrice=(data)=>{
    this.setState({toPrice:data});
  }
  render() {
    return (
      <div>
        <Navbar  bg="dark" expand="lg">
          <Navbar.Brand className="text-white">Currency Convertor</Navbar.Brand>
        </Navbar>
        <Container className="justify-content-xs-center pt-3">
          <Row >
            <Col className="d-flex justify-content-center p-2">
              <InputGroup>
                <FormControl type="number" placeholder="0.0" onChange={(evt)=>{
                  this.handleFromValChange(evt.target.value)
                }}
                >

                </FormControl>
                <DropdownButton
                  as={InputGroup.Append}
                  variant="outline-secondary"
                  title={this.state.fromCode}
                  onSelect={(evt)=>{
                    this.handleFromChnage(evt);
                  }}
                > 
                {this.state.countryList.map((cc,index)=>(
                  <Dropdown.Item eventKey={cc} key={index}>
                    {cc}
                  </Dropdown.Item>
                ))}
                </DropdownButton>
              </InputGroup>
            </Col>
          </Row>
          <Row >
          <Col className="d-flex justify-content-center p-2">
              <InputGroup>
                <FormControl type="number" placeholder="0.0" disabled value={this.state.toPrice}>

                </FormControl>
                <DropdownButton
                  as={InputGroup.Append}
                  variant="outline-secondary"
                  title={this.state.toCode}
                  onSelect={(evt)=>{
                    this.handleToChnage(evt);
                  }}
                > 
                {this.state.countryList.map((cc,index)=>(
                  <Dropdown.Item eventKey={cc} key={index}>
                    {cc}
                  </Dropdown.Item>
                ))}
                </DropdownButton>
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App
