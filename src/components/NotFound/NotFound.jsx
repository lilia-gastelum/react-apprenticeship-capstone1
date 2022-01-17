import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import styled from 'styled-components';

const Heading1 = styled.h1`
  background: -webkit-linear-gradient(120deg,
    #e36414 0,
    #fd1d1d 50%,
    #833ab4 100%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    font-size: 3rem;
`;

const Heading2 = styled.h2`
  background: -webkit-linear-gradient(120deg,
    #e36414 0,
    #fd1d1d 50%,
    #833ab4 100%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
`;

const Section = styled(Container)({
    height: '100%',
    marginTop: '12% !important',
    textAlign: 'center'
});

function NotFound() {

    return (
        <Section text>
            <Heading1>Oops!</Heading1>
            <Heading2>This page does not exist</Heading2>
            <Link to='/home'>Return to home</Link>
        </Section   >

    );
}

export default NotFound;