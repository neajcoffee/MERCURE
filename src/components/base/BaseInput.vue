<template>
  <div class="base-input">
    <div class="input-wrapper" :class="{ 'has-error': error }">
      <span v-if="icon" class="input-icon">{{ icon }}</span>
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :class="{ 'has-icon': icon }"
        class="input-field"
      >
    </div>
    <span v-if="error" class="error-message">{{ error }}</span>
    <span v-if="helper && !error" class="helper-text">{{ helper }}</span>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
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
    },
    error: {
      type: String,
      default: null
    },
    helper: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    }
  },
  emits: ['update:modelValue', 'blur', 'focus']
}
</script>

<style scoped>
.base-input {
  width: 100%;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-field {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
  color: #2d3748;
}

.input-field.has-icon {
  padding-left: 2.5rem;
}

.input-field:focus {
  outline: none;
  border-color: #4299e1;
  /* box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1); */
}

.input-field:disabled {
  background: #f7fafc;
  color: #a0aec0;
  cursor: not-allowed;
}

.input-field::placeholder {
  color: #a0aec0;
}

.input-wrapper.has-error .input-field {
  border-color: #f56565;
}

.input-wrapper.has-error .input-field:focus {
  border-color: #f56565;
  /* box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.1); */
}

.input-icon {
  position: absolute;
  left: 0.75rem;
  z-index: 1;
  color: #a0aec0;
}

.error-message {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #f56565;
}

.helper-text {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #718096;
}
</style>
