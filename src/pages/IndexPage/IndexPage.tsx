import './IndexPage.css';

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useInitData } from '@tma.js/sdk-react';

import { Link } from '../../components/Link';
import { Page } from '../../components/Page';
import { routes } from '../../navigation/routes.ts';

export const IndexPage: FC = () => {
  const [number, setNumber] = useState(null);
  const initData = useInitData();

  useEffect(() => {
    const userId = initData?.user?.id;
    if (!userId) {
      return;
    }
    const url = `https://pmpu.site/gigicoin/get_steps?tg_id=${userId.toString()}`;

    fetch(url)
      .then(response => response.json())
      .then(data => setNumber(data.steps));
  }, []);

  return (
    <Page title="Home">
      {/* <p>
        This page is a home page in this boilerplate. You can use the links below to visit other
        pages with their own functionality.
      </p> */}
      <div>
        {number && <h1>{number}</h1>}
      </div>
      <ul className="index-page__links">
        {routes.map(({ path, title }) => title && (
          <li className="index-page__link" key={path}>
            <Link to={path}>{title}</Link>
          </li>
        ))}
      </ul>
    </Page>
  );
};
