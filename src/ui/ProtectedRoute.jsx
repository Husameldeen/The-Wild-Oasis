import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var() (--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. LOAD AUTHENTICATED USER FROM CACH AND COMPARE IT WITH SUPABASE
  const { isLoading, isAuthenticated } = useUser();

  // 2. IF THERE IS NO USER REDIRECT TO LOGIN PAGE
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate],
  );

  // 3. WHILE ISLOADING SHOW SPINNER
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // IF THERE IS USER LOAD THE PAGE
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
