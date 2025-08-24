<template>
  <div>
    <!-- Overlay mobile -->
    <div v-if="showOverlay" class="sidebar-overlay" @click="closeSidebar"></div>

    <!-- Bouton split-view -->
    <button class="split-view-toggle" :aria-label="open ? 'Masquer le menu' : 'Afficher le menu'" @click="toggleSidebar"
      :class="{ 'split-view-toggle--active': !open }">
      <Menu v-if="!open" :size="20" />
      <X v-else :size="20" />
    </button>

    <!-- Sidebar -->
    <div class="sidebar" :class="sidebarClasses">
      <!-- Slot pour le logo -->
      <div class="sidebar-logo">
        <slot name="logo"></slot>
      </div>

      <!-- Slot pour la navigation -->
      <nav class="sidebar-nav">
        <slot name="navigation"></slot>
      </nav>

      <!-- Slot pour les liens additionnels -->
      <div class="sidebar-links">
        <slot name="links"></slot>
      </div>

      <!-- Slot pour le bouton d'upgrade -->
      <div class="sidebar-upgrade">
        <slot name="upgrade"></slot>
      </div>

      <!-- Slot pour le profil utilisateur -->
      <div class="sidebar-user">
        <slot name="user"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { Menu, X } from 'lucide-vue-next'

export default {
  name: 'Sidebar',
  components: {
    Menu,
    X
  },
  props: {
    open: {
      type: Boolean,
      default: true
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle', 'close'],
  computed: {
    sidebarClasses() {
      return {
        'sidebar--open': this.open,
        'sidebar--mobile': this.isMobile
      }
    },

    showOverlay() {
      return this.isMobile && this.open
    },

    toggleIcon() {
      // Cette propriété n'est plus utilisée avec Lucide
      return this.open ? 'close' : 'menu'
    }
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggle')
    },

    closeSidebar() {
      this.$emit('close')
    }
  }
}
</script>

<style>
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.32);
  z-index: 99;
}

.split-view-toggle {
  position: fixed;
  top: var(--spacing-lg);
  right: var(--spacing-lg);
  z-index: 201;
  background: white;
  border-radius: var(--radius-full);
  height: 50px;
  display: flex !important;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-stroke), var(--shadow-soft);
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
}

.split-view-toggle--active {
  background-color: var(--background-hover);
}

.sidebar {
  position: fixed;
  top: 0;

  left: 0;
  height: 100vh;
  width: 256px;
  max-width: 80vw;
  /* background: var(--background-color, #222e3a); */
  z-index: 200;
  /* box-shadow: 0 2px 24px rgba(0, 0, 0, 0.12); */
  border-radius: 0 16px 16px 0;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s cubic-bezier(.4, 0, .2, 1);
  transform: translateX(-100%);
  color: #fff;
  padding: var(--spacing-sm);
}

.sidebar--open {
  transform: translateX(0);
}

.sidebar--mobile {
  top: var(--spacing-md);
  max-width: 320px;
  min-width: 220px;
  height: calc(100% - 2 * var(--spacing-md));
  left: var(--spacing-md);
  border-radius: var(--radius-sm);
}

.sidebar-logo {
  display: flex;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid rgb(255 255 255 / 10%);
  height: 80px;
}

.sidebar-logo-img {
  object-fit: contain;
}

.sidebar-nav {
  flex: 1;
  padding-top: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  margin: auto;
  width: 95%;
}

.sidebar-nav-btn {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
  width: 100%;
  padding: var(--spacing-xs) var(--spacing-sm);
  border: none;
  background: none;
  color: #ccc;
  border-radius: var(--radius-xs);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  font-size: var(--font-size-md);
  position: relative;
}

.sidebar-nav-btn--active,
.sidebar-nav-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.sidebar-nav-icon {
  display: flex;
  align-items: center;
  width: 20px;
  height: 20px;
}

.sidebar-nav-label {
  text-align: left;
  flex: 1;
  font-size: var(--font-size-sm);
}

.sidebar-premium {
  font-size: var(--font-size-xs);
  background: #fff;
  color: #000;
  padding: 1px 6px;
  border-radius: var(--radius-sm);
  font-weight: var(--font-weight-bold);
  margin-left: var(--spacing-xs);
}

.sidebar-links {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar-link {
  background: none;
  border: none;
  color: #ccc;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  transition: background 0.2s, color 0.2s;
}

.sidebar-link:hover {
  background: #2a4f50;
  color: #fff;
}

.sidebar-upgrade {
  background-color: white;
  border-radius: var(--radius-xs);
  margin-bottom: var(--spacing-sm);
  padding: var(--spacing-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  box-shadow: 0px 1px 0px black;
}


/* .sidebar-upgrade-btn span {
  color: var(--background-color);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-sm);
} */



.sidebar-user {
  display: flex;
  align-items: center;
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  background-color: #ffffff0d;
  position: relative;
}

.sidebar-user-avatar {
  width: 32px;
  height: 32px;
  background: #ffffff17;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  margin-right: 12px;
}

.sidebar-user-info {
  flex: 1;
}

.sidebar-user-name {
  font-size: 15px;
  font-weight: 500;
  color: #fff;
}

.sidebar-user-email {
  font-size: 12px;
  color: #bbb;
}

.sidebar-user-menu-btn {
  background: none;
  border: none;
  color: #bbb;
  font-size: 20px;
  cursor: pointer;
  margin-left: 8px;
  border-radius: 4px;
  padding: 4px;
  transition: background 0.2s, color 0.2s;
}

.sidebar-user-menu-btn:hover {
  background: #2a4f50;
  color: #fff;
}

.sidebar-user-menu {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 56px;
  background: #fff;
  color: #222;
  border-radius: 8px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #eee;
  z-index: 10;
  padding: 8px 0;
}

.sidebar-user-menu-item {
  width: 100%;
  background: none;
  border: none;
  color: #222;
  padding: 10px 24px;
  text-align: left;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.sidebar-user-menu-item:hover {
  background: #f5f5f5;
}

.sidebar-user-menu-divider {
  border-top: 1px solid #eee;
  margin: 4px 0;
}

.sidebar-user-menu-item--logout {
  color: #d32f2f;
}

/* .split-view-toggle {
  position: fixed;
  top: var(--spacing-md);
  right: var(--spacing-md);
  z-index: 201;
  background: white;
  border-radius: var(--radius-full);
  height: 50px;
  display: flex !important;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-stroke), var(--shadow-soft);
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
} */
</style>
