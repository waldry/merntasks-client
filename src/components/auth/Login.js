import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

function Login(props) {
	const alertaContext = useContext(AlertaContext);
	const { alerta, mostraralerta } = alertaContext;

	const authContext = useContext(AuthContext);
	const { mensaje, autenticado, iniciarSesion } = authContext;

	useEffect(() => {
		if (autenticado) {
			props.history.push("/proyectos");
		}
		if (mensaje) {
			mostraralerta(mensaje.msg, mensaje.categoria);
		}
		//eslint-disable-next-line
	}, [mensaje, autenticado, props.history]);

	//States
	const [usuario, guardarUsuario] = useState({
		email: "",
		password: "",
	});

	//From user we need.

	const { email, password } = usuario;

	const onChange = (e) => {
		guardarUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
	};
	const onSubmit = (e) => {
		e.preventDefault();

		//validation
		if (email.trim() === "" || password.trim() === "") {
			mostraralerta("Todos los campos son obligatorios", "alerta-error");
		}

		//Action
		iniciarSesion({ email, password });
	};

	return (
		<div className="form-usuario">
			{alerta ? (
				<div className={`alerta ${alerta.categoria}`}>{alerta.msg} </div>
			) : null}
			<div className="contenedor-form sombra-dark">
				<h1>Iniciar Sesion</h1>
				<form onSubmit={onSubmit}>
					<div className="campo-form">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Tu Email"
							value={email}
							onChange={onChange}
						/>
					</div>
					<div className="campo-form">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Tu Password"
							value={password}
							onChange={onChange}
						/>
					</div>
					<div className="campo-form">
						<input
							type="submit"
							className="btn btn-primario btn-block"
							value="Iniciar Sesion"
						/>
					</div>
				</form>
				<Link to={"/nueva-cuenta"} className="enlace-cuenta">
					Obtener Cuenta
				</Link>
			</div>
		</div>
	);
}

export default Login;
