import styled from "styled-components";

interface LogoProps {
    width?: number
}

export default function ApplicationLogo({width}: LogoProps) {
    return (
        <Image width={width}/>
    );
}

const Image = styled.div<{ width?: number }>`
    min-height: 80px;
    min-width: ${props => {
        return props.width + "px"
    }};
    background-image: url("/img/logo-main.webp");
    background-position: center;
    background-repeat: no-repeat;
    background-clip: border-box;
    background-size: contain;
    margin: 7px;

    @media only screen and (max-width: 768px) {
        min-width: ${props => {
            return (props.width - 100) + "px"
        }};
    }
`
