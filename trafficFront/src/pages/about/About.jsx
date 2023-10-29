import React from 'react';

const withStyling = (WrappedComponent) => {
    return class extends React.Component {
      render() {
        return (
          <div style={{ margin: '20px', color: 'black' }}>
            <WrappedComponent {...this.props} />
          </div>
        );
      }
    };
  };

const About = () => {
  return (
    <div>
      <AboutHeader />
      <AboutContent />
    </div>
  );
};

const AboutHeader = () => {
  return (
    <h1 className="text-2xl font-semibold text-center mt-10">
      Tecnologias e Ferramentas
    </h1>
  );
};

const AboutContent = () => {
  return (
    <p className="text-base bg-slate-100 rounded-sm mr-10">
      O projeto foi desenvolvido utilizando as seguintes tecnologias e ferramentas:
    </p>
  );
};

const AboutHeaderwithStyling = withStyling(AboutHeader);
const AboutContentwithStyling = withStyling(AboutContent);

export default About;