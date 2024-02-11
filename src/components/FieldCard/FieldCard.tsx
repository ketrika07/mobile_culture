// import React from 'react';
// import { IonCard, IonCardContent, IonRow, IonCol, IonText, IonIcon } from '@ionic/react';
// import MapIcon from '/assets/icons/location-icon.svg';
// import './FieldCard.css'; // Custom CSS file for styling

// interface FieldCardProps {
//   fieldAreaText: string;
//   locationText: string;
// }

// const FieldCard: React.FC<FieldCardProps> = ({ fieldAreaText, locationText }) => {
//   return (
//     <IonCard className="field-card">
//       <div className='nb-plot-container'>
//         <h3 className='nb-plot'>plot : 16</h3>
//       </div>
//       <div className="image-container">
//         <img src="/assets/icons/map-image.png" alt="Field Image" className="field-image" />
//       </div>
//       <a href='/field'>
//         <IonCardContent className="field-card-info">
//           <IonRow className="field-area-row ion-align-items-center ion-justify-content-center">
//             <IonText className="field-area-text" style={{ fontSize: '32px', fontWeight: 'bold' }}>{fieldAreaText}</IonText>
//           </IonRow>
//           <IonRow className="location-row ion-align-items-center ion-justify-content-center">
//             <IonIcon icon={MapIcon} className="location-icon" />
//             <IonText className="location-text" style={{ fontSize: '20px', fontWeight: 'bold' }}>{locationText}</IonText>
//           </IonRow>
//         </IonCardContent>
//       </a>
//     </IonCard>
//   );
// };

// export default FieldCard;


import React from 'react';
import { IonCard, IonCardContent, IonRow, IonCol, IonText, IonIcon } from '@ionic/react';
import MapIcon from '/assets/icons/location-icon.svg';
import './FieldCard.css'; // Custom CSS file for styling

interface FieldCardProps {
  field:
  {
    id: string;
    area: string;
    location: string;
    plots: any[];
  }
}


const FieldCard: React.FC<FieldCardProps> = ({ field }) => {
  return (
    <IonCard className="field-card">
      <div className="image-container">
        <img src="/assets/icons/Beautiful rice.jpg" alt="Field Image" className="field-image" />
      </div>
      <a href='/field'>
        {/* <IonCardContent className="field-card-info"> */}
          <IonRow className="field-area-row">
            <IonText className="field-area-text">{field.area} m²</IonText>
          </IonRow>
          <IonRow className="location-row">
            <IonIcon icon={MapIcon} className="location-icon" />
            <IonText className="location-text">{field.location}</IonText>
          </IonRow>
          <IonRow>
            <div className='nb-plot-container'>
              <h3 className='nb-plot'>parcelle : {field.plots.length}</h3>
            </div>
          </IonRow>
          
        {/* </IonCardContent> */}
      </a>
    </IonCard>
  );
};

export default FieldCard;
