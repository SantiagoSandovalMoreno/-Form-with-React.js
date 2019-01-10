import React, { Component } from 'react';
import './App.css';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  Object.values(rest).forEach(val => {
    val === null && (valid = false)
  });

  return valid;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Nombre: null,
      TipoDocumento: null,
      NumeroDocumento: null,
      Telefono: null,
      Ciudad: null,
      Direccion: null,
      Email: null,
      Password: null,
      formErrors: {
        Nombre: "",
        TipoDocumento: "",
        NumeroDocumento: "",
        Telefono: "",
        Ciudad: "",
        Direccion: "",
        Email: "",
        Password: ""
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
     
      const user = this.state
      fetch("api/v1/usuarios/clientes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        })
        .then(function (response) { 
          if(response.status === 409){
            alert('El usuario ya existe en la base de datos')
          }
          if(response.status === 201){
            alert('Usuario Creado con Exito')
          }
         })
        .catch(function (error) { 
            console.log(error);
         })
    } else {
      console.log('FORM INVALID - DISPLAY ERROR MESSAGE');
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;
    switch (name) {
      case 'Nombre':
        formErrors.Nombre =
          value.length < 3 ? "Se requieren minimo 3 caracteres" : "";
        break;
      case 'TipoDocumento':
        formErrors.TipoDocumento =
          value.length < 3 ? "Se requieren minimo 3 caracteres" : "";
        break;
      case 'NumeroDocumento':
        formErrors.NumeroDocumento =
          value.length < 3 ? "Se requieren minimo 3 caracteres" : "";
        break;
      case 'Telefono':
        formErrors.Telefono =
          value.length < 3 ? "Se requieren minimo 3 caracteres" : "";
        break;
      case 'Ciudad':
        formErrors.Ciudad =
          value.length < 3 ? "Se requieren minimo 3 caracteres" : "";
        break;
      case 'Direccion':
        formErrors.Direccion =
          value.length < 3 ? "Se requieren minimo 3 caracteres" : "";
        break;
      case "Email":
        formErrors.Email = emailRegex.test(value) ? "" : "Email invalido";
        break;
      case 'Password':
        formErrors.Password =
          value.length < 6 ? "Se requieren minimo 6 caracteres" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(/*this.state*/));

  }

  render() {
    const { formErrors } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Crear una cuenta</h1>
          <form onSubmit={this.handleSubmit} noValidate >

            <div className="firstName">
              <label htmlFor="firstName">Nombre</label>
              <input type="text"
                className={formErrors.Nombre.length > 0 ? "error" : null}
                placeholder="Nombre"
                name="Nombre"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.Nombre.length > 0 && (
                <span className="errorMessage">{formErrors.Nombre}</span>
              )}
            </div>

            <div className="firstName">
              <label htmlFor="firstName">Tipo de Documento</label>
              <input type="text"
                className={formErrors.TipoDocumento.length > 0 ? "error" : null}
                placeholder="Tipo de Documento"
                name="TipoDocumento"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.TipoDocumento.length > 0 && (
                <span className="errorMessage">{formErrors.TipoDocumento}</span>
              )}
            </div>

            <div className="lastName">
              <label htmlFor="lastName">Numero de Documento</label>
              <input type="number"
                className={formErrors.NumeroDocumento.length > 0 ? "error" : null}
                placeholder="Numero de Documento"
                name="NumeroDocumento"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.NumeroDocumento.length > 0 && (
                <span className="errorMessage">{formErrors.NumeroDocumento}</span>
              )}
            </div>

            <div className="lastName">
              <label htmlFor="lastName">Telefono</label>
              <input type="number"
                className={formErrors.Telefono.length > 0 ? "error" : null}
                placeholder="Telefono"
                name="Telefono"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.Telefono.length > 0 && (
                <span className="errorMessage">{formErrors.Telefono}</span>
              )}
            </div>

            <div className="lastName">
              <label htmlFor="lastName">Ciudad</label>
              <input type="text"
                className={formErrors.Ciudad.length > 0 ? "error" : null}
                placeholder="Ciudad"
                name="Ciudad"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.Ciudad.length > 0 && (
                <span className="errorMessage">{formErrors.Ciudad}</span>
              )}
            </div>

            <div className="lastName">
              <label htmlFor="lastName">Dirección</label>
              <input type="text"
                className={formErrors.Direccion.length > 0 ? "error" : null}
                placeholder="Direccion"
                name="Direccion"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.Direccion.length > 0 && (
                <span className="errorMessage">{formErrors.Direccion}</span>
              )}
            </div>

            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="Email"
                className={formErrors.Email.length > 0 ? "error" : null}
                placeholder="Email"
                name="Email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.Email.length > 0 && (
                <span className="errorMessage">{formErrors.Email}</span>
              )}
            </div>

            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={formErrors.Password.length > 0 ? "error" : null}
                placeholder="Password"
                name="Password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.Password.length > 0 && (
                <span className="errorMessage">{formErrors.Password}</span>
              )}
            </div>

            <div className="createAccount">
              <button type="submit">
                Crear una cuenta
              </button>
              <small>Ya tienes una cuenta ?</small>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

export default App;
