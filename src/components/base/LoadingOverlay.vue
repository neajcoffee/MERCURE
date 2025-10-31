<template>
  <div class="loading-overlay" role="alert" aria-live="polite">
    <div class="loading-content">
      <div class="spinner" aria-hidden="true"></div>
      <p class="loading-text">Préparation de votre expérience</p>
      <p class="loading-subtext">Nous optimisons les images et vidéos pour un rendu impeccable.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingOverlay'
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at top, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0) 55%),
    linear-gradient(135deg,
      color-mix(in srgb, var(--landing-color-primary, #052b33) 92%, #ffffff 8%) 0%,
      color-mix(in srgb, var(--landing-color-primary-light, #3b82f6) 85%, #000000 15%) 100%);
  backdrop-filter: blur(10px);
  z-index: 2000;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
  color: var(--landing-color-text-white, #f8fafc);
  padding: 32px 40px;
  border-radius: var(--radius-xl, 24px);
  box-shadow: 0 24px 60px rgba(5, 43, 51, 0.35);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.spinner {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.16);
  border-top-color: var(--landing-color-accent, #fbbf24);
  border-right-color: color-mix(in srgb, var(--landing-color-accent, #fbbf24) 65%, transparent);
  animation: spin 1s ease-in-out infinite;
  box-shadow: 0 0 25px rgba(175, 250, 19, 0.35);
}

.spinner::after {
  content: '';
  position: absolute;
  inset: 10px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.18);
  border-left-color: rgba(255, 255, 255, 0.65);
  animation: spin-reverse 1.4s linear infinite;
}

.loading-text {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.loading-subtext {
  font-size: 0.95rem;
  max-width: 320px;
  line-height: 1.5;
  color: color-mix(in srgb, var(--landing-color-text-white, #f8fafc) 84%, rgba(255, 255, 255, 0.6) 16%);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spin-reverse {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>

