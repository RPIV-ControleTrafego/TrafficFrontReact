import { NavLink } from "react-router-dom";
import { FaUser } from 'react-icons/fa';
import axios from 'axios';

const Navbar = ({ loggedInUser }) => {
  const isAdmin = loggedInUser && loggedInUser.role === 'admin';
  const isPolice = loggedInUser && loggedInUser.role === 'policial';
  const isFireman = loggedInUser && loggedInUser.role === 'bombeiro';

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:7000/user/logout');
      console.log(response.data);

      // history.push("/login");
      window.location.href = '/login'; // Exemplo de redirecionamento para a página de login
    } catch (error) {
      // Lidar com erros, se necessário
      console.error('Erro durante o logout', error);
    }
  };

  function confirmLogout() {
    const userConfirmed = window.confirm("Tem certeza de que deseja sair do sistema?");
    if (userConfirmed) {
      handleLogout();
    }
  }

  return (
    <nav
      className="bg-blue-500 border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 z-10 mb-80"
      style={{ zIndex: 1000 }}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center">
          <img
            src="https://www.svgrepo.com/show/139/traffic-light.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            <span className="text-green-500">Traffic</span>
            <span className="text-yellow-500">Today</span>{" "}
            <span className="text-red-500">System</span>{" "}
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg bg-blue-500 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-blue-500 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                activeClassName="bg-blue-700"
                exact
              >
                Home
              </NavLink>
              
            </li>
            <li>
              <NavLink
                to="/stats"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                activeClassName="bg-blue-700"
                exact
              >
                Dados
              </NavLink>
              
            </li>
            {isAdmin && (
              <>
                <li>
                  <NavLink to="/infraction">Infrações</NavLink>
                </li>
                <li>
                  <NavLink to="/Accident">Acidentes</NavLink>
                </li>
                <li>
                  <NavLink to="/admin">Admin</NavLink>
                </li>
              </>
            )}

            {isPolice && !isAdmin && (
              <li>
                <NavLink to="/infraction"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                activeClassName="bg-blue-700"
                exact
                >Infrações</NavLink>
              </li>
            )}

            {isFireman && !isAdmin && (
              <li>
                <NavLink to="/Accident">Acidentes</NavLink>
              </li>
            )}
             <li>
              <NavLink to="/profile" className="flex items-center  py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" activeClassName="bg-blue-700" exact>
                <FaUser className="mr-2" /> Perfil
              </NavLink>
            </li>

            {/* Botão de Logout */}
            {loggedInUser && (
                <li>
                  <button
                    onClick={confirmLogout}
                    className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    activeClassName="bg-blue-700"
                    exact
                  >
                    Logout
                  </button>
                </li>
              )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
