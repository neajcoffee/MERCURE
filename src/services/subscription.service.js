import ApiService from './ApiService'

export const subscriptionService = {
  async getAvailablePlans() {
    const response = await ApiService.get('/api/client/plans')
    return response
  },

  async getCurrentSubscription() {
    const response = await ApiService.get('/api/client/subscription/current')
    return response
  }
} 