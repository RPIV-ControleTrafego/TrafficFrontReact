import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Importe o componente de modal

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a exibição do modal
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(''); // Estado para o tipo de filtro selecionado
  const [filterValue, setFilterValue] = useState(''); // Estado para o valor do filtro

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const params = { filter: selectedFilter, value: filterValue };

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

  // esse const aqui
  const deleteUser = (username) => {
    setSelectedUser(username);
    setIsDeleteConfirmationOpen(true);
  };

  const confirmDeleteUser = () => {
    axios.delete(`http://localhost:7000/user/deleteUser/${selectedUser}`)
      .then(response => {
        console.log('Usuário deletado:', selectedUser);
        loadUsers();
      })
      .catch(error => {
        console.error('Erro ao deletar o usuário:', error);
      })
      .finally(() => {
        setIsDeleteConfirmationOpen(false);
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const DeleteConfirmationModal = () => {
    return (
      <Modal closeModal={() => setIsDeleteConfirmationOpen(false)}>
        <h2 className="text-xl font-semibold mb-2 mt-6">Confirmação de Exclusão</h2>
        <p>Você tem certeza que deseja excluir o usuário {selectedUser}?</p>
        <button onClick={() => confirmDeleteUser()} className="bg-red-500 text-white py-2 px-4 rounded mt-4">Confirmar Exclusão</button>
      </Modal>
    );
  };

  const applyFilter = () => {
    loadUsers();
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

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded">
          <thead>
            <tr>
              <th className="border bg-gray-200 p-2">Nome</th>
              <th className="border bg-gray-200 p-2">Papel</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(user => user && user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(user => (
                <tr key={user.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => { setSelectedUser(user.username); openModal(); }}>
                  <td className="border p-2">{user.username}</td>
                  <td className="border p-2">{user.role}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <select
        value={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value)}
        className="p-2 border border-gray-300 rounded mr-2 mt-4"
      >
        <option value="">Selecionar Filtro</option>
        <option value="role">Papel</option>
      </select>

      <input
        type="text"
        placeholder="Valor do Filtro"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        className="p-2 border border-gray-300 rounded mr-2 mt-4"
      />

      <button onClick={applyFilter} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Aplicar Filtro</button>
      
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
            <option value="policial">Policial</option>
            <option value="bombeiro">Bombeiro</option>
            <option value="admin">Admin</option>
            <option value="user">Usuário</option>
          </select>
          <button onClick={changeUserRole} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Alterar Papel</button>
          <button onClick={() => deleteUser(selectedUser)} className="bg-red-500 text-white py-2 px-4 rounded mt-4 ml-2">Deletar</button>
        </Modal>
      )}
            {isDeleteConfirmationOpen && <DeleteConfirmationModal />}
    </div>
  );
};

export default AdminPage;
