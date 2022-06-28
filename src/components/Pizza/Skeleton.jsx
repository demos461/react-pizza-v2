import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton = props => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="135" cy="130" r="130" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="20" />
    <rect x="0" y="310" rx="10" ry="10" width="280" height="88" />
    <rect x="2" y="425" rx="10" ry="10" width="90" height="27" />
    <rect x="130" y="415" rx="30" ry="30" width="150" height="45" />
  </ContentLoader>
);
