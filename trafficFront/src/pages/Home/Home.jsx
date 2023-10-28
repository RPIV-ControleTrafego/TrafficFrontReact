import React, { useEffect, useState } from 'react';

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
 
function Home() {

      // Componente de wrapper como um decorator
      const TextDecorator = (WrappedComponent) => {
        return class extends React.Component {
           render() {
           return (
             <div style={{ fontWeight: 'bold', color: 'blue' }}>
               <WrappedComponent {...this.props} />
             </div>
           );
         }
       };
     };
     
     // Componente original com o texto
     const TextComponent = ({ text }) => {
       return <p>{text}</p>;
     };
     
     // Aplicando o decorator ao componente original
     const DecoratedTextComponent = TextDecorator(TextComponent);

  return (
    <div className="App">
        <div className="flex items-center ml-10">
    <div className=" mt-64">
      <img src="https://www.svgrepo.com/show/139/traffic-light.svg" alt="farol" class="h-auto w-full" />
    </div>
    <div className="ml-10 mt-44 ">
      <div className="text-2xl font-semibold ">
        <h1 className="">Traffic Today</h1>
      </div>
      <div>
        <p className="text-base  bg-slate-100 rounded-sm mr-32">
          Bem-vindo à Traffic Today System, a principal autoridade em soluções de gerenciamento de tráfego para empresas que buscam alcançar eficiência, segurança e crescimento em suas operações. Somos apaixonados por ajudar nossos clientes a navegar pelo complexo mundo do tráfego de forma suave e eficaz, e estamos empenhados em impulsionar seu sucesso.
        </p>
      </div>
    </div>
  </div>

       {/* Aqui começa card1 */}

       <div className="flex space-x-4  mb-64 ml-52" >

       <Card className="mt-16 w-96 border border-indigo-100 rounded-lg">
        <CardBody>
          <div className='w-20 ml-36 mb-3 mt-4'>    <img src="https://www.svgrepo.com/show/5438/cone.svg" alt="" /></div>
       
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Dados Gerais Sobre Tráfego
          </Typography>
          <Typography>
            Aqui voce pode encontrar dados gerais sobre o tráfego de veículos, como quais as cores,marcas e tipos de carros registrados.
          </Typography>
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
      </Card>
        
        {/* Aqui começa card2 */}

        
       <Card className="mt-16 w-96 border border-indigo-100 rounded-lg">
        <CardBody>
        <div className='w-20 ml-36 mb-3 mt-4'>     <img src="https://www.svgrepo.com/show/271899/injury.svg" alt="" /></div>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Dados Gerais Sobre Acidentes
          </Typography>
          <Typography>
            Aqui voce pode encontrar dados gerais sobre o acidentes registrados no trânsito, com qual gravidade ferido e endereço
          </Typography>
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
      </Card>

         {/* Aqui começa card3*/}

         <Card className="mt-16 w-96 border border-indigo-100 rounded-lg">
        <CardBody>
        <div className='w-20 ml-36 mb-3 mt-4'>      <img src="https://pic.onlinewebfonts.com/thumbnails/icons_208095.svg" alt="" /></div>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Dados Gerais Sobre Infrações
          </Typography>
          <Typography>
            Aqui voce pode encontrar dados gerais sobre as Infrações cometidas no trânsito, como quais as cores,marcas e tipos de carros registrados.
          </Typography>
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
      </Card>

      </div>
    </div>
  );
}

export default Home;
