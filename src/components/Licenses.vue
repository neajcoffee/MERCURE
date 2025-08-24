<template>
  <div class="p-4">
    <div v-if="loading">Chargement des licences...</div>
    <div v-else-if="error" class="text-red-500">Erreur : {{ error }}</div>
    <div v-else>
      <!-- Informations sur l'utilisation des licences -->
      <GenericCard variant="elevated" class="license-usage-info">
        <div class="usage-header">
          <h4>Utilisation des licences</h4>
          <GenericBadge :variant="isUnlimited ? 'success' : (licenses.length >= maxLicenses ? 'warning' : 'success')"
            size="sm">
            {{ isUnlimited ? 'Illimité' : (licenses.length >= maxLicenses ? 'Limite atteinte' : 'Disponible') }}
          </GenericBadge>
        </div>
        <div class="usage-details">
          <div class="usage-stats">
            <div class="usage-stat">
              <span class="stat-label">Licences utilisées</span>
              <span class="stat-value">{{ licenses.length }}</span>
            </div>
            <div class="usage-stat">
              <span class="stat-label">Limite de votre abonnement</span>
              <span class="stat-value">{{ isUnlimited ? 'Illimité' : maxLicenses }}</span>
            </div>
            <div class="usage-stat" v-if="!isUnlimited">
              <span class="stat-label">Licences restantes</span>
              <span class="stat-value" :class="{ 'text-warning': maxLicenses - licenses.length <= 2 }">
                {{ Math.max(0, maxLicenses - licenses.length) }}
              </span>
            </div>
          </div>
        </div>
      </GenericCard>

      <GenericCard variant="elevated">
        <div class="license-header">
          <h4>Mes licences</h4>
          <GenericButton variant="primary" size="sm" @click="openCreateModal" :disabled="!canAddLicense">
            <Plus :size="16" class="button-icon" />
            Ajouter une licence
          </GenericButton>
        </div>
        <div class="license-list">
          <div v-for="license in licenses" :key="license._id" class="license-item">
            <div class="license-info">
              <span class="license-custom-domain">{{ license.custom_domain }}</span>
              <span class="license-shop-domain">{{ license.shop_domain }}</span>
            </div>
            <span class="license-status">
              <GenericBadge :variant="license.status === 'active' ? 'success' : 'secondary'" size="sm">
                {{ license.status }}
              </GenericBadge>
            </span>
            <span class="license-expires-at" style="margin-left:16px;">
              Expire le : {{ new Date(license.expires_at).toLocaleDateString('fr-FR') }}
            </span>
            <div class="license-actions">
              <GenericButton size="sm" variant="secondary" @click="editLicense(license)">Modifier</GenericButton>
              <GenericButton size="sm" variant="danger" @click="confirmDelete(license._id)">Supprimer</GenericButton>
            </div>
          </div>
        </div>
      </GenericCard>
    </div>
    <div v-if="showEditModal" class="modal-backdrop">
      <div class="modal">
        <h3>{{ editedLicense._id ? 'Modifier la licence' : 'Créer une nouvelle licence' }}</h3>

        <!-- Affichage des erreurs -->
        <div v-if="modalError" class="modal-error">
          {{ modalError }}
        </div>

        <label>Domaine personnalisé</label>
        <input v-model="editedLicense.custom_domain" type="text" class="input" placeholder="nom-de-domaine.com"
          :disabled="modalLoading" />

        <label>Domaine Shopify</label>
        <div class="input-group">
          <input v-model="shopDomainInput" type="text" class="input shopify-input" placeholder="ma-boutique"
            :disabled="modalLoading" />
          <span class="input-suffix">.myshopify.com</span>
        </div>

        <div class="modal-actions">
          <GenericButton variant="primary" size="sm" @click="saveLicenseEdit" :disabled="modalLoading">
            <span v-if="modalLoading">Chargement...</span>
            <span v-else>{{ editedLicense._id ? 'Enregistrer' : 'Créer' }}</span>
          </GenericButton>
          <GenericButton variant="secondary" size="sm" @click="closeEditModal" :disabled="modalLoading">
            Annuler
          </GenericButton>
        </div>
      </div>
    </div>

    <!-- Modale de suppression -->
    <div v-if="showDeleteModal" class="modal-backdrop">
      <div class="modal delete-modal">
        <h3>Confirmer la suppression</h3>

        <!-- Affichage des erreurs -->
        <div v-if="modalError" class="modal-error">
          {{ modalError }}
        </div>

        <div class="delete-content">
          <p>Êtes-vous sûr de vouloir supprimer cette licence ?</p>

          <div class="license-to-delete">
            <div class="delete-license-info">
              <span class="delete-domain">{{ licenseToDelete?.custom_domain }}</span>
              <span class="delete-shop">{{ licenseToDelete?.shop_domain }}</span>
            </div>
          </div>

          <p class="delete-warning">
            <strong>Attention :</strong> Cette action est irréversible.
          </p>
        </div>

        <div class="modal-actions">
          <GenericButton variant="danger" size="sm" @click="deleteLicense" :disabled="modalLoading">
            <span v-if="modalLoading">Suppression...</span>
            <span v-else>Supprimer définitivement</span>
          </GenericButton>
          <GenericButton variant="secondary" size="sm" @click="closeDeleteModal" :disabled="modalLoading">
            Annuler
          </GenericButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { licenseService } from '@/services/license.service';
