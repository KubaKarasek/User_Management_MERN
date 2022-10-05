import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/App.css';

function App() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function loginUser(evt) {
		evt.preventDefault();
		const response = await fetch('http://localhost:8080/api/login', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});

		const data = await response.json();
		if (data.user) {
			localStorage.setItem('token', data.user);
			alert('Login successful');
			navigate('/dashboard'); // to user management dashboard
		} else {
			alert('Please check your credentials.');
		}
		console.log(data);
	}

	return (
		<div className="App">
			<div className="mt-3">
			    <h1>Login</h1>
            </div>
			<div className="register-form mt-3">
				<Form onSubmit={loginUser}>
					<Form.Control
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						placeholder="Email"
					/>
					<Form.Control
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Password"
					/>
                    <div className='mt-3'>
					    <Button type="submit" value="login">
					    	Login
				    	</Button>
                    </div>
				</Form>
			</div>
		</div>
	);
}

export default App;
