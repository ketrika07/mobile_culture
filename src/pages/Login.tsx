import React, { useRef, useState } from 'react';
import axios from 'axios';
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonInput,
  IonList,
} from '@ionic/react';
import './Login.css';
import logoImage from '/assets/image/fichier.png';

function Login() {
  const modal = useRef<HTMLIonModalElement>(null);
  const nameInput = useRef<HTMLIonInputElement>(null);
  const emailInput = useRef<HTMLIonInputElement>(null);
  const passwordInput = useRef<HTMLIonInputElement>(null);
  const confirmPasswordInput = useRef<HTMLIonInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async () => {
    setLoading(true);
    const name = nameInput.current?.value;
    const email = emailInput.current?.value;
    const pwd = passwordInput.current?.value;
    const confirmPassword = confirmPasswordInput.current?.value;

    if (pwd !== confirmPassword) {
      alert('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/register', {
        name,
        email,
        pwd,
      });

      if (response.status ===  201) {
        // Registration successful, you can navigate to login or show success message
        // For example, navigate to login page after successful registration
        window.location.href = '/login';
      } else {
        // Handle other cases (e.g., user already exists)
      }
    } catch (error) {
      console.error('Registration failed', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    const email = emailInput.current?.value;
    const pwd = passwordInput.current?.value;

    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email,
        pwd,
      });

      if (response.status ===  200) {
        // Login successful, save token and navigate to home page
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        window.location.href = '/home';
      } else {
        // Handle login errors
      }
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="login-card">
          <div className="logo-container">
            <img src={logoImage} alt="Logo" className="logo" />
          </div>
          <IonList className="form-list">
            <IonItem lines="full">
              <IonInput label="Email" type="email" placeholder="email@domain.com" ref={emailInput}></IonInput>
            </IonItem>
            <IonItem lines="full">
              <IonInput label="Password" type="password" placeholder="password" ref={passwordInput}></IonInput>
            </IonItem>
          </IonList>
          <IonButton expand="block" onClick={handleLogin} className="login-button" disabled={loading}>
            <p>{loading ? 'Logging in...' : 'Login'}</p>
          </IonButton>
          <div className="sign-in">
            <p>Don't have an account? <a id="open-modal">Sign in</a></p>
          </div>
        </div>

        <IonModal ref={modal} trigger="open-modal">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <h1>Let's get started!</h1>
            <IonItem>
              <IonInput
                label="Enter your name"
                labelPlacement="stacked"
                ref={nameInput}
                type="text"
                placeholder="Your name"
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Enter your mail address"
                labelPlacement="stacked"
                ref={emailInput}
                type="email"
                placeholder="email@domain.com"
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Password"
                labelPlacement="stacked"
                ref={passwordInput}
                type="password"
                placeholder="your password"
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Confirm Password"
                labelPlacement="stacked"
                ref={confirmPasswordInput}
                type="password"
                placeholder="your password"
              />
            </IonItem>
            <IonButton expand="block" onClick={handleFormSubmit} className="login-button" disabled={loading}>
              <p>{loading ? 'Registering...' : 'Sign in'}</p>
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}

export default Login;