import { subscriptionService } from '@/services/subscription.service';
import GenericTable from './base/GenericTable.vue';
import GenericButton from './base/GenericButton.vue';
import GenericBadge from './base/GenericBadge.vue';
import GenericCard from './base/GenericCard.vue';
import { Plus } from 'lucide-vue-next';

export default {
  name: 'LicenseManager',
  components: { GenericTable, GenericButton, GenericBadge, GenericCard, Plus },
  data() {
    return {
      licenses: [],
      loading: false,
      error: null,
      currentSubscription: null,
      modalError: null, // Nouvelle propriété pour les erreurs de la modale
      modalLoading: false, // Nouvelle propriété pour l'état de chargement de la modale
      showEditModal: false,
      showDeleteModal: false, // Nouvelle propriété pour la modale de suppression
      licenseToDelete: null, // Nouvelle propriété pour stocker la licence à supprimer
      columns: [
        // { key: 'customer_email', label: 'Email', sortable: true },
        { key: 'shop_domain', label: 'Domaine Shopify', sortable: true },
        { key: 'custom_domain', label: 'Domaine personnalisé', sortable: true },
        // { key: 'customer_name', label: 'Nom client', sortable: true },
        { key: 'theme_name', label: 'Thème', sortable: true },
        // { key: 'theme_version', label: 'Version', sortable: true },
        { key: 'status', label: 'Statut', sortable: true },
        { key: 'expires_at', label: 'Expire le', sortable: true, format: 'date' },
      ],
      editedLicense: {
        custom_domain: '',
        shop_domain: '',
        _id: ''
      },
      shopDomainInput: '' // Initialisation correcte
    };
  },
  computed: {
    maxLicenses() {
      if (!this.currentSubscription || !this.currentSubscription.hasSubscription) {
        return 0;
      }
      return this.currentSubscription.usage.licensesLimit || 0;
    },
    canAddLicense() {
      return this.maxLicenses === 999 || this.licenses.length < this.maxLicenses;
    },
    licenseUsageText() {
      if (this.maxLicenses === 999) {
        return `${this.licenses.length} licences utilisées (illimité)`;
      }
      return `${this.licenses.length} / ${this.maxLicenses} licences utilisées`;
    },
    isUnlimited() {
      return this.maxLicenses === 999;
    }
  },
  methods: {
    async fetchLicenses() {
      this.loading = true;
      this.error = null;
      try {
        const response = await licenseService.getAllLicenses();
        this.licenses = response.licenses;
      } catch (err) {
        this.error = err.data?.message || 'Erreur lors du chargement.';
      } finally {
        this.loading = false;
      }
    },
    async fetchCurrentSubscription() {
      try {
        const subscription = await subscriptionService.getCurrentSubscription();
        this.currentSubscription = subscription;
      } catch (err) {
        console.error('Erreur lors du chargement de l\'abonnement:', err);
      }
    },
    confirmDelete(id) {
      // Trouver la licence à supprimer
      const license = this.licenses.find(l => l._id === id);
      if (!license) {
        this.$store.dispatch('showNotification', {
          message: 'Licence introuvable',
          type: 'error'
        });
        return;
      }

      this.licenseToDelete = license;
      this.modalError = null;
      this.showDeleteModal = true;
    },

    async deleteLicense() {
      if (!this.licenseToDelete) return;

      this.modalLoading = true;
      this.modalError = null;

      try {
        await licenseService.deleteClientLicense(this.licenseToDelete._id);

        this.$store.dispatch('showNotification', {
          message: 'Licence supprimée avec succès',
          type: 'success'
        });

        this.closeDeleteModal();
        this.fetchLicenses();
      } catch (err) {
        this.modalError = this.getErrorMessage(err);
      } finally {
        this.modalLoading = false;
      }
    },

    editLicense(license) {
      this.editedLicense = { ...license };
      // Nettoyer le domaine Shopify pour l'affichage (enlever .myshopify.com)
      this.shopDomainInput = license.shop_domain ? license.shop_domain.replace('.myshopify.com', '') : '';
      this.modalError = null; // Réinitialiser les erreurs
      this.showEditModal = true;
    },
    openCreateModal() {
      if (!this.canAddLicense) {
        this.$store.dispatch('showNotification', {
          message: `Vous avez atteint la limite de ${this.maxLicenses} licences de votre abonnement.`,
          type: 'warning'
        });
        return;
      }

      this.editedLicense = {
        custom_domain: '',
        shop_domain: '',
        _id: ''
      };
      this.shopDomainInput = '';
      this.modalError = null; // Réinitialiser les erreurs
      this.showEditModal = true;
    },
    async saveLicenseEdit() {
      // Validation des champs
      if (!this.validateLicenseData()) {
        return;
      }

      this.modalLoading = true;
      this.modalError = null;

      try {
        let shopDomain = this.shopDomainInput.trim();
        if (shopDomain && !shopDomain.endsWith('.myshopify.com')) {
          shopDomain = shopDomain + '.myshopify.com';
        }

        if (this.editedLicense._id) {
          // Modification d'une licence existante
          await licenseService.updateLicense(this.editedLicense._id, {
            custom_domain: this.editedLicense.custom_domain,
            shop_domain: shopDomain
          });

          this.$store.dispatch('showNotification', {
            message: 'Licence modifiée avec succès',
            type: 'success'
          });
        } else {
          // Création d'une nouvelle licence
          await licenseService.createClientLicense({
            custom_domain: this.editedLicense.custom_domain,
            shop_domain: shopDomain
          });

          this.$store.dispatch('showNotification', {
            message: 'Licence créée avec succès',
            type: 'success'
          });
        }

        this.showEditModal = false;
        this.fetchLicenses();
      } catch (err) {
        this.modalError = this.getErrorMessage(err);
      } finally {
        this.modalLoading = false;
      }
    },

    validateLicenseData() {
      if (!this.editedLicense.custom_domain.trim()) {
        this.modalError = 'Le domaine personnalisé est requis';
        return false;
      }

      if (!this.shopDomainInput.trim()) {
        this.modalError = 'Le domaine Shopify est requis';
        return false;
      }

      // Validation du format du domaine personnalisé
      const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!domainRegex.test(this.editedLicense.custom_domain.trim())) {
        this.modalError = 'Le format du domaine personnalisé n\'est pas valide';
        return false;
      }

      // Validation du format du domaine Shopify
      const shopifyDomainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
      if (!shopifyDomainRegex.test(this.shopDomainInput.trim())) {
        this.modalError = 'Le format du domaine Shopify n\'est pas valide';
        return false;
      }

      return true;
    },

    getErrorMessage(err) {
      if (err.response?.data?.message) {
        return err.response.data.message;
      }

      if (err.message) {
        return err.message;
      }

      // Messages d'erreur spécifiques selon le type d'erreur
      if (err.response?.status === 409) {
        return 'Une licence avec ce domaine existe déjà';
      }

      if (err.response?.status === 400) {
        return 'Les données fournies sont invalides';
      }

      if (err.response?.status === 403) {
        return 'Vous n\'avez pas les permissions pour effectuer cette action';
      }

      if (err.response?.status === 404) {
        return 'Licence introuvable';
      }

      return 'Une erreur inattendue s\'est produite. Veuillez réessayer.';
    },

    closeEditModal() {
      this.showEditModal = false;
      this.modalError = null;
      this.modalLoading = false;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.licenseToDelete = null;
      this.modalError = null;
      this.modalLoading = false;
    }
  },
  mounted() {
    this.fetchLicenses();
    this.fetchCurrentSubscription(); // Appeler la nouvelle méthode ici
  },
};
</script>

