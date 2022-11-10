import styled from "styled-components";
import config from "../../config.json";

export const StyledBanner = styled.div`
    /*
    background-color: blue;
    background-image: url(${config.bg});
    */
    background-image: url(${({ bg }) => bg});
    height: 230px;
`;