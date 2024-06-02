import styled from "styled-components";

export default function ApplicationLogo(props) {
    return (
        <Image />
    );
}

const Image = styled.div`
    min-height: 80px;
    background-image: url("/img/logo-main.webp");
    background-position: center;
    background-repeat: no-repeat;
    background-clip: border-box;
    background-size: contain;
    margin: 7px;
`
