import { useState, useRef } from "react";
import { Button, Form, FormGroup, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContainer from "../authContainer/AuthContainer.jsx";
import { errorToast } from "../../ui/Toast/Toast.jsx";

const Login = ({ onLogIn, }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: false });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setErrors({ email: true, password: false });
      errorToast("¡Email vacío!");
      emailRef.current?.focus();
      return;
    }

    if (!password || password.length < 7) {
      setErrors({ email: false, password: true });
      errorToast("¡Contraseña con caracteres insuficientes!");
      passwordRef.current?.focus();
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Login incorrecto" }));
        throw new Error(errorData.message || "Login incorrecto");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      // setea el estado en true y paso los datos del usuario
      onLogIn(data.user);
      navigate("/tienda");
    } catch (error) {
      errorToast(error.message);
    }
  };

  return (
    <>
      <AuthContainer>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-4">
            <Form.Control
              type="email"
              placeholder="Ingresar email"
              onChange={handleEmailChange}
              value={email}
              ref={emailRef}
              className={errors.email ? "border border-danger border-3" : ""}
            />
          </FormGroup>
          <FormGroup className="mb-4">
            <Form.Control
              type="password"
              placeholder="Ingresar contraseña"
              onChange={handlePasswordChange}
              value={password}
              ref={passwordRef}
              className={errors.password ? "border border-danger border-3" : ""}
            />
          </FormGroup>
          <Row>
            <Col />
            <Col md={6} className="d-flex justify-content-end">
              <Button variant="secondary" type="submit">
                Iniciar sesión
              </Button>
            </Col>
          </Row>
          <Row className="mt-4">
            <p className="text-center fw-bold">¿Aún no tienes cuenta?</p>
            <Button onClick={() => navigate("/register")}>Registrate</Button>
          </Row>
        </Form>
      </AuthContainer>
    </>
  );
};

export default Login;