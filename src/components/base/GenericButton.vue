<template>
  <button :class="[
    'generic-btn',
    `generic-btn--${variant}`,
    `generic-btn--${size}`,
    { 'generic-btn--loading': loading, 'generic-btn--disabled': disabled }
  ]" :disabled="disabled || loading" @click="$emit('click', $event)">
    <span v-if="loading" class="generic-btn-spinner"></span>
    <slot v-else />
  </button>
</template>

<script>
export default {
  name: 'GenericButton',
  emits: ['click'],
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'outline', 'danger', 'success', 'custom'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.generic-btn {
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  border-radius: var(--radius-xs, 8px);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: var(--spacing-xs) var(--spacing-sm);
  border: 1px solid transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs, 0.5rem);
  min-width: 90px;
}

/* Sizes */
.generic-btn--sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.generic-btn--md {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-md);
}

.generic-btn--lg {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-lg);
}

/* Variants */
.generic-btn--primary {
  background: var(--primary-color);
  color: white;
  border-color: none;
}

/* .generic-btn--primary:hover:not(:disabled) {
  background: var(--button-color-hover);
  border-color: none;
  } */
  
  .generic-btn--secondary {
    color: white;
    background: var(--secondary-color);
  /* border-color: var(--button-color); */
}

/* .generic-btn--secondary:hover:not(:disabled) {
  background: #4b5563;
  border-color: #4b5563;
} */

.generic-btn--outline {
  background: transparent;
  color: var(--button-color);
  border-color: var(--button-color);
}

/* .generic-btn--outline:hover:not(:disabled) {
  background: #3b82f6;
  color: white;
} */

.generic-btn--danger {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
}

/* .generic-btn--danger:hover:not(:disabled) {
  background: #dc2626;
  border-color: #dc2626;
} */

.generic-btn--success {
  background: #10b981;
  color: white;
  border-color: #10b981;
}

.generic-btn--custom {
  background: var(--button-custom-bg, var(--primary-color));
  color: var(--button-custom-color, white);
  border-color: var(--button-custom-border, transparent);
}

/* .generic-btn--success:hover:not(:disabled) {
  background: #059669;
  border-color: #059669;
} */

/* States */
.generic-btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.generic-btn--loading {
  opacity: 0.8;
  cursor: wait;
}

.generic-btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>