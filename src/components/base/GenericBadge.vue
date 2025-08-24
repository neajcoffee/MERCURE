<template>
  <span :class="['generic-badge', `generic-badge--${variant}`, `generic-badge--${size}`]">
    <slot />
  </span>
</template>

<script>
export default {
  name: 'GenericBadge',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'success', 'warning', 'danger', 'info'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    }
  }
}
</script>

<style scoped>
.generic-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: var(--radius-xs);
  white-space: nowrap;
}

/* Sizes */
.generic-badge--sm {
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
}

.generic-badge--md {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}

.generic-badge--lg {
  padding: 0.375rem 1rem;
  font-size: 1rem;
}

/* Variants */
.generic-badge--primary {
  background: #dbeafe;
  color: #1e40af;
}

.generic-badge--secondary {
  background: #f3f4f6;
  color: #374151;
}

.generic-badge--success {
  background: #d1fae5;
  color: #065f46;
}

.generic-badge--warning {
  background: #fef3c7;
  color: #92400e;
}

.generic-badge--danger {
  background: #fee2e2;
  color: #991b1b;
}

.generic-badge--info {
  background: #e0f2fe;
  color: #0c4a6e;
}
</style> 