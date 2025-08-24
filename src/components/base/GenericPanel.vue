<template>
  <div class="generic-panel">
    <div class="generic-panel-header">
      <slot name="header">
        <!-- Titre par défaut si aucun slot header n'est fourni -->
        <!-- <h2 class="generic-panel-title">Titre du panneau</h2> -->
      </slot>
    </div>
    <div class="generic-panel-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GenericPanel'
}
</script>

<style scoped>
.generic-panel {
  /* width: 95%; */
  margin: auto;
  /* background-color: #fff; */
  /* border-bottom: solid 1.3px #0000001c; */
  border-radius: var(--radius-xs, 12px);
  /* box-shadow: 0 4px 6px -1px rgba(0,0,0,0.08); */
  margin-bottom: var(--spacing-md, 1.5rem);
  overflow: hidden;
  /* Optionnel : transition douce */
  transition: box-shadow 0.2s;
}

.generic-panel-header {
  padding: var(--spacing-md, 1.2rem);
  /* background: #fff; */
  font-weight: 600;
  font-size: 1.1rem;
  border-bottom: 1px solid #f0f0f0;
}

.generic-panel-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #222;
}

.generic-panel-body {
  padding: var(--spacing-lg, 1.2rem);
}
</style>