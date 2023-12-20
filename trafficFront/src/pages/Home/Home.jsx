import React from 'react';
import { Link } from 'react-router-dom';
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

const Card = ({ title, content,link }) => {
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
      <Link to={link} className="inline-block">
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
        </Link>
      </CardFooter>
    </TailwindCard>
  );
};

function Home() {
  return (
    <div className="App">
      <div className="flex items-center ml-10">
        <div className=" mt-64">
          <img
            src="https://www.svgrepo.com/show/139/traffic-light.svg"
            alt="farol"
            className="h-auto w-full"
          />
        </div>
        <div className="ml-10 mt-44 ">
          <div className="text-2xl font-semibold ">
            <h1 className="">Traffic Today</h1>
          </div>
          <div>
            <p className="text-base bg-slate-100 rounded-sm mr-32">
              Bem-vindo à Traffic Today System, a principal autoridade em soluções de gerenciamento de tráfego para empresas que buscam alcançar eficiência, segurança e crescimento em suas operações. Somos apaixonados por ajudar nossos clientes a navegar pelo complexo mundo do tráfego de forma suave e eficaz, e estamos empenhados em impulsionar seu sucesso.
            </p>
          </div>
        </div>
      </div>

      <iframe
          src="https://metabase.ayvu.net/public/dashboard/6aa7b180-17ae-4f6e-ae0f-8933c7f19e3c"
          frameBorder="0"
          width="1600"
          height="800"
          allowTransparency
        ></iframe>
    </div>
  );
}

const CardWithStyling = withStyling(Card); // Usando o componente renomeado

export default Home;
