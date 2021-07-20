import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main className='margin--xl'>
        <h2>What does it do?</h2>
        <p>
          This plugin provides a WYSIWYG editor for Markdown pages in the docs section. Navigate to
          any docs page and click the edit button at the bottom.
        </p>
        <p>
          The idea is to have the user login
          to their GitHub account. The editor will check if the user already has a fork of the
          upstream repository, if a branch exists for the page to edit and if that page exists.
          The editor will create any of these on behalf of the user if not present and will
          fetch the contents of the page. Once the user is done editing, the page can be saved
          by committing to the branch or published to the upstream repository by creating a
          pull request, all done automatically by the editor.
        </p>
      </main>
    </Layout>
  );
}
