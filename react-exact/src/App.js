import React from "react";
//import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-brands-svg-icons";
import { faTrash, faRotate } from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const url = "http://localhost:8080/task";

//import { element } from "prop-types";

class App extends React.Component {
  state = {
    data: [],
    form: {
      id: "",
      task: "",
      state: "",
    },
    modalInsertar: false,
    modalEditar: false,
  };

  componentDidMount() {
    this.peticionGet();
  }

  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  MostrarModalInsertar = () => {
    this.setState({ modalInsertar: true });
  };

  OcultarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  peticionGet = async () => {
    await axios.get(url).then((response) => {
      this.setState({ data: response.data });
    });
  };

  peticionPost = async () => {
    this.state.form.state = "pendiente";
    await axios
      .post(url, this.state.form)
      .then((response) => {
        this.setState({
          data: this.state.data.concat(response.data),
          modalInsertar: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  peticionUpdate = async (dato) => {
    if (dato.state === "finalizado") {
      dato.state = "pendiente";
    } else if (dato.state === "pendiente") {
      dato.state = "finalizado";
    }
    await axios
      .post(url, dato)
      .then((response) => {
        var contador = 0;
        var lista = this.state.data;
        lista.map((registro) => {
          if (dato.id === registro.id) {
            lista[contador].state = dato.state;
          }
          contador++;
        });
        this.setState({
          data: lista,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  peticionDelete = async (dato) => {
    var option = window.confirm("Realmente desea eliminar este registro ");
    if (option) {
      console.log(dato);
      await axios.delete(url + "/" + dato.id).then((response) => {
        var contador = 0;
        var lista = this.state.data;
        lista.map((registro) => {
          if (dato.id === registro.id) {
            lista.splice(contador, 1);
          }
          contador++;
        });
        this.setState({ data: lista });
      });
    }
  };

  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={() => this.MostrarModalInsertar()}>
            Insertar Nueva Tarea
          </Button>
          <br />
          <br />

          <Table>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Tarea</th>
                <th style={{ textAlign: "center" }}>Estado</th>
                <th style={{ textAlign: "center" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((mytasks) => (
                <tr key={mytasks.id}>
                  <td style={{ paddingLeft: "50px" }}>{mytasks.task}</td>
                  <td style={{ textAlign: "center" }}>{mytasks.state}</td>
                  <td style={{ textAlign: "center" }}>
                    <FontAwesomeIcon
                      icon={faRotate}
                      style={{ color: "green", paddingRight: "5px" }}
                      onClick={() => this.peticionUpdate(mytasks)}
                    />
                    {"     "}
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: "red", paddingLeft: "5px" }}
                      onClick={() => this.peticionDelete(mytasks)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar Registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Tarea:</label>

              <input
                className="form-control"
                name="task"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.peticionPost()}>
              Insertar
            </Button>
            <Button color="danger" onClick={() => this.OcultarModalInsertar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;
