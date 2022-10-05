import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/App.css';

function App() {
	const navigate = useNavigate();
	const [userName, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function registerUser(evt) {
		evt.preventDefault();
		const response = await fetch('http://localhost:8080/api/register', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				userName,
				email,
				password,
			}),
		});

		const data = await response.json();

		if (data.status === 'ok') {
			navigate('/login');
		} else {
            alert(data.error);
        } 
	}

	return (
		<div className="App">
            <div className="mt-3">
            <h1>Register</h1>
            </div>
			<div className="register-form mt-3">
				<Form onSubmit={registerUser}>
					<Form.Control
						value={userName}
						onChange={(e) => setUsername(e.target.value)}
						type="text"
						placeholder="Username"
					/>
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
					<Button type="submit" value="register">
						Register
					</Button>
                    </div>
				</Form>
			</div>
		</div>
	);
}

export default App;
