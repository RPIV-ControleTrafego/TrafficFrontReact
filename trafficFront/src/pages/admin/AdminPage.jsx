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
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Page</h1>

      <input
        type="text"
        placeholder="Buscar usuário"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4"
      />

      {isModalOpen && selectedUser && (
        <Modal closeModal={closeModal}>
          <h2 className="text-xl font-semibold mb-2 mt-6">Detalhes do Usuário: {selectedUser}</h2>
          <p>Nome: {selectedUser}</p>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="p-2 border border-gray-300 rounded mr-2 mt-4"
          >
            <option value="">Selecionar Papel</option>
          </select>
          <button onClick={changeUserRole} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Alterar Papel</button>
          <button onClick={() => deleteUser(selectedUser)} className="bg-red-500 text-white py-2 px-4 rounded mt-4 ml-2">Deletar</button>
        </Modal>
      )}
    </div>
  );
};

export default AdminPage;
