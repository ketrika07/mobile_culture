import React, { useRef, useState } from 'react';
import { IonButton, IonCol, IonIcon, IonRow } from '@ionic/react';
import { cloudUploadOutline } from 'ionicons/icons';
import './FileUploader.css';

const FileUploader: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Display previews
      const previews: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && e.target.result) {
            previews.push(e.target.result.toString());
            setFilePreviews([...previews]);

            /** base64 String */
            console.log(e.target.result.toString());
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <input
        hidden
        type="file"
        accept="image/*"
        multiple 
        ref={(el) => (fileInputRef.current = el)}
        onChange={handleFileInputChange}
        required
      />
      {filePreviews.map((preview, index) => (
        <img key={index} src={preview} alt={`File Preview ${index}`} style={{ maxWidth: '100%', maxHeight: '100px', margin: '5px' }} />
      ))}

      <IonRow>
        <IonCol size='12'>
          <div className="upload">
            <button className='upload-button'onClick={handleButtonClick}>
              <IonIcon slot="start" icon={cloudUploadOutline} />
              Upload Image
            </button>
          </div>
        </IonCol>
      </IonRow>
    </>
  );
};

export default FileUploader;
