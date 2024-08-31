import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../../services/auth/auth.service'; // Assure-toi que ce service gère la récupération de l'utilisateur connecté

const PrivateRoute = ({ children, roles }) => {
  const currentUser = AuthService.getCurrentUser(); // Récupère l'utilisateur connecté

  if (!currentUser) {
    // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(currentUser.role)) {
    // Si l'utilisateur n'a pas les rôles nécessaires, redirige vers une page d'accès refusé
    return <Navigate to="/unauthorized" />;
  }

  // Si l'utilisateur est connecté et a les bons rôles, retourne le composant enfant
  return children;
};

export default PrivateRoute;
