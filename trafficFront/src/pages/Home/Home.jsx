import React from 'react';

import {
  Card as TailwindCard, // Renomeando o componente importado para evitar conflito de nomes
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
 
const withStyling = (WrappedComponent) => {
  return ({ style, ...props }) => { // Utilizando um componente funcional para aplicar estilos
    return (
      <div style={{ margin: '20px', color: 'black', ...style }}> {/* Permitindo estilos personalizados */}
        <WrappedComponent {...props} />
      </div>
    );
  };
};

const Card = ({ title, content }) => {
  return (
    <TailwindCard className="mt-16 w-96 border border-indigo-100 rounded-lg">
      <CardBody>
        <div className="w-20 ml-36 mb-3 mt-4">
          <img src="https://www.svgrepo.com/show/5438/cone.svg" alt="" />
        </div>

        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography>{content}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <a href="#" className="inline-block">
          <Button size="sm" variant="text" className="flex items-center gap-2">
            Acessar Dados
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </a>
      </CardFooter>
    </TailwindCard>
  );
};

function Home({ authenticationHandler, authorizationHandler }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!authenticationHandler || !authorizationHandler) {
      navigate('/error');
      return;
    }

    const isAuthenticated = authenticationHandler.isAuthenticated(token);

    if (!isAuthenticated) {
      navigate('/login');
    } else {
      const isAuthorized = authorizationHandler.isAuthorized(token);

      if (!isAuthorized) {
        navigate('/access-denied');
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [navigate, authenticationHandler, authorizationHandler]);

  return (
    <div className="App">
      <div className="flex items-center ml-10">
        <div className=" mt-64">
          {/* Conteúdo da imagem */}
        </div>
        <div className="ml-10 mt-44">
          <div className="text-2xl font-semibold">
            <h1 className="">Traffic Today</h1>
          </div>
          <div>
            <p className="text-base bg-slate-100 rounded-sm mr-32">
              {/* Conteúdo do texto de boas-vindas */}
            </p>
          </div>
        </div>
      </div>

      {isAuthenticated && (
        <div className="flex space-x-4  mb-64 ml-52">
          {/* Cards renderizados se autenticado e autorizado */}
          <CardWithStyling
            title="Dados Gerais Sobre Tráfego"
            content="Aqui você pode encontrar dados gerais sobre o tráfego de veículos."
          />
          <CardWithStyling
            title="Dados Gerais Sobre Acidentes"
            content="Aqui você pode encontrar dados gerais sobre acidentes de trânsito."
          />
          <CardWithStyling
            title="Dados Gerais Sobre Infrações"
            content="Aqui você pode encontrar dados gerais sobre infrações de trânsito."
          />
        </div>
      )}
    </div>
  );
}

const CardWithStyling = withStyling(Card); // Usando o componente renomeado

export default Home;
