<template>
  <div :class="['generic-card', `generic-card--${variant}`]">
    <div v-if="$slots.header" class="generic-card-header">
      <slot name="header" />
    </div>
    <div class="generic-card-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="generic-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GenericCard',
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'elevated', 'outlined', 'flat'].includes(value)
    }
  }
}
</script>

<style scoped>
.generic-card {
  background: white;
  border-radius: var(--radius-sm);
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.generic-card--default {
  border: 1px solid #e7e7e7;
  /* box-shadow: 0px 1px 0px 0px #00000026; */
}

.generic-card--elevated {
  /* box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); */
  box-shadow: var(--shadow-soft);
}

/* .generic-card--elevated:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
} */

.generic-card--outlined {
  border: 1px solid #e5e7eb;
  box-shadow: none;
}

.generic-card--flat {
  box-shadow: none;
}

.generic-card-header {
  padding: var(--spacing-md, 1.5rem);
  border-bottom: 1px solid #f3f4f6;
  font-weight: 600;
  color: #374151;
}

.generic-card-body {
  padding: var(--spacing-md);
}

.generic-card-footer {
  padding: var(--spacing-md, 1.5rem);
  border-top: 1px solid #f3f4f6;
  background: #f9fafb;
}
</style>