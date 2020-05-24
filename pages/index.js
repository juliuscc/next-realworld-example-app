import React from "react";
import useSWR from "swr";

import Banner from "../components/home/Banner";
import MainView from "../components/home/MainView";
import { SERVER_BASE_URL } from "../lib/utils/constant";
import fetcher from "../lib/utils/fetcher";
import PageContext from "../lib/context/PageContext";

import Tags from "plutt-tags";
import { Router, useRouter } from "next/router";

const Home = ({ articles: initialArticles, tags: initialTags }) => {
  const { data: fetchedArticles } = useSWR(
    `${SERVER_BASE_URL}/articles`,
    fetcher,
    {
      initialArticles
    }
  );
  const { data: fetchedTags } = useSWR(`${SERVER_BASE_URL}/tags`, fetcher, {
    initialTags
  });

  const { articles, articlesCount } = fetchedArticles || initialArticles;
  const { tags } = fetchedTags || initialTags;

  const { setPage } = React.useContext(PageContext);

  const router = useRouter();

  return (
    <div className="home-page">
      <Banner />

      <div className="container page">
        <div className="row">
          <MainView articles={articles} articlesCount={articlesCount} />
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <Tags
                tags={tags}
                onClick={(tag) => {
                  setPage(0);
                  router.push(`/?tag=${tag}`, undefined, { shallow: true });
                }}
                shadow={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.getInitialProps = async () => {
  const articles = await fetcher(`${SERVER_BASE_URL}/articles`);
  const tags = await fetcher(`${SERVER_BASE_URL}/tags`);
  return { articles, tags };
};

export default Home;
