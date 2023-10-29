import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    axios.get('http://localhost:8082/user/getUsers')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar usuários:', error);
      });
  };

  const changeUserRole = () => {
    const requestBody = {
      username: selectedUser,
      role: newRole,
    };

    axios.put('http://localhost:8082/user/changeRole', requestBody)
      .then(response => {
        console.log('Papel do usuário alterado:', response.data);
        loadUsers();
      })
      .catch(error => {
        console.error('Erro ao alterar o papel do usuário:', error);
      });
  };

  const deleteUser = (username) => {
    // Implemente a lógica para deletar o usuário com o username fornecido
    axios.delete(`http://localhost:8082/user/deleteUser/${username}`)
      .then(response => {
        console.log('Usuário deletado:', username);
        loadUsers();
      })
      .catch(error => {
        console.error('Erro ao deletar o usuário:', error);
      });
  };

  return (
    <div>
      <h1>Admin Page</h1>

      {/* Campo de busca para filtrar usuários */}
      <input
        type="text"
        placeholder="Buscar usuário"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Lista de usuários filtrada pelo termo de busca */}
      {users
        .filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(user => (
          <div key={user.id}>
            <p onClick={() => setSelectedUser(user.username)}>
              {user.username} - Role: {user.role}
            </p>
            <button onClick={() => deleteUser(user.username)}>Deletar</button>
          </div>
        ))
      }

      {/* Formulário para alterar o papel do usuário selecionado */}
      {selectedUser && (
        <div>
          <h2>Alterar Papel de Usuário</h2>
          <input
            type="text"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            placeholder="Novo Papel"
          />
          <button onClick={changeUserRole}>Alterar Papel</button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
