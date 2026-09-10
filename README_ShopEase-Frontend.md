# ShopEase Store — Frontend

Client React pour une plateforme e-commerce, développé en solo. Consomme l'API REST Laravel du dépôt [ShopEase API](https://github.com/Tmfouoyinda/E-commerce-API).

## Stack

- React
- Gestion d'état globale (Context API)
- Axios

## Fonctionnalités

- **AuthContext** pour la gestion de la session et de l'état d'authentification.
- **CartContext** pour la gestion du panier.
- **Routage protégé par rôle** (`ProtectedRoute` / `AdminRoute`) : accès différencié utilisateur / admin.
- Intercepteur Axios pour la gestion centralisée des requêtes authentifiées.
- Catalogue produits avec recherche et filtres.
- Dashboard admin (gestion des produits via modals).

## Structure

```
src/context/      AuthContext, CartContext
src/components/   Composants UI (catalogue, panier, dashboard admin)
src/routes/       Routage protégé
src/services/     Appels API (Axios)
```

## Lancer le projet

```bash
npm install
npm start
```

Nécessite l'API backend ([ShopEase API](https://github.com/Tmfouoyinda/E-commerce-API)) lancée en parallèle.
