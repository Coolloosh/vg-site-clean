import React from 'react';
import ShowDetailPage from '../components/ShowDetailPage';
import { showData } from '../videoData';

export default function DeerParkShow() {
  const data = showData['deer-park-11-29'];

  return <ShowDetailPage {...data} />;
}