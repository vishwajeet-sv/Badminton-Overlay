import React from 'react';
import { useParams } from 'react-router-dom';

function PageTwoSubTabTwo() {
  const { resourceId } = useParams();

  return <div>PageTwoSubTabTwo with resource id {resourceId}</div>;
}

export default PageTwoSubTabTwo;
