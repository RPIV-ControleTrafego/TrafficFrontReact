import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    axios.get('http://localhost:7000/user/getUsers')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar usuários:', error);
      });
  };

  const changeUserRole = () => {
    if (selectedUser && selectedRole) {
      const requestBody = {
        username: selectedUser,
        role: selectedRole,
      };

      axios.put(`http://localhost:7000/user/changeRole/${selectedUser}`, requestBody)
        .then(response => {
          console.log('Papel do usuário alterado:', response.data);
          loadUsers();
        })
        .catch(error => {
          console.error('Erro ao alterar o papel do usuário:', error);
        });
    }
  };

  const deleteUser = (username) => {
    axios.delete(`http://localhost:7000/user/deleteUser/${username}`)
      .then(response => {
        console.log('Usuário deletado:', username);
        loadUsers();
      })
      .catch(error => {
        console.error('Erro ao deletar o usuário:', error);
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen mt-56">
      <h1 className="text-4xl font-bold mb-8 text-center">Admin Page</h1>

      <input
        type="text"
        placeholder="Buscar usuário"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-4 border border-gray-300 rounded mb-8 w-full"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="border bg-gray-200 p-4">Nome</th>
              <th className="border bg-gray-200 p-4">Papel</th>
              <th className="border bg-gray-200 p-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(user => user && user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="border p-4">{user.username}</td>
                  <td className="border p-4">{user.role}</td>
                  <td className="border p-4 flex justify-around">
                    <button onClick={() => { setSelectedUser(user.username); openModal(); }} className="bg-blue-500 text-white py-2 px-4 rounded">Editar</button>
                    <button onClick={() => deleteUser(user.username)} className="bg-red-500 text-white py-2 px-4 rounded">Deletar</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedUser && (
        <Modal closeModal={closeModal}>
          <h2 className="text-2xl font-semibold mb-4 mt-8 text-center">Detalhes do Usuário: {selectedUser}</h2>
          <p className="text-lg mb-4">Nome: {selectedUser}</p>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="p-4 border border-gray-300 rounded mr-4 mb-4"
          >
            <option value="">Selecionar Papel</option>
            <option value="policial">Policial</option>
            <option value="bombeiro">Bombeiro</option>
            <option value="admin">Admin</option>
            <option value="user">Usuário</option>
          </select>
          <div className="flex justify-center">
            <button onClick={changeUserRole} className="bg-blue-500 text-white py-2 px-4 rounded mr-4">Alterar Papel</button>
            <button onClick={() => deleteUser(selectedUser)} className="bg-red-500 text-white py-2 px-4 rounded">Deletar</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminPage;
