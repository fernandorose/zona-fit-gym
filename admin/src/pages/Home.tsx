import styled from "styled-components";
import Layout from "../layouts/Layout";

const Home = () => {
  const AdminContainer = styled.main`
    width: 100%;
    height: 100dvh;
    display: grid;
    place-content: center;
    place-items: center;
    div {
      border: solid 1px #080808;
      background: #132357;
      width: 1000px;
      height: 600px;
      border-radius: 10px;
      color: white;
      h1 {
        font-size: 3rem;
        background: linear-gradient(to top, #c4c4c4 9.58%, #ffffff 88.75%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 800;
        letter-spacing: -0.15rem;
      }
    }
  `;
  return (
    <Layout title="Home">
      <AdminContainer>
        <div>
          <h1>ZonaFitGYM Admin</h1>
        </div>
      </AdminContainer>
    </Layout>
  );
};

export default Home;
