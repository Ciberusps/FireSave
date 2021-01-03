import Link from "next/link";
import styled from "styled-components";
import { remote } from "electron";

import Layout from "../components/Layout";

import Config from "../utils/config";

const IndexPage = () => {
  const onFolderSelect = () => {
    // remote.getCurrentWindow().minimize();
    // const res = ipcRenderer.send("chooseFolder");
    // console.log("RES", res);
  };

  return (
    <Layout title="Saves List">
      <button onClick={onFolderSelect}>
        <div>Choose steam folder</div>
        <SavePath>{Config.savesPath}</SavePath>
      </button>
    </Layout>
  );
};

const SavePath = styled.div`
  font-size: 16px;
  color: red;
`;

export default IndexPage;
