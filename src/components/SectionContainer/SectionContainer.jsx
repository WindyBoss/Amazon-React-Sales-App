import { useContext } from 'react';
import { themeContext } from '../../context/authContext';
import { Container } from './SectionContainer.styled';

const SectionContainer = ({ children, name, addStyle, id }) => {
  const { selectedTheme } = useContext(themeContext);

  return (
    <Container id={id} style={addStyle} theme={selectedTheme} name={name}>
      {children}
    </Container>
  );
};

export default SectionContainer;
