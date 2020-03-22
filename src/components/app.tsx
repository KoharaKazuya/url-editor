import { Fragment, FunctionalComponent, h } from "preact";
import { UriContextProvider } from "./context";
import Footer from "./footer";
import Header from "./header";
import Layout from "./layout";
import UriComponents from "./uri-components";
import UriInputBox from "./uri-input-box";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
  // tslint:disable-next-line:no-var-requires
  require("preact/debug");
}

const App: FunctionalComponent = () => {
  return (
    <div id="app">
      <UriContextProvider>
        <Layout
          header={<Header />}
          main={
            <Fragment>
              <UriInputBox />
              <UriComponents />
            </Fragment>
          }
          footer={<Footer />}
        />
      </UriContextProvider>
    </div>
  );
};

export default App;
