<template>
  <div :class="['generic-alert', `generic-alert--${variant}`]" v-if="visible">
    <div class="generic-alert-icon">
      <span v-html="iconContent"></span>
    </div>
    <div class="generic-alert-content">
      <h4 v-if="title" class="generic-alert-title">{{ title }}</h4>
      <div class="generic-alert-message">
        <slot />
      </div>
    </div>
    <button v-if="dismissible" @click="dismiss" class="generic-alert-close">
      ✕
    </button>
  </div>
</template>

<script>
export default {
  name: 'GenericAlert',
  emits: ['dismiss'],
  props: {
    variant: {
      type: String,
      default: 'info',
      validator: (value) => ['info', 'success', 'warning', 'danger'].includes(value)
    },
    title: {
      type: String,
      default: ''
    },
    dismissible: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    iconContent() {
      const icons = {
        info: 'ℹ️',
        success: '✅',
        warning: '⚠️',
        danger: '❌'
      }
      return icons[this.variant] || icons.info
    }
  },
  methods: {
    dismiss() {
      this.$emit('dismiss')
    }
  }
}
</script>

<style scoped>
.generic-alert {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm, 0.75rem);
  padding: var(--spacing-md, 1rem);
  border-radius: var(--radius-xs, 8px);
  border: none;
}

.generic-alert--info {
  background: #f0f9ff;
  border-color: #0ea5e9;
  color: #0c4a6e;
}

.generic-alert--success {
  background: #f0fdf4;
  border-color: #22c55e;
  color: #14532d;
}

.generic-alert--warning {
  background: #fffbeb;
  border-color: #f59e0b;
  color: #92400e;
}

.generic-alert--danger {
  background: #fef2f2;
  border-color: #ef4444;
  color: #991b1b;
}

.generic-alert-icon {
  flex-shrink: 0;
  font-size: 1.25rem;
}

.generic-alert-content {
  flex: 1;
}

.generic-alert-title {
  margin: 0 0 var(--spacing-xs, 0.5rem) 0;
  font-size: var(--font-size-md, 1rem);
  font-weight: 600;
}

.generic-alert-message {
  font-size: var(--font-size-sm, 0.875rem);
  line-height: 1.5;
}

.generic-alert-close {
  position: absolute;
  top: var(--spacing-xs);
  right: var(--spacing-sm);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: currentColor;
  opacity: 0.7;
  transition: opacity 0.2s;
  padding: 0;
  flex-shrink: 0;
}

/* .generic-alert-close:hover {
  opacity: 1;
} */
</style>