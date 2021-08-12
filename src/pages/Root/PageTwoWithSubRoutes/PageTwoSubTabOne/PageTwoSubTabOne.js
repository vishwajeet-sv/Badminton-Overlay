import React from 'react';
import { useParams } from 'react-router-dom';

function PageTwoSubTabOne() {
  const { resourceId } = useParams();

  return <div>PageTwoSubTabOne with resource id {resourceId}</div>;
}

export default PageTwoSubTabOne;
