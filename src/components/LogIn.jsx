import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import bgImage from '../assests/authbg.png'; 
import logo from '../assests/newgenlogo.png'; 
import sideImage from '../assests/side-image.png';
import { Link } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
  .inter-uniquifier {
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400; /* Adjust the weight as needed */
    font-style: normal;
    font-variation-settings: "slnt" 0;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
  width: 68%;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

const ImageContainer = styled.div`
  grid-column: span 6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  grid-column: span 6;
  padding: 40px;
`;

const Logo = styled.img`
  width: 219px;
  margin-bottom: -9px;
  margin-left: 58px;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: calc(100% - 20px);
  padding: 10px;
  margin-top: 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const ForgotPassword = styled.a`
  color: #007bff;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
  
  &::before, &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #ccc;
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }

  span {
    color: #A8A8A8;
    font-weight: bold;
    font-size:17px;
  }
`;

const Login = () => {
  return (
    <Container>
      <GlobalStyle />
      <GridContainer>
        <FormContainer>
          <Logo src={logo} alt="Logo" />
          <Divider><span>Login</span></Divider>
          <form>
            <label className="inter-uniquifier">Email</label>
            <Input type="email" placeholder="example.email@domain.com" required />
            <label className="inter-uniquifier">Password</label>
            <Input type="password" placeholder="Enter at least 8+ characters" required />
            <CheckboxContainer>
              <label className="inter-uniquifier">
                <Checkbox type="checkbox" />
                Keep me logged in
              </label>
              <ForgotPassword href="#">Forgot Password?</ForgotPassword>
            </CheckboxContainer>
            <Link to={'/dashboard'}><Button type="submit" >Login</Button></Link>
          </form>
        </FormContainer>
        <ImageContainer>
          <img src={sideImage} alt="Side Illustration" style={{ width: '100%', borderRadius: '0px 0 0 0px' }} />
        </ImageContainer>
      </GridContainer>
    </Container>
  );
};

export default Login;