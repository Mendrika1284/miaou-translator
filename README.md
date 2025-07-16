# Parle comme un chat 🐾

Une application Next.js 14 amusante qui simule la traduction de ce que dirait un chat quand tu parles dans ton micro !

## Fonctionnalités
- Bouton central "Parle comme un chat" qui active le micro
- Affichage d'un loader "Traduction en cours..." pendant l'écoute
- Affichage d'une phrase absurde et animée comme si le chat avait parlé
- Animation du chat cartoon et de la phrase traduite
- Design fun, responsive, police marrante

## Technologies
- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion
- API Web Speech (SpeechRecognition)

## Démarrage
1. Installe les dépendances :
   ```bash
   npm install
   ```
2. Lance le serveur de développement :
   ```bash
   npm run dev
   ```
3. Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

## Personnalisation
- Remplace `public/cartoon-cat.png` par ton propre chat cartoon si tu veux.
- Modifie le tableau des phrases dans `src/app/CatTranslator.tsx` pour ajouter tes propres absurdités.

## À venir
- Ajout possible d'une vraie route API pour des fonctionnalités avancées.

---
Projet réalisé pour s'amuser et miauler ! 😸
