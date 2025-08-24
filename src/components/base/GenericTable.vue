<template>
  <div class="generic-table-wrapper">
    <div v-if="title || $slots.actions" class="generic-table-header">
      <h3 v-if="title" class="generic-table-title">{{ title }}</h3>
      <div class="generic-table-actions">
        <slot name="actions" />
      </div>
    </div>
    <div class="generic-table-scroll">
      <table class="generic-table" :class="{ 'generic-table--striped': striped }">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key" @click="col.sortable ? sort(col.key) : null"
              :class="{ sortable: col.sortable }">
              {{ col.label }}
              <span v-if="col.sortable" class="sort-indicator">
                <span v-if="sortKey === col.key && sortOrder === 'asc'">▲</span>
                <span v-else-if="sortKey === col.key && sortOrder === 'desc'">▼</span>
              </span>
            </th>
            <th v-if="$slots['row-actions']">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td :colspan="columns.length + ($slots['row-actions'] ? 1 : 0)" class="generic-table-loading">
              <span class="loader"></span> Chargement...
            </td>
          </tr>
          <tr v-else-if="paginatedData.length === 0">
            <td :colspan="columns.length + ($slots['row-actions'] ? 1 : 0)" class="generic-table-empty">
              <slot name="empty">
                <span>Aucune donnée à afficher</span>
              </slot>
            </td>
          </tr>
          <tr v-for="row in paginatedData" :key="row.id || row._id || row.key">
            <td v-for="col in columns" :key="col.key">
              <slot :name="`cell-${col.key}`" :value="row[col.key]" :row="row">
                {{ formatCell(row[col.key], col) }}
              </slot>
            </td>
            <td v-if="$slots['row-actions']">
              <slot name="row-actions" :row="row" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="pagination && totalPages > 1" class="generic-table-pagination">
      <button :disabled="currentPage === 1" @click="currentPage--">Précédent</button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="currentPage++">Suivant</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GenericTable',
  props: {
    title: String,
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Boolean,
      default: false
    },
    itemsPerPage: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      sortKey: '',
      sortOrder: 'asc',
      currentPage: 1
    }
  },
  computed: {
    sortedData() {
      if (!this.sortKey) return this.data
      return [...this.data].sort((a, b) => {
        const valA = a[this.sortKey]
        const valB = b[this.sortKey]
        if (valA === valB) return 0
        if (this.sortOrder === 'asc') return valA > valB ? 1 : -1
        return valA < valB ? 1 : -1
      })
    },
    paginatedData() {
      if (!this.pagination) return this.sortedData
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.sortedData.slice(start, start + this.itemsPerPage)
    },
    totalPages() {
      if (!this.pagination) return 1
      return Math.ceil(this.sortedData.length / this.itemsPerPage)
    }
  },
  watch: {
    data() {
      this.currentPage = 1
    }
  },
  methods: {
    sort(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortKey = key
        this.sortOrder = 'asc'
      }
    },
    formatCell(value, col) {
      if (col.format === 'date' && value) {
        return new Date(value).toLocaleDateString('fr-FR')
      }
      if (col.format === 'currency' && value != null) {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value)
      }
      return value
    }
  }
}
</script>

<style scoped>
.generic-table-wrapper {
  width: 100%;
  background: #fff;
  border-radius: var(--radius-xs, 8px);
  box-shadow: 0 1px 4px #0001;
  margin-bottom: var(--spacing-lg, 2rem);
  overflow-x: auto;
}

.generic-table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md, 1rem);
  border-bottom: 1px solid #f0f0f0;
}

.generic-table-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #222;
}

.generic-table-actions {
  display: flex;
  gap: var(--spacing-sm, 0.75rem);
}

.generic-table-scroll {
  overflow-x: auto;
}

.generic-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.generic-table th,
.generic-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

.generic-table th.sortable {
  cursor: pointer;
  user-select: none;
  font-weight: var(--font-weight-medium);
}

.generic-table--striped tbody tr:nth-child(odd) {
  background: #f9fafb;
}

.generic-table-loading,
.generic-table-empty {
  text-align: center;
  color: #888;
  font-style: italic;
}

.loader {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid #eee;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.generic-table-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem;
}

.generic-table-pagination button {
  background: var(--primary-color, #3b82f6);
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.generic-table-pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>