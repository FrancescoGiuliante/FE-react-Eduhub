# React + TypeScript + Vite Project

Questo progetto è una applicazione web sviluppata con React, TypeScript e Vite. Include diverse funzionalità come la gestione di quiz, animazioni, caricamento di file e altro.

This project is a web application developed with React, TypeScript, and Vite. It includes various features such as quiz management, animations, file uploads, and more.

## Avvio del Progetto / Starting the Project

Per avviare il progetto, segui questi passaggi:

To start the project, follow these steps:

1. Clona il repository / Clone the repository:
    ```sh
    git clone https://github.com/FrancescoGiuliante/FE-react-Eduhub.git
    cd FE-React
    ```

2. Installa le dipendenze / Install dependencies:
    ```sh
    npm install
    ```

3. Crea un file [`.env`](.env ) nella root del progetto e aggiungi le variabili d'ambiente necessarie (puoi usare [`.env.example`](.env.example ) come riferimento).

Create a [`.env`](.env ) file in the root of the project and add the necessary environment variables (you can use [`.env.example`](.env.example ) as a reference).

4. Avvia il server di sviluppo / Start the development server:
    ```sh
    npm run dev
    ```

5. Apri il browser e vai a `http://localhost:5173`.

Open the browser and go to `http://localhost:5173`.

## Profili di Prova / Test Profiles

Ecco quattro profili di prova per testare l'app:

Here are four test profiles for testing the app:

1. **Admin**
    - Email: admin@email.com
    - Password: 123456789

2. **Professor**
    - Email: profr@email.com
    - Password: 123456789

3. **Student**
    - Email: student@email.com
    - Password: 123456789

4. **Guest**
    - Email: user@email.com
    - Password: 123456789

## Struttura del Progetto / Project Structure

La struttura del progetto è organizzata come segue:

The project structure is organized as follows:

├── .env # Variabili d'ambiente ├── .gitignore # File per ignorare i file non necessari ├── components/ # Componenti principali dell'app │ ├── card/ # Componenti per le carte │ ├── common/ # Componenti generali riutilizzabili │ └── ... ├── public/ # Contenuti pubblici ├── src/ # Codice sorgente ├── tailwind.config.ts # Configurazione di Tailwind CSS └── vite.config.ts #


## Tecnologie Usate / Technologies Used

- **React**: Utilizzato per la costruzione dell'interfaccia utente.
- **TypeScript**: Utilizzato per migliorare la qualità del codice con tipi statici.
- **Vite**: Utilizzato per il bundling e il server di sviluppo.
- **Tailwind CSS**: Utilizzato per la stilizzazione rapida e personalizzabile.
- **GSAP**: Utilizzato per le animazioni avanzate.
- **Slick Carousel**: Utilizzato per creare slider/carousel.
- **Axios**: Utilizzato per effettuare richieste API.
- **React Router**: Utilizzato per la gestione delle rotte.
- **React Hook Form**: Utilizzato per la gestione dei form.
- **Zod**: Utilizzato per la validazione degli schemi di dati.
- **html5-qrcode**: Utilizzato per scannerizzare il qr-code utile per registrare la presenza degli studenti a lezione.

- **React**: Used for building the user interface.
- **TypeScript**: Used to improve code quality with static types.
- **Vite**: Used for bundling and development server.
- **Tailwind CSS**: Used for rapid and customizable styling.
- **GSAP**: Used for advanced animations.
- **Slick Carousel**: Used for creating sliders/carousels.
- **Axios**: Used for making API requests.
- **React Router**: Used for routing management.
- **React Hook Form**: Used for form management.
- **Zod**: Used for data schema validation.
- **html5-qrcode**: Used for scanning the qr-code need for register the attendances of the students in a lesson.


## Funzionalità Principali / Main Features

- **Gestione dei Quiz**: Creazione, modifica e visualizzazione dei quiz.
- **Animazioni**: Animazioni avanzate con GSAP.
- **Caricamento di File**: Caricamento di file con anteprima.
- **Slider**: Slider/carousel per visualizzare contenuti.
- **Registra presenze con QR-Code**: html5-qrcode per scannerizzare il qr-code.

- **Quiz Management**: Creation, modification, and viewing of quizzes.
- **Animations**: Advanced animations with GSAP.
- **File Uploads**: File uploads with preview.
- **Slider**: Slider/carousel for displaying content.
- **Register attendances with QR-Code**: html5-qrcode for scanning the qr-code.


## Autori / Authors

- [Francesco Giuliante] (https://github.com/FrancescoGiuliante)

## Licenza / License

Questo progetto è distribuito sotto la licenza MIT. Vedi il file LICENSE per maggiori dettagli.

This project is licensed under the MIT License. See the LICENSE file for more details.



