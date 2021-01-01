import Link from "next/link";
import styled from "styled-components";

import Layout from "../components/Layout";

import Config from "../utils/config";

const IndexPage = () => {
  const onFolderSelect = () => {
    const res = ipcRenderer.send("chooseFolder");
    console.log("RES", res);
  };

  return (
    <Layout title="Saves List">
      <div>
        <div>Choose folder</div>
        <SavePath>{Config.savesPath}</SavePath>
      </div>

      <button onClick={onFolderSelect}>
        <div>Choose exe file</div>
        <SavePath>{Config.savesPath}</SavePath>
      </button>

      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
};

const SavePath = styled.div`
  font-size: 16px;
  color: red;
`;

export default IndexPage;
