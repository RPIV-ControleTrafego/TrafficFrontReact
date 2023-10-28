import React from "react";

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

     const TextComponent = ({ text }) => {
       return <p>{text}</p>;
     };
     
     const DecoratedTextComponent = TextDecorator(TextComponent);

const About = () => {
    return(
        <div>
            <h1 className="text-2xl font-semibold text-center mt-10">Tecnologias e Ferramentas</h1>
            <p className="text-base  bg-slate-100 rounded-sm mr-10">
            O projeto foi desenvolvido utilizando as seguintes tecnologias e ferramentas:

            </p>
        </div>
    )
}
export default About;