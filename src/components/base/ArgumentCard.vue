<template>
  <GenericCard :variant="variant" class="argument-card">
    <!-- <template #header>
      <div class="argument-header">
        <div v-if="icon" class="argument-icon">{{ icon }}</div>
        <div class="argument-header-text">
          <p v-if="eyebrow" class="argument-eyebrow">{{ eyebrow }}</p>
          <h3 class="argument-title">{{ title }}</h3>
          <p v-if="subtitle" class="argument-subtitle">{{ subtitle }}</p>
        </div>
      </div>
    </template> -->

    <div class="argument-body">
      <p v-if="description" class="argument-description">{{ description }}</p>

      <div v-if="hasColumnLayout" class="argument-columns">
        <div v-if="pros?.length" class="argument-column argument-column--pros">
          <p v-if="prosTitle" class="argument-column-title">{{ prosTitle }}</p>
          <ul class="argument-list">
            <li v-for="item in pros" :key="item" class="argument-list-item">
              <span class="argument-bullet argument-bullet--pros">✓</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <div v-if="cons?.length" class="argument-column argument-column--cons">
          <p v-if="consTitle" class="argument-column-title">{{ consTitle }}</p>
          <ul class="argument-list">
            <li v-for="item in cons" :key="item" class="argument-list-item">
              <span class="argument-bullet argument-bullet--cons">✕</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>

      <slot />
    </div>
  </GenericCard>
</template>

<script>
import GenericCard from './GenericCard.vue'

export default {
  name: 'ArgumentCard',
  components: {
    GenericCard
  },
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    eyebrow: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'flat',
      validator: (value) => ['default', 'elevated', 'outlined', 'flat'].includes(value)
    },
    pros: {
      type: Array,
      default: () => []
    },
    cons: {
      type: Array,
      default: () => []
    },
    prosTitle: {
      type: String,
      default: ''
    },
    consTitle: {
      type: String,
      default: ''
    }
  },
  computed: {
    hasColumnLayout() {
      return this.pros.length > 0 || this.cons.length > 0
    }
  }
}
</script>

<style scoped>
.argument-card {
  height: 100%;
}

.argument-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.argument-header-text {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.argument-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--landing-color-primary);
  color: var(--landing-color-text-white);
  font-weight: var(--font-weight-bold);
  font-size: 1.2rem;
}

.argument-eyebrow {
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--landing-color-text-light);
}

.argument-title {
  font-size: 1.25rem;
  font-weight: var(--font-weight-black);
  color: var(--landing-color-text);
  margin: 0;
}

.argument-subtitle {
  font-size: 0.95rem;
  color: var(--landing-color-text-light);
  margin: 0;
}

.argument-body {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.argument-description {
  margin: 0;
  color: var(--text-color);
  line-height: 1.6;
}

.argument-columns {
  display: grid;
  gap: var(--spacing-xs);
}

@media (min-width: 720px) {
  .argument-columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.argument-column {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
}

.argument-column--pros {
  /* background: rgba(16, 185, 129, 0.12); */
}

.argument-column--cons {
  /* background: rgba(239, 68, 68, 0.08); */
}

.argument-column-title {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: var(--font-weight-semibold);
  color: var(--landing-color-text);
  margin: 0;
}

.argument-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: var(--spacing-sm);
}

.argument-list-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  color: var(--text-color);
}

.argument-bullet {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  font-weight: var(--font-weight-bold);
  margin-top: 0.2rem;
}

.argument-bullet--pros {
  /* background: rgba(16, 185, 129, 0.2); */
  color: var(--landing-color-text);
}

.argument-bullet--cons {
  /* background: rgba(239, 68, 68, 0.2); */
  color: #b91c1c;
}
</style>
