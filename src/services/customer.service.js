import ApiService from './ApiService'

class CustomerService {
    /**
     * Récupère les informations du profil client actuel
     * @returns {Promise<Object>} Les informations du client
     */
    async getProfile() {
        try {
            const response = await ApiService.get('/api/client/profile')
            return response
        } catch (error) {
            throw new Error(error.message || 'Erreur lors de la récupération du profil')
        }
    }

    /**
     * Met à jour le profil client
     * @param {Object} profileData - Les données du profil à mettre à jour
     * @param {string} profileData.first_name - Prénom
     * @param {string} profileData.last_name - Nom
     * @param {string} profileData.email - Email
     * @param {string} [profileData.phone] - Téléphone (optionnel)
     * @param {string} [profileData.company_name] - Nom de l'entreprise (optionnel)
     * @param {string} profileData.shop_domain - Domaine de la boutique
     * @returns {Promise<Object>} Le profil mis à jour
     */
    async updateProfile(profileData) {
        try {
            const response = await ApiService.put('/api/client/profile', profileData)
            return response
        } catch (error) {
            // Gestion des erreurs spécifiques
            if (error.status === 400) {
                const errorMessage = error.message || 'Données invalides'
                throw new Error(errorMessage)
            }
            if (error.status === 409) {
                throw new Error('Cet email ou ce domaine est déjà utilisé')
            }
            if (error.status === 401) {
                throw new Error('Session expirée, veuillez vous reconnecter')
            }
            throw new Error(error.message || 'Erreur lors de la mise à jour du profil')
        }
    }

    /**
     * Change le mot de passe du client
     * @param {Object} passwordData - Les données de changement de mot de passe
     * @param {string} passwordData.current_password - Mot de passe actuel
     * @param {string} passwordData.new_password - Nouveau mot de passe
     * @param {string} passwordData.confirm_password - Confirmation du nouveau mot de passe
     * @returns {Promise<Object>} Confirmation du changement
     */
    async changePassword(passwordData) {
        try {
            const response = await ApiService.put('/api/client/auth/change-password', passwordData)
            return response
        } catch (error) {
            if (error.status === 400) {
                const errorMessage = error.message || 'Données invalides'
                throw new Error(errorMessage)
            }
            if (error.status === 401) {
                throw new Error('Mot de passe actuel incorrect')
            }
            throw new Error(error.message || 'Erreur lors du changement de mot de passe')
        }
    }

    /**
     * Met à jour les préférences du client
     * @param {Object} preferences - Les préférences à mettre à jour
     * @param {string} [preferences.language] - Langue (fr, en, es, de)
     * @param {Object} [preferences.notifications] - Préférences de notifications
     * @returns {Promise<Object>} Les préférences mises à jour
     */
    async updatePreferences(preferences) {
        try {
            const response = await ApiService.put('/customers/preferences', preferences)
            return response
        } catch (error) {
            throw new Error(error.message || 'Erreur lors de la mise à jour des préférences')
        }
    }

    /**
     * Met à jour les informations de facturation
     * @param {Object} billingInfo - Les informations de facturation
     * @param {Object} billingInfo.address - Adresse de facturation
     * @param {string} [billingInfo.vat_number] - Numéro de TVA
     * @returns {Promise<Object>} Les informations de facturation mises à jour
     */
    async updateBillingInfo(billingInfo) {
        try {
            const response = await ApiService.put('/customers/billing', billingInfo)
            return response
        } catch (error) {
            throw new Error(error.message || 'Erreur lors de la mise à jour des informations de facturation')
        }
    }

    /**
     * Supprime le compte client
     * @param {string} password - Mot de passe pour confirmation
     * @returns {Promise<Object>} Confirmation de suppression
     */
    async deleteAccount(password) {
        try {
            const response = await ApiService.delete('/customers/account')
            return response
        } catch (error) {
            if (error.status === 401) {
                throw new Error('Mot de passe incorrect')
            }
            throw new Error(error.message || 'Erreur lors de la suppression du compte')
        }
    }

    /**
     * Valide les données du profil avant envoi
     * @param {Object} profileData - Les données à valider
     * @returns {Object} Résultat de la validation
     */
    validateProfileData(profileData) {
        const errors = []

        // Validation des champs requis
        if (!profileData.first_name?.trim()) {
            errors.push('Le prénom est requis')
        } else if (profileData.first_name.length < 2 || profileData.first_name.length > 50) {
            errors.push('Le prénom doit contenir entre 2 et 50 caractères')
        }

        if (!profileData.last_name?.trim()) {
            errors.push('Le nom est requis')
        } else if (profileData.last_name.length < 2 || profileData.last_name.length > 50) {
            errors.push('Le nom doit contenir entre 2 et 50 caractères')
        }

        if (!profileData.email?.trim()) {
            errors.push('L\'email est requis')
        } else {
            const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
            if (!emailRegex.test(profileData.email)) {
                errors.push('Format d\'email invalide')
            }
        }

        if (!profileData.shop_domain?.trim()) {
            errors.push('Le domaine est requis')
        }

        // Validation du téléphone si renseigné
        if (profileData.phone) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
            if (!phoneRegex.test(profileData.phone.replace(/\s/g, ''))) {
                errors.push('Format de téléphone invalide')
            }
        }

        // Validation du nom d'entreprise si renseigné
        if (profileData.company_name && profileData.company_name.length > 100) {
            errors.push('Le nom de l\'entreprise ne peut pas dépasser 100 caractères')
        }

        return {
            isValid: errors.length === 0,
            errors
        }
    }
}

export const customerService = new CustomerService() 