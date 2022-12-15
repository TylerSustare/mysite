import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/me/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>

          <button
            className="button button--secondary button--lg"
            onClick={click}
          >
            click
          </button>
        </div>
      </div>
    </header>
  );
}

function click() {
  fetch("https://m4i9b5x025.execute-api.us-east-1.amazonaws.com/dev/hello", {
    method: "GET",
    headers: {
      "x-api-key": "pN3TptHgF76kDx5yLWzY41HDL27z8TT49GihcH0P",
    },
  });
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
