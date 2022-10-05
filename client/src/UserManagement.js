import { useEffect, useState, useReducer } from 'react';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { UnlockFill } from 'react-bootstrap-icons';
import { Trash3 } from 'react-bootstrap-icons';

function UserManagement() {
	const [listOfUsers, setListOfUsers] = useState([]);
	const [checkedUsers, setCheckedUsers] = useState([]);
	const forceUpdate = useReducer(() => ({}))[1];

	useEffect(() => {
		Axios.get('http://localhost:8080/api/getUsers').then((response) => {
			setListOfUsers(response.data);
		});
	}, [listOfUsers]);

	const deleteUser = () => {
		Axios.post('http://localhost:8080/api/deleteUser', {
			checkedUsers: checkedUsers,
		}).then((response) => {
			alert('Users deleted');
		});
	};

	const blockUser = () => {
		Axios.post('http://localhost:8080/api/blockUser', {
			checkedUsers: checkedUsers,
		}).then((response) => {
			alert('Users blocked');
		});
		forceUpdate();
	};
	const unblockUser = () => {
		Axios.post('http://localhost:8080/api/unblockUser', {
			checkedUsers: checkedUsers,
		}).then((response) => {
			alert('Users unblocked');
		});
		forceUpdate();
	};

	return (
		<Container>
			<div className="d-flex justify-content-end mt-2 mb-2">
				<Button className="w-10 btn-danger m-2" onClick={blockUser}>
					Block
				</Button>
				<Button className="m-2" onClick={unblockUser}>
					<UnlockFill></UnlockFill>
				</Button>
				<Button variant="dark" className="m-2" onClick={deleteUser}>
					<Trash3></Trash3>
				</Button>
			</div>

			<div>
				<Table>
					<thead>
						<tr>
							<th>
								<Form.Check></Form.Check>
							</th>
							<th>_id</th>
							<th>Username</th>
							<th>Email</th>
							<th>Last login time</th>
							<th>Registration time</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{listOfUsers.map((user) => {
							return (
								<tr key={user._id}>
									<td>
										<Form.Check
											onChange={(e) => {
												if (e.target.checked) {
													setCheckedUsers((checkedUsers) => [
														...checkedUsers,
														user._id,
													]);
												} else {
													setCheckedUsers((users) =>
														users.filter((_, index) => index !== 0)
													);
												}
											}}
										></Form.Check>
									</td>
									<td>{user._id}</td>
									<td>{user.userName}</td>
									<td>{user.email}</td>
									<td>{user.lastLoginTime ? user.lastLoginTime : 'no data'}</td>
									<td>{user.registrationTime}</td>
									<td>{user.activeStatus ? 'Active' : 'Blocked'}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		</Container>
	);
}

export default UserManagement;
