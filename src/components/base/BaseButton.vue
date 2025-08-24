<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="loading-spinner"></span>
    <slot v-else></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  computed: {
    buttonClasses() {
      return [
        'base-button',
        `variant-${this.variant}`,
        `size-${this.size}`,
        {
          'is-disabled': this.disabled || this.loading,
          'is-loading': this.loading,
          'is-block': this.block
        }
      ]
    }
  }
}
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  position: relative;
  min-height: 2.5rem;
}

.base-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
}

/* Variants */
.variant-primary {
  background: #4299e1;
  color: white;
  border: 2px solid #4299e1;
}

.variant-primary:hover:not(.is-disabled) {
  background: #3182ce;
  border-color: #3182ce;
}

.variant-secondary {
  background: #718096;
  color: white;
  border: 2px solid #718096;
}

.variant-secondary:hover:not(.is-disabled) {
  background: #4a5568;
  border-color: #4a5568;
}

.variant-outline {
  background: transparent;
  color: #4299e1;
  border: 2px solid #4299e1;
}

.variant-outline:hover:not(.is-disabled) {
  background: #4299e1;
  color: white;
}

.variant-ghost {
  background: transparent;
  color: #4299e1;
  border: 2px solid transparent;
}

.variant-ghost:hover:not(.is-disabled) {
  background: #ebf8ff;
}

.variant-danger {
  background: #f56565;
  color: white;
  border: 2px solid #f56565;
}

.variant-danger:hover:not(.is-disabled) {
  background: #e53e3e;
  border-color: #e53e3e;
}

/* Sizes */
.size-small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  min-height: 2rem;
}

.size-medium {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.size-large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
  min-height: 3rem;
}

/* States */
.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.is-loading {
  cursor: wait;
}

.is-block {
  width: 100%;
}

.loading-spinner {
  width: 1rem;
  height: 1rem;
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
