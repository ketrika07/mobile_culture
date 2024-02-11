import { IonContent, IonFab, IonFabButton, IonIcon, IonImg, IonInput, IonPage, IonSearchbar, IonTitle } from "@ionic/react";
import React,{useEffect, useState} from "react";
import NotificationCard from "../components/CNotificationItem/NotificationCard";
import HeaderApp from "../components/CHeader/HeaderApp";
import FieldCard from "../components/FieldCard/FieldCard";
import { add } from 'ionicons/icons';
import axios from 'axios';

interface Field {
    field: any;
  }

const Home: React.FC = () => {

    const[fields, setFields] = useState<any[]>([]);

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        // setLoading(true);
        // await new Promise(resolve => setTimeout(resolve, 500));
        const endpoint = 'http://localhost:8080/api/fields';
    
        try {
          const response = await axios.get<Field[]>(endpoint);
          setFields(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }finally{
        //   setLoading(false);
        }
      };

    return (
        <IonPage>
            <IonContent>
                <HeaderApp></HeaderApp>
                {/* <div className="searchbar">
                    <IonInput></IonInput>
                    <IonImg className="searchbar-icon" src="/assets/icons/SearchIcon.png"></IonImg>
                </div>   */}
                
                <div className="Field-Scroll">
                    <div className="fieldList">
                        {fields.map((field, index) => (
                            <FieldCard key={index} field={field} />
                        ))}
                    </div>
                </div>
                <IonFab>
                    <IonFabButton href="/addfield">
                    <IonIcon icon={add}></IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );

}

export default Home;