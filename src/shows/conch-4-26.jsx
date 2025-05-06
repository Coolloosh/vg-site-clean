import React from 'react';
import ShowDetailPage from '../components/ShowDetailPage';
import { showData } from '../videoData';

export default function ConchIslandShow() {
  const data = showData['conch-4-26'];

  return <ShowDetailPage {...data} />;
}
