import React, { useEffect } from "react";
import { Global, css, connect, styled, Head } from "frontity";
import { awRegionT } from "./config_tag"
import Switch from "@frontity/components/switch";
import Header from "./header/header";
import List from "./list";
import Post from "./post";
import PerSemiStaticPost from "./stat-post";
import PerCatPost from "./perCatPost";
import PerCatTagPost from "./dyn-post";
import Loading from "./loading";
import Title from "./title";
import PageError from "./page-error";
import Page from "./pages/page";
import Footer from "./footer/footer";
import ListRecords from "./list-records";
import Record from "./record";
import BootstrapCss from './styles/bootstrap.css';
import gutenbergStyle from "./styles/gutenberg/style.css";
import gutenbergTheme from "./styles/gutenberg/theme.css";

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 * @param props - The props injected by Frontity's {@link connect} HOC.
 * @returns The top-level react component representing the theme.
 */
const Theme = ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);

  const tagIndex = ((!!state.theme.month_tag) ? state.theme.month_tag : "0");
  const month = Number.parseInt(tagIndex)  + 1;
  const period = String("20220").concat(month) ;
  const tagId = parseInt(awRegionT[parseInt(tagIndex)]);
  console.log("start period:" + period + " region:" + tagId );
  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
      </Head>

      {/* Add some global styles for the whole site, like body or a's. 
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={css(BootstrapCss)} />
      <Global styles={css(gutenbergStyle)} />
      <Global styles={css(gutenbergTheme)} />
      <Global styles={globalStyles} />

      {/* Add the header of the site. */}
      <HeadContainer>
        <Header />
      </HeadContainer>


      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <Main> 
        <Switch>
          <Loading when={data.isFetching} />
          <PerSemiStaticPost when={data.route=='/'} tagId={tagId} />
          <PerCatPost when={data.route=='/regionofthemonth/'} tagId={tagId} period={period} />
          <PerCatTagPost when={data.route=='/category/french-semester/'}  />
          <PerCatTagPost when={data.route=='/category/events/'} period={period}  />
          <PerCatTagPost when={data.route=='/main-events/'} period={period} />
          <PerCatTagPost when={data.route=='/main-facts/'}/>
          <List when={data.isArchive} />
          <Post when={data.isPostType} />
          <PageError when={data.isError} />
        </Switch>
      </Main>

      <FooterContainer>
        <Footer />
      </FooterContainer>
    </>
  );
};

export default connect(Theme);


const globalStyles = css`
  :root {
    --brand: #fdb937;
    --black: #000000;
    --white: #ffffff;
    --bodycolor: #343434;
  }
  body {
    margin: 0;
    color:var(--bodycolor);
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-feature-settings: "kern";
    -webkit-font-smoothing: antialiased;
  }
  a,
  a:visited {  
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }
  h1, h2, h3, h4, h5, h6 {
    color:var(--black);
  }
  p {
    line-height:24px;
    font-size:18px;
  }
  #root {
    display:flex;
    flex-direction: column;
    height: auto;
  }
  .container {
    max-width: 1200px;
    width:100%;
    margin: 0 auto;
    position: relative;
    padding-right: 15px;
    padding-left: 15px;
  }
  .section{
    padding: 34px 0;
  
  }
`;

const HeadContainer = styled.div`
  display: flex;
  width:100%;
  max-width:1800px;
  max-height:140px;
  justify-content: space-between;
  margin: 0 auto;
  border-bottom:1rem;
  padding-top: 1.45rem;
  padding-right: 15px;
  padding-left: 10px;
  padding-bottom:1.25rem;
  background-image: url('https://fr-semester.eu/wp-content/uploads/2021/12/central.bandeau-1.png');
  background-blend-mode: multiply;
  border: white;
  background-size: cover;
  @media (min-width: 768px) {
    padding-top: 1.25rem;
    max-height:180px;
    }
`;
const FooterContainer = styled.div`
  display: flex;
  width:100%;
  background:var(--black);
   margin-top: auto;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  padding-top:22px;
  padding-bottom:22px;
`;
