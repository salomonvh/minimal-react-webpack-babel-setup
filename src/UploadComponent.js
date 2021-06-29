import React, { useCallback } from 'react';
import styled from "styled-components";
import Button from 'react-bootstrap/Button';

import Uploady, { useItemProgressListener, useRequestPreSend } from '@rpldy/uploady';
import UploadButton from '@rpldy/upload-button';
import UploadDropZone from '@rpldy/upload-drop-zone';
import { getMockSenderEnhancer } from "@rpldy/mock-sender";
import UploadPreview from "@rpldy/upload-preview";

const DropZone = styled(UploadDropZone)`
  border: 2px solid #fff;
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: lightgrey;
  border-style: dashed;
  border-color: black;
  border-radius: 5%;

  &.drag-over {
    background-color: #dceaf4;
    color: #000;
  }
`;


const PreviewContainer = styled.div`
  border: 2px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 400px;
  background-color: lightgrey;
  border-style: dashed;
  border-color: black;
  border-radius: 5%;
  
  img {
    max-width: 400px;
    max-height: auto;
    border-radius: 5%;
  }
`;



const retrieveSignatureForUpload = async (params, timestamp) => {
  // TODO: Some await function
  const response = {url: 'https://my-signing-service/signed'};

  console.log(response);
  return response.url;
};

const mockSenderEnhancer = getMockSenderEnhancer();

const LogProgress = () => {
  useItemProgressListener((item) => {
    console.log(`>>>>> (hook) File ${item.file.name} completed: ${item.completed}`);
  });

  return null;
};

const openAddFileModal = () => {
  console.log('openAddFileModal: ', file);
};

const UploadWithProgressPreview = () => {
  const getPreviewProps = useCallback((item) => ({ id: item.id }), []);

  useRequestPreSend(async ({ options }) => {
    const timestamp = Date.now();
    const signature = options.destination.params.signature;
    const url = await retrieveSignatureForUpload(
      options.destination.params,
      timestamp
    );

    console.log('URL: ', url);

    return {
      options: {
        destination: {
          url: url,
          params: {
            signature,
            timestamp,
          }
        }
      }
    };
  });



  return (
    <>
      <DropZone onDragOverClassName="drag-over">
        <span>Drag & Drop File here, or </span>
        <UploadButton> Click To Upload! </UploadButton>
      </DropZone>
      <LogProgress/>
      <PreviewContainer>
        <UploadPreview
          previewComponentProps={getPreviewProps}
        />
      </PreviewContainer>

      <Button id="id_submit-file-upload" onClick={openAddFileModal} color="primary" type="submit">
        Add
      </Button>

    </>
  );
};

class UploadComponent extends React.PureComponent {


  render() {
    return (
      <div>
        <h2>Hello, world!</h2>
        <Uploady destination={{ url: "https://my-server/upload" }} enhancer={mockSenderEnhancer}>

          <UploadWithProgressPreview/>

        </Uploady>


      </div>
    );
  }
}

export default UploadComponent;