<style scoped>
.license-usage-info {
  margin-bottom: var(--spacing-sm);
}

.usage-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
}

.usage-details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.usage-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-xs);
}

.usage-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--spacing-sm);
  background-color: #f8f9fa;
  border-radius: var(--radius-sm);
  border: 1px solid #e9ecef;
  justify-content: space-between;
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-color);
  margin-bottom: var(--spacing-xs);
  font-weight: var(--font-weight-medium);
}

.stat-value {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
}

.text-warning {
  color: #f59e0b;
}

.license-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

.license-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-stroke);
  transition: background-color 0.2s ease;
}

.license-item:hover {
  background-color: rgb(244, 244, 244);
}

.license-info {
  min-width: 120px;
}

.license-shop-domain {
  color: var(--text-color);
  font-size: var(--font-size-sm);
  display: block;
}

.license-custom-domain {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-surface);
}

.license-expires-at {
  font-size: var(--font-size-sm);
  color: var(--text-color);
}

.license-status {
  font-weight: 600;
  color: var(--text-surface);
  min-width: 50px;
  text-align: right;
  margin-left: auto;
}

.license-actions {
  margin-left: auto;
  display: flex;
  gap: var(--spacing-xs);
}

.license-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
}

.button-icon {
  margin-right: var(--spacing-xs);
}

