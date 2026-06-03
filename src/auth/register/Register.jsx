import { useState } from "react";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContainer from "../authContainer/AuthContainer";
import { errorToast, successToast } from "../../ui/Toast/Toast";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [nombreReal, setNombreReal] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!username || !nombreReal || !email || !password) {
      errorToast("Completa todos los campos");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/register", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username,
          nombre_real: nombreReal,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Error en el servidor" }));
        throw new Error(errorData.message || "Error en el registro");
      }

      successToast("Usuario creado exitosamente");
      navigate("/login");
    } catch (error) {
      errorToast(error.message);
    }
  };

  return (
    <AuthContainer>
      <Form onSubmit={handleRegister}>
        <FormGroup className="mb-4">
          <Form.Control
            type="text"
            placeholder="Ingresar nombre de usuario"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </FormGroup>
        <FormGroup className="mb-4">
          <Form.Control
            type="text"
            placeholder="Ingresar nombre real"
            onChange={(e) => setNombreReal(e.target.value)}
            value={nombreReal}
          />
        </FormGroup>
        <FormGroup className="mb-4">
          <Form.Control
            type="email"
            placeholder="Ingresar email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </FormGroup>
        <FormGroup className="mb-4">
          <Form.Control
            type="password"
            placeholder="Ingresar contraseña"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </FormGroup>

        <Row>
          <Col md={6} className="d-flex justify-content-end">
            <Button variant="secondary" type="button" onClick={() => navigate("/login")}>
              Iniciar sesión
            </Button>
          </Col>
          <Col className="text-center">
            <Button variant="primary" type="submit" className="w-100">
              Registrarse
            </Button>
          </Col>
        </Row>
      </Form>
    </AuthContainer>
  );
};

export default Register;