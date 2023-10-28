// Importações necessárias
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    // Função para carregar usuários ao montar o componente
    loadUsers();
  }, []);

  const loadUsers = () => {
    // Requisição para carregar os usuários
    axios.get('http://localhost:8082/user/getUsers')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar usuários:', error);
      });
  };

  const changeUserRole = () => {
    // Alterar o papel de um usuário
    const requestBody = {
      username: selectedUser,
      role: newRole,
    };

    axios.put('http://localhost:8082/user/changeRole', requestBody)
      .then(response => {
        console.log('Papel do usuário alterado:', response.data);
        // Atualize a lista de usuários após a alteração
        loadUsers();
      })
      .catch(error => {
        console.error('Erro ao alterar o papel do usuário:', error);
      });
  };

  return (
    <div>
      <h1>Admin Page</h1>
      
      {/* Lista de usuários */}
      {users.map(user => (
  <li key={user.id} onClick={() => {
    console.log('Usuário selecionado:', user.username); // Adicione este console.log
    setSelectedUser(user.username);
  }}>
    {user.username} - Role: {user.role}
  </li>
))}

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
