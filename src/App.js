import React from 'react';

import Uploady from '@rpldy/uploady';
import UploadButton from '@rpldy/upload-button';

const App = ({ title }) => (<Uploady
  destination={{ url: 'https://my-server/upload' }}>
  <div>{title}</div>
  <UploadButton/>
</Uploady>);

export default App;
