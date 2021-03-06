import React, { Component } from "react";
import { Form, Button, Row, InputGroup, Col } from "react-bootstrap";


//Formulaire pour se connecter à un compte
class FormLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pseudo: "",
      password: "",
      // connected: "no",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({mail: this.state.email, mdp: this.state.password })
    }

    // voir avec le back pour demander mail ou pseudo 
  fetch('http://localhost:4000/user', requestOptions)
      .then(response => response.json())
      .catch(error => console.error("Error: " + error )) 
      .then(response => {
        // console.log("success: " + response.body)
        console.log(response.ok)
        console.log(response.result)
        if(response.ok == "ok"){
          this.setState({connected: "yes",
      pseudo: response.result.pseudo})
          this.props.handleConnectedState("ok")
        }
        else {
        this.setState({connected: "tried"})
        this.props.handleConnectedState("tried")
      }
      }
      )  // si la response est ok, set state connected to true et adapter le render en fonction
     
     event.preventDefault();
     event.stopPropagation()
    }

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    this.setState({
      [name]: value
    })
  }

  render() {
    const connected = this.props.connected
    const user = this.state.pseudo
    // const scale = this.props.scale
    if(connected !== "ok") {
    return (
      <div>
        <h3> Connectez-vous </h3>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Adresse e-mail</Form.Label>
              <Form.Control 
                name="email" 
                type="email" 
                placeholder="tomnook@tominc.ac" 
                onChange={this.handleChange}
                />
              <Form.Text className="text-muted">
                Tom Nook garde les informations comme ses clochettes. En sécurité.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control name="password" type="password" placeholder="Mot de passe" onChange={this.handleChange}/>
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit">
            Me connecter
          </Button> {connected == "tried" ? <p>Mauvais identifiants !</p> : null}
        </Form> 
        </div>
    );
    }
  else {
    return(
      <h3> Bienvenue {user} </h3>
    )
  }
  }
}

export default FormLog;