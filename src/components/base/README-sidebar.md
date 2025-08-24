# Sidebar — Composant générique

Le composant `Sidebar` permet de créer une barre latérale totalement personnalisable grâce à l’utilisation de **slots nommés**. Il ne gère aucune logique métier et laisse l’intégration du contenu à l’utilisateur du composant.

## Utilisation de base

```vue
<template>
  <Sidebar>
    <template #logo>
      <img src="/logo-stella.svg" alt="Logo" class="sidebar-logo-img" />
    </template>

    <template #navigation>
      <button class="sidebar-nav-btn sidebar-nav-btn--active">
        <span class="sidebar-nav-icon">🏠</span>
        <span class="sidebar-nav-label">Accueil</span>
      </button>
      <button class="sidebar-nav-btn">
        <span class="sidebar-nav-icon">📊</span>
        <span class="sidebar-nav-label">Tableau de bord</span>
      </button>
      <!-- Ajoutez d'autres boutons ici -->
    </template>

    <template #links>
      <button class="sidebar-link">Obtenir 1 mois gratuit</button>
      <button class="sidebar-link">Demande de fonctionnalité</button>
    </template>

    <template #user>
      <div class="sidebar-user-avatar">A</div>
      <div class="sidebar-user-info">
        <div class="sidebar-user-name">Alice</div>
        <div class="sidebar-user-email">alice@email.com</div>
      </div>
      <!-- Ajoutez ici un menu utilisateur si besoin -->
    </template>
  </Sidebar>
</template>

<script>
import Sidebar from './sidebar.vue'
export default {
  components: { Sidebar }
}
</script>
```

## Slots disponibles

- **logo** : pour afficher le logo ou le nom de l’application.
- **navigation** : pour les liens ou boutons de navigation principaux.
- **links** : pour des liens additionnels (ex : offres, feedback, etc).
- **user** : pour le profil utilisateur, avatar, menu, etc.

## Personnalisation

Le composant n’impose aucune structure interne pour les slots. Vous pouvez donc y placer n’importe quel composant ou balise HTML, et utiliser les classes CSS fournies pour garder une cohérence visuelle.

## Exemple avancé

Vous pouvez intégrer des menus déroulants, des badges, ou des composants personnalisés dans chaque slot :

```vue
<template #user>
  <div class="sidebar-user-avatar">B</div>
  <div class="sidebar-user-info">
    <div class="sidebar-user-name">Bob</div>
    <div class="sidebar-user-email">bob@email.com</div>
  </div>
  <button class="sidebar-user-menu-btn" @click="showMenu = !showMenu">⋮</button>
  <div v-if="showMenu" class="sidebar-user-menu">
    <button class="sidebar-user-menu-item">Paramètres</button>
    <button class="sidebar-user-menu-item sidebar-user-menu-item--logout">Déconnexion</button>
  </div>
</template>
```

## Styles

Le composant inclut des classes CSS pour chaque section :
- `.sidebar-logo`
- `.sidebar-nav`
- `.sidebar-links`
- `.sidebar-user`
- et des classes utilitaires pour les boutons, labels, etc.

Vous pouvez surcharger ou compléter ces styles dans vos propres fichiers CSS/SCSS.

---

**Astuce :**  
Pour une sidebar totalement dynamique, vous pouvez générer vos boutons de navigation à partir d’un tableau d’objets dans votre composant parent.

---

## Résumé

- **Flexible** : injectez ce que vous voulez dans chaque section.
- **Aucun état interne** : toute la logique est gérée par le parent.
- **Réutilisable** : pour tout type d’application (admin, SaaS, etc).

---

N’hésitez pas à adapter les slots à vos besoins spécifiques ! 