.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background-color: #5826871a;
  backdrop-filter: blur(5px);
}

.modal {
  background: #fff;
  padding: var(--spacing-lg);
  border-radius: var(--radius-sm);
  min-width: 320px;
  box-shadow: var(--shadow-stroke), 0px 14px 20px 0px #00000012;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  align-items: flex-start;
}

.modal h3 {
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-md);
  font-weight: bold;
}

.modal label {
  font-weight: var(--font-weight-medium);
  margin-bottom: 0;
}

.modal .input {
  padding: var(--spacing-xs);
  border: 1px solid #ddd;
  border-radius: var(--radius-xs);

  font-size: var(--font-size-sm);
}

.modal-actions {
  display: flex;
  gap: var(--spacing-xs);
  flex-direction: row;
}

.modal-actions button {
  padding: 0.4rem 1.2rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}

.modal-actions button:first-child {
  background: #2563eb;
  color: #fff;
}

.modal-actions button:last-child {
  background: #e5e7eb;
  color: #111;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.shopify-input {
  padding-right: 120px;
  /* Plus d'espace pour le suffixe */
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.input-suffix {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-xs);
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-left: none;
  border-top-right-radius: var(--radius-xs);
  border-bottom-right-radius: var(--radius-xs);
  font-size: var(--font-size-sm);
  color: var(--text-color);
  pointer-events: none;
}

.modal-error {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.modal .input:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}

.delete-modal {
  max-width: 450px;
}

.delete-content {
  margin: var(--spacing-md) 0;
}

.delete-content p {
  margin-bottom: var(--spacing-sm);
  color: var(--text-color);
}

.license-to-delete {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: var(--radius-sm);
  padding: var(--spacing-sm);
  margin: var(--spacing-sm) 0;
}

.delete-license-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.delete-domain {
  font-weight: var(--font-weight-semibold);
  color: var(--text-surface);
  font-size: var(--font-size-md);
}

.delete-shop {
  color: var(--text-color);
  font-size: var(--font-size-sm);
}

.delete-warning {
  color: #dc2626;
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-sm);
}
</style>