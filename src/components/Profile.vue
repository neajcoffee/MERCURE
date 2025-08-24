<template>
    <div class="profile-container">

        <!-- Section principale -->
        <div class="profile-main">
            <!-- Carte d'abonnement actuel -->
            <div class="profile-card">
                <div class="card-header">
                    <h3>Votre abonnement</h3>
                    <div v-if="currentSubscription && currentSubscription.hasSubscription" class="status-badge active">
                        Actif
                    </div>
                    <div v-else class="status-badge inactive">
                        Inactif
                    </div>
                </div>

                <div v-if="currentSubscription && currentSubscription.hasSubscription" class="subscription-info">
                    <div class="subscription-row">
                        <span class="subscription-label">Formule :</span>
                        <span class="subscription-value">{{ currentSubscription.subscription.name }}</span>
                    </div>
                    <div class="subscription-row">
                        <span class="subscription-label">Prix :</span>
                        <span class="subscription-value">{{ currentSubscription.subscription.price }} €</span>
                    </div>
                    <div class="subscription-row">
                        <span class="subscription-label">Licences utilisées :</span>
                        <span class="subscription-value">{{ currentSubscription.usage.licensesUsed }} / {{
                            currentSubscription.usage.licensesLimit }}</span>
                    </div>
                    <div class="subscription-row">
                        <span class="subscription-label">Licences restantes :</span>
                        <span class="subscription-value">{{ currentSubscription.usage.licensesRemaining }}</span>
                    </div>
                </div>
                <div v-else class="subscription-info">
                    <div class="subscription-row">
                        <span class="subscription-label">Formule :</span>
                        <span class="subscription-value">Aucun abonnement</span>
                    </div>
                    <div class="subscription-row">
                        <span class="subscription-label">Statut :</span>
                        <span class="subscription-value">Inactif</span>
                    </div>
                </div>

                <div class="subscription-actions">
                    <GenericButton variant="primary" size="sm" @click="redirectToStripePortal">Gérer mon abonnement</GenericButton>
                </div>
            </div>

            <!-- Informations client -->
            <div v-if="currentCustomer" class="customer-info">
                <div class="customer-header">
                    <h4>Informations personnelles</h4>
                    <div class="edit-actions">
                        <GenericButton v-if="!isEditing" variant="secondary" size="sm" @click="startEditing">
                            Modifier
                        </GenericButton>
                        <div v-else class="edit-buttons">
                            <GenericButton variant="success" size="sm" @click="saveChanges" :loading="saving">
                                Enregistrer
                            </GenericButton>
                            <GenericButton variant="secondary" size="sm" @click="cancelEditing">
                                Annuler
                            </GenericButton>
                        </div>
                    </div>
                </div>

                <div v-if="!isEditing" class="customer-details">
                    <div class="customer-row">
                        <span class="customer-label">Prénom :</span>
                        <span class="customer-value">{{ currentCustomer.first_name }}</span>
                    </div>
                    <div class="customer-row">
                        <span class="customer-label">Nom :</span>
                        <span class="customer-value">{{ currentCustomer.last_name }}</span>
                    </div>
                    <div class="customer-row">
                        <span class="customer-label">Email :</span>
                        <span class="customer-value">{{ currentCustomer.email }}</span>
                    </div>
                    <div class="customer-row">
                        <span class="customer-label">Téléphone :</span>
                        <span class="customer-value">{{ currentCustomer.phone || 'Non renseigné' }}</span>
                    </div>
                    <div class="customer-row">
                        <span class="customer-label">Entreprise :</span>
                        <span class="customer-value">{{ currentCustomer.company_name || 'Non renseigné' }}</span>
                    </div>
                    <div class="customer-row">
                        <span class="customer-label">Domaine :</span>
                        <span class="customer-value">{{ currentCustomer.shop_domain }}</span>
                    </div>
                </div>

                <div v-else class="customer-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="customer-first-name" class="form-label">Prénom *</label>
                            <input id="customer-first-name" v-model="editForm.first_name" type="text" class="form-input"
                                :class="{ 'error': fieldErrors.first_name }" placeholder="Votre prénom" required
                                @input="clearFieldError('first_name')" />
                            <span v-if="fieldErrors.first_name" class="error-message">{{ fieldErrors.first_name
                                }}</span>
                        </div>
                        <div class="form-group">
                            <label for="customer-last-name" class="form-label">Nom *</label>
                            <input id="customer-last-name" v-model="editForm.last_name" type="text" class="form-input"
                                :class="{ 'error': fieldErrors.last_name }" placeholder="Votre nom" required
                                @input="clearFieldError('last_name')" />
                            <span v-if="fieldErrors.last_name" class="error-message">{{ fieldErrors.last_name }}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="customer-email" class="form-label">Email *</label>
                        <input id="customer-email" v-model="editForm.email" type="email" class="form-input"
                            :class="{ 'error': fieldErrors.email }" placeholder="votre@email.com" readonly required
                            @input="clearFieldError('email')" />
                        <span v-if="fieldErrors.email" class="error-message">{{ fieldErrors.email }}</span>
                    </div>
                    <div class="form-group">
                        <label for="customer-phone" class="form-label">Téléphone</label>
                        <input id="customer-phone" v-model="editForm.phone" type="tel" class="form-input"
                            :class="{ 'error': fieldErrors.phone }" placeholder="+33 6 12 34 56 78"
                            @input="clearFieldError('phone')" />
                        <span v-if="fieldErrors.phone" class="error-message">{{ fieldErrors.phone }}</span>
                    </div>
                    <div class="form-group">
                        <label for="customer-company" class="form-label">Entreprise</label>
                        <input id="customer-company" v-model="editForm.company_name" type="text" class="form-input"
                            :class="{ 'error': fieldErrors.company_name }" placeholder="Nom de votre entreprise"
                            @input="clearFieldError('company_name')" />
                        <span v-if="fieldErrors.company_name" class="error-message">{{ fieldErrors.company_name
                            }}</span>
                    </div>
                    <div class="form-group">
                        <label for="customer-domain" class="form-label">Domaine *</label>
                        <input id="customer-domain" v-model="editForm.shop_domain" type="text" class="form-input"
                            :class="{ 'error': fieldErrors.shop_domain }" placeholder="votre-domaine.com" required
                            @input="clearFieldError('shop_domain')" />
                        <span v-if="fieldErrors.shop_domain" class="error-message">{{ fieldErrors.shop_domain }}</span>
                    </div>
                </div>
            </div>

            <!-- Modification du mot de passe -->
            <div v-if="currentCustomer" class="password-section">
                <div class="password-header">
                    <h4>Sécurité</h4>
                    <div class="password-actions">
                        <GenericButton v-if="!isChangingPassword" variant="secondary" size="sm"
                            @click="startPasswordChange">
                            Changer le mot de passe
                        </GenericButton>
                        <div v-else class="password-buttons">
                            <GenericButton variant="success" size="sm" @click="savePasswordChange"
                                :loading="changingPassword">
                                Confirmer
                            </GenericButton>
                            <GenericButton variant="secondary" size="sm" @click="cancelPasswordChange">
                                Annuler
                            </GenericButton>
                        </div>
                    </div>
                </div>

                <div v-if="isChangingPassword" class="password-form">
                    <div class="form-group">
                        <label for="current-password" class="form-label">Mot de passe actuel *</label>
                        <input id="current-password" v-model="passwordForm.current_password" type="password"
                            class="form-input" :class="{ 'error': passwordErrors.current_password }"
                            placeholder="Votre mot de passe actuel" required
                            @input="clearPasswordError('current_password')" />
                        <span v-if="passwordErrors.current_password" class="error-message">{{
                            passwordErrors.current_password }}</span>
                    </div>
                    <div class="form-group">
                        <label for="new-password" class="form-label">Nouveau mot de passe *</label>
                        <input id="new-password" v-model="passwordForm.new_password" type="password" class="form-input"
                            :class="{ 'error': passwordErrors.new_password }" placeholder="Votre nouveau mot de passe"
                            required @input="clearPasswordError('new_password')" />
                        <span v-if="passwordErrors.new_password" class="error-message">{{ passwordErrors.new_password
                            }}</span>
                    </div>
                    <div class="form-group">
                        <label for="confirm-password" class="form-label">Confirmer le nouveau mot de passe *</label>
                        <input id="confirm-password" v-model="passwordForm.confirm_password" type="password"
                            class="form-input" :class="{ 'error': passwordErrors.confirm_password }"
                            placeholder="Confirmez votre nouveau mot de passe" required
                            @input="clearPasswordError('confirm_password')" />
                        <span v-if="passwordErrors.confirm_password" class="error-message">{{
                            passwordErrors.confirm_password }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GenericButton from './base/GenericButton.vue'
import { subscriptionService } from '@/services/subscription.service'
import { customerService } from '@/services/customer.service'
import { stripeService } from '@/services/stripe.service'

export default {
    name: 'Profile',
    components: { GenericButton },
    data() {
        return {
            currentSubscription: null,
            currentCustomer: null,
            loading: false,
            error: null,
            isEditing: false,
            saving: false,
            editForm: {
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                company_name: '',
                shop_domain: ''
            },
            fieldErrors: {
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                company_name: '',
                shop_domain: ''
            },
            isChangingPassword: false,
            changingPassword: false,
            passwordForm: {
                current_password: '',
                new_password: '',
                confirm_password: ''
            },
            passwordErrors: {
                current_password: '',
                new_password: '',
                confirm_password: ''
            }
        }
    },
    async mounted() {
        this.loading = true
        try {
            const response = await customerService.getProfile()
            this.currentCustomer = response.customer
            this.currentSubscription = await subscriptionService.getCurrentSubscription()
        } catch (e) {
            this.error = e?.message || 'Erreur lors du chargement des informations.'
        } finally {
            this.loading = false
        }
    },
    methods: {
        startEditing() {
            this.isEditing = true
            this.editForm = {
                first_name: this.currentCustomer.first_name || '',
                last_name: this.currentCustomer.last_name || '',
                email: this.currentCustomer.email || '',
                phone: this.currentCustomer.phone || '',
                company_name: this.currentCustomer.company_name || '',
                shop_domain: this.currentCustomer.shop_domain || ''
            }
        },
        cancelEditing() {
            this.isEditing = false
            this.clearAllErrors()
            this.editForm = {
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                company_name: '',
                shop_domain: ''
            }
        },
        async saveChanges() {
            this.saving = true
            this.clearAllErrors()

            try {
                // Nettoyer les champs vides avant validation
                const cleanedForm = this.cleanEmptyFields(this.editForm)

                // Validation des données via le service
                const validation = customerService.validateProfileData(cleanedForm)
                if (!validation.isValid) {
                    this.displayFieldErrors(validation.errors)
                    return
                }

                // Mise à jour via le service
                await customerService.updateProfile(cleanedForm)

                // Mise à jour des données locales
                this.currentCustomer = {
                    ...this.currentCustomer,
                    ...this.editForm
                }

                this.isEditing = false
                this.$toast?.success('Profil mis à jour avec succès')
            } catch (e) {
                this.$toast?.error(e?.message || 'Erreur lors de la mise à jour du profil')
            } finally {
                this.saving = false
            }
        },

        clearFieldError(fieldName) {
            this.fieldErrors[fieldName] = ''
        },

        clearAllErrors() {
            this.fieldErrors = {
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                company_name: '',
                shop_domain: ''
            }
        },

        displayFieldErrors(errors) {
            errors.forEach(error => {
                if (error.includes('prénom')) {
                    this.fieldErrors.first_name = error
                } else if (error.includes('nom')) {
                    this.fieldErrors.last_name = error
                } else if (error.includes('email')) {
                    this.fieldErrors.email = error
                } else if (error.includes('téléphone')) {
                    this.fieldErrors.phone = error
                } else if (error.includes('entreprise')) {
                    this.fieldErrors.company_name = error
                } else if (error.includes('domaine')) {
                    this.fieldErrors.shop_domain = error
                }
            })
        },

        cleanEmptyFields(formData) {
            const cleaned = {}

            // Parcourir tous les champs du formulaire
            Object.keys(formData).forEach(key => {
                const value = formData[key]

                // Garder le champ s'il n'est pas vide, null, undefined ou une chaîne vide
                if (value !== null && value !== undefined && value !== '' && value.toString().trim() !== '') {
                    cleaned[key] = value.toString().trim()
                }
            })

            return cleaned
        },

        startPasswordChange() {
            this.isChangingPassword = true
            this.clearAllPasswordErrors()
        },

        cancelPasswordChange() {
            this.isChangingPassword = false
            this.clearAllPasswordErrors()
            this.passwordForm = {
                current_password: '',
                new_password: '',
                confirm_password: ''
            }
        },

        async savePasswordChange() {
            this.changingPassword = true
            this.clearAllPasswordErrors()

            try {
                // Validation du formulaire de mot de passe
                const validation = this.validatePasswordForm()
                if (!validation.isValid) {
                    this.displayPasswordErrors(validation.errors)
                    return
                }

                // Changement de mot de passe via le service
                await customerService.changePassword(this.passwordForm)

                // Réinitialisation du formulaire
                this.isChangingPassword = false
                this.passwordForm = {
                    current_password: '',
                    new_password: '',
                    confirm_password: ''
                }

                this.$toast?.success('Mot de passe modifié avec succès')
            } catch (e) {
                this.$toast?.error(e?.message || 'Erreur lors du changement de mot de passe')
            } finally {
                this.changingPassword = false
            }
        },

        validatePasswordForm() {
            const errors = []

            // Validation du mot de passe actuel
            if (!this.passwordForm.current_password?.trim()) {
                errors.push('Le mot de passe actuel est requis')
            }

            // Validation du nouveau mot de passe
            if (!this.passwordForm.new_password?.trim()) {
                errors.push('Le nouveau mot de passe est requis')
            } else if (this.passwordForm.new_password.length < 8) {
                errors.push('Le nouveau mot de passe doit contenir au moins 8 caractères')
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(this.passwordForm.new_password)) {
                errors.push('Le nouveau mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre')
            }

            // Validation de la confirmation
            if (!this.passwordForm.confirm_password?.trim()) {
                errors.push('La confirmation du mot de passe est requise')
            } else if (this.passwordForm.new_password !== this.passwordForm.confirm_password) {
                errors.push('Les mots de passe ne correspondent pas')
            }

            return {
                isValid: errors.length === 0,
                errors
            }
        },

        clearPasswordError(fieldName) {
            this.passwordErrors[fieldName] = ''
        },

        clearAllPasswordErrors() {
            this.passwordErrors = {
                current_password: '',
                new_password: '',
                confirm_password: ''
            }
        },

        displayPasswordErrors(errors) {
            errors.forEach(error => {
                if (error.includes('actuel')) {
                    this.passwordErrors.current_password = error
                } else if (error.includes('nouveau')) {
                    this.passwordErrors.new_password = error
                } else if (error.includes('confirmation') || error.includes('correspondent')) {
                    this.passwordErrors.confirm_password = error
                }
            })
        },

        async redirectToStripePortal() {
            try {
                // Vérifier que nous avons un client avec un ID Stripe
                if (!this.currentCustomer?.stripe_customer_id) {
                    // this.$toast?.error('Impossible d\'accéder au portail Stripe : ID client manquant')
                    return
                }

                const returnUrl = 'https://www.localhost:8080/dashboard'
                const response = await stripeService.redirectToCustomerPortal(
                    this.currentCustomer.stripe_customer_id, 
                    returnUrl
                )
                
                if (response.data && response.data.url) {
                    window.location.href = response.data.url
                } else {
                    this.$toast?.error('Erreur lors de la redirection vers le portail Stripe')
                }
            } catch (error) {
                this.$toast?.error('Erreur lors de l\'accès au portail Stripe')
            }
        }
    }
}
</script>

<style scoped>
.profile-container {
    padding: var(--spacing-lg);
    max-width: 800px;
    margin: 0 auto;
}

.profile-header {
    text-align: center;
    margin-bottom: var(--spacing-xl);
}

.profile-title {
    font-size: 2rem;
    font-weight: 800;
    color: var(--primary-color);
    margin-bottom: var(--spacing-sm);
}

.profile-subtitle {
    font-size: var(--font-size-lg);
    color: var(--text-surface);
    margin: 0;
}

.profile-main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.profile-card {
    background: white;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-stroke);
    padding: var(--spacing-xl);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
}

.card-header h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
}

.status-badge {
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-sm);
    font-weight: 600;
}

.status-badge.active {
    background-color: #d1fae5;
    color: #065f46;
}

.status-badge.inactive {
    background-color: #fef3c7;
    color: #92400e;
}

.subscription-info {
    margin-bottom: var(--spacing-lg);
}

.subscription-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-sm) 0;
    border-bottom: 1px solid #f3f4f6;
}

.subscription-row:last-child {
    border-bottom: none;
}

.subscription-label {
    font-weight: 600;
    font-size: var(--font-size-sm);
    color: var(--text-surface);
}

.subscription-value {
    color: var(--text-color);
    font-weight: 500;
}

.subscription-actions {
    display: flex;
    justify-content: flex-end;
}

.customer-info {
    background: white;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-stroke);
    padding: var(--spacing-xl);
}

.customer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
}

.customer-info h4 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--primary-color);
}

.edit-actions {
    display: flex;
    gap: var(--spacing-sm);
}

.edit-buttons {
    display: flex;
    gap: var(--spacing-sm);
}

.customer-details {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.customer-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-sm) 0;
    border-bottom: 1px solid #f3f4f6;
}

.customer-row:last-child {
    border-bottom: none;
}

.customer-label {
    font-weight: 600;
    font-size: var(--font-size-sm);
    color: var(--text-surface);
}

.customer-value {
    color: var(--text-color);
    font-size: var(--font-size-sm);
}

.customer-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.form-label {
    font-weight: 600;
    font-size: var(--font-size-sm);
    color: var(--text-surface);
}

.form-input {
    padding: var(--spacing-sm);
    border: 1px solid #d1d5db;
    border-radius: var(--radius-sm);
    font-size: var(--font-size-sm);
    transition: border-color 0.2s ease;
}

.form-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input::placeholder {
    color: #9ca3af;
}

.form-input.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.error-message {
    color: #ef4444;
    font-size: var(--font-size-xs);
    margin-top: var(--spacing-xs);
    font-weight: 500;
}

.password-section {
    background: white;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-stroke);
    padding: var(--spacing-lg);
}

.password-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.password-header h4 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--primary-color);
}

.password-actions {
    display: flex;
    gap: var(--spacing-sm);
}

.password-buttons {
    display: flex;
    gap: var(--spacing-sm);
}

.password-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-sm);
}

/* Responsive */
@media (max-width: 768px) {
    .profile-container {
        padding: var(--spacing-md);
    }

    .profile-title {
        font-size: 1.5rem;
    }

    .profile-subtitle {
        font-size: var(--font-size-md);
    }

    .profile-card,
    .customer-info {
        padding: var(--spacing-lg);
    }

    .card-header,
    .customer-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-sm);
    }

    .subscription-row,
    .customer-row {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-xs);
    }

    .edit-actions {
        width: 100%;
        justify-content: flex-end;
    }

    .edit-buttons {
        width: 100%;
        justify-content: flex-end;
    }

    .form-row {
        grid-template-columns: 1fr;
    }

    .password-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-sm);
    }

    .password-actions {
        width: 100%;
        justify-content: flex-end;
    }

    .password-buttons {
        width: 100%;
        justify-content: flex-end;
    }
}
</style>