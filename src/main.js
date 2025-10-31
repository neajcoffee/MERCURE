import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Import des styles globaux
import './assets/styles/main.css'

if (typeof document !== 'undefined') {
  const markFontsReady = () => {
    const root = document.documentElement

    if (!root.classList.contains('fonts-loaded')) {
      root.classList.remove('fonts-loading')
      root.classList.add('fonts-loaded')
    }
  }

  if (document.fonts && document.fonts.load) {
    const fontPromises = [
      document.fonts.load('400 1em "Inter"'),
      document.fonts.load('700 1em "Inter"'),
      document.fonts.load('400 1em "League Spartan"'),
      document.fonts.load('700 1em "Passion One"')
    ]

    const timeoutId = window.setTimeout(markFontsReady, 3000)

    Promise.all(fontPromises)
      .catch(() => {})
      .finally(() => {
        window.clearTimeout(timeoutId)
        markFontsReady()
      })
  } else {
    markFontsReady()
  }
}

// Import des icônes Lucide
import { 
  Home, 
  BarChart3, 
  Key, 
  Palette, 
  Package, 
  MoreVertical, 
  Settings, 
  LogOut,
  Menu,
  X,
  Plus
} from 'lucide-vue-next'

const app = createApp(App)

// Enregistrer les icônes Lucide globalement
app.component('Home', Home)
app.component('BarChart3', BarChart3)
app.component('Key', Key)
app.component('Palette', Palette)
app.component('Package', Package)
app.component('MoreVertical', MoreVertical)
app.component('Settings', Settings)
app.component('LogOut', LogOut)
app.component('Menu', Menu)
app.component('X', X)
app.component('Plus', Plus)

app.use(store)
app.use(router)

app.mount('#app')
