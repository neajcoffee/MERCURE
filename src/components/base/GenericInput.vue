<template>
  <div class="generic-input-wrapper">
    <label v-if="label" :for="inputId" class="generic-input-label">
      {{ label }}
      <span v-if="required" class="generic-input-required">*</span>
    </label>
    <div class="generic-input-container">
      <input :id="inputId" :type="type" :placeholder="placeholder" :value="modelValue" :disabled="disabled" :class="[
        'generic-input',
        { 'generic-input--error': error, 'generic-input--disabled': disabled }
      ]" @input="$emit('update:modelValue', $event.target.value)" @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)" />
    </div>
    <span v-if="error" class="generic-input-error">{{ error }}</span>
    <span v-else-if="hint" class="generic-input-hint">{{ hint }}</span>
  </div>
</template>

<script>
export default {
  name: 'GenericInput',
  emits: ['update:modelValue', 'blur', 'focus'],
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    inputId() {
      return `input-${Math.random().toString(36).substr(2, 9)}`
    }
  }
}
</script>

<style scoped>
.generic-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 0.5rem);
}

.generic-input-label {
  font-size: var(--font-size-sm, 0.875rem);
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs, 0.25rem);
}

.generic-input-required {
  color: #ef4444;
}

.generic-input-container {
  position: relative;
}

.generic-input {
  width: 100%;
  padding: var(--spacing-xs, 0.75rem) var(--spacing-sm, 1rem);
  border: 1px solid #d1d5db;
  border-radius: var(--radius-xs, 8px);
  font-size: var(--font-size-sm, 1rem);
  font-family: var(--font-family-base);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background: white;
}

.generic-input:focus {
  outline: none;
  border-color: var(--background-color);
}

.generic-input--error {
  border-color: #ef4444;
}

.generic-input--error:focus {
  border-color: #ef4444;
  /* box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1); */
}

.generic-input--disabled {
  background: #f9fafb;
  color: #6b7280;
  cursor: not-allowed;
}

.generic-input-error {
  font-size: var(--font-size-sm, 0.875rem);
  color: #ef4444;
}

.generic-input-hint {
  font-size: var(--font-size-sm, 0.875rem);
  color: #6b7280;
}
</style>