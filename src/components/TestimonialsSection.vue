<template>
  <section id="testimonials" class="testimonials-section">

      <div class="pricing-container">
      <div class="landing-header-section">
        <h2 class="landing-section-title">
          Ce que disent nos <span class="landing-section-title-highlight">clients</span>
        </h2>
        <p class="landing-section-subtitle">
          Découvrez pourquoi des milliers d'équipes font confiance à Stella
        </p>
      </div> 

      <div class="review-container">
        <div class="review-mask">
          <div class="review-list-container">
            <!-- Première ligne : animation de gauche à droite -->
            <div class="review-list review-list--left">
              <!-- Premier groupe d'avis -->
              <div class="review-card" v-for="testimonial in testimonials" :key="`first-left-${testimonial.id}`">
                <div class="review-content">
                  <div class="review-header">
                    <div class="author-avatar">
                      <img :src="testimonial.avatar" :alt="testimonial.name" />
                    </div>
                    <div class="">
                      <div class="author-name">{{ testimonial.name }}</div>
                      <div class="testimonial-rating">
                        <span v-for="star in 5" :key="star" class="star"
                          :class="{ 'star--filled': star <= testimonial.rating }">
                          ★
                        </span>
                      </div>
                    </div>
                  </div>
                  <blockquote class="testimonial-quote">
                    "{{ testimonial.quote }}"
                  </blockquote>
                </div>
              </div>

              <!-- Deuxième groupe d'avis (duplication pour la boucle) -->
              <div class="review-card" v-for="testimonial in testimonials" :key="`second-left-${testimonial.id}`">
                <div class="review-content">
                  <div class="review-header">
                    <div class="author-avatar">
                      <img :src="testimonial.avatar" :alt="testimonial.name" />
                    </div>
                    <div class="">
                      <div class="author-name">{{ testimonial.name }}</div>
                      <div class="testimonial-rating">
                        <span v-for="star in 5" :key="star" class="star"
                          :class="{ 'star--filled': star <= testimonial.rating }">
                          ★
                        </span>
                      </div>
                    </div>
                  </div>
                  <blockquote class="testimonial-quote">
                    "{{ testimonial.quote }}"
                  </blockquote>
                </div>
              </div>
            </div>

            <!-- Deuxième ligne : animation de droite à gauche -->
            <div class="review-list review-list--right">
              <!-- Premier groupe d'avis -->
              <div class="review-card" v-for="testimonial in testimonials" :key="`first-right-${testimonial.id}`">
                <div class="review-content">
                  <div class="review-header">
                    <div class="author-avatar">
                      <img :src="testimonial.avatar" :alt="testimonial.name" />
                    </div>
                    <div class="">
                      <div class="author-name">{{ testimonial.name }}</div>
                      <div class="testimonial-rating">
                        <span v-for="star in 5" :key="star" class="star"
                          :class="{ 'star--filled': star <= testimonial.rating }">
                          ★
                        </span>
                      </div>
                    </div>
                  </div>
                  <blockquote class="testimonial-quote">
                    "{{ testimonial.quote }}"
                  </blockquote>
                </div>
              </div>

              <!-- Deuxième groupe d'avis (duplication pour la boucle) -->
              <div class="review-card" v-for="testimonial in testimonials" :key="`second-right-${testimonial.id}`">
                <div class="review-content">
                  <div class="review-header">
                    <div class="author-avatar">
                      <img :src="testimonial.avatar" :alt="testimonial.name" />
                    </div>
                    <div class="">
                      <div class="author-name">{{ testimonial.name }}</div>
                      <div class="testimonial-rating">
                        <span v-for="star in 5" :key="star" class="star"
                          :class="{ 'star--filled': star <= testimonial.rating }">
                          ★
                        </span>
                      </div>
                    </div>
                  </div>
                  <blockquote class="testimonial-quote">
                    "{{ testimonial.quote }}"
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="testimonials-stats">
        <div class="stat-item">
          <div class="stat-number">4.9/5</div>
          <div class="stat-label">Note moyenne</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">10k+</div>
          <div class="stat-label">Clients satisfaits</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">98%</div>
          <div class="stat-label">Taux de rétention</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TestimonialsSection',
  data() {
    return {
      testimonials: [
        {
          id: 1,
          quote: "Stella a complètement transformé notre façon de travailler. L'IA intégrée nous fait gagner des heures chaque semaine sur les tâches répétitives.",
          rating: 5,
          name: "Marie Dubois",
          title: "Directrice Marketing",
          company: "TechCorp",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 2,
          quote: "L'interface est intuitive et les fonctionnalités sont exactement ce dont nous avions besoin. Le support client est exceptionnel.",
          rating: 5,
          name: "Thomas Martin",
          title: "CEO",
          company: "StartupXYZ",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 3,
          quote: "Nous avons augmenté notre productivité de 40% depuis que nous utilisons Stella. L'investissement en vaut vraiment la peine.",
          rating: 5,
          name: "Sophie Bernard",
          title: "Chef de Projet",
          company: "InnovationLab",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 4,
          quote: "Les analytics avancés nous donnent des insights précieux sur nos performances. C'est un outil indispensable pour notre équipe.",
          rating: 5,
          name: "Lucas Petit",
          title: "Data Analyst",
          company: "DataFlow",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 5,
          quote: "La collaboration d'équipe est maintenant fluide et efficace. Stella a résolu tous nos problèmes de communication.",
          rating: 5,
          name: "Emma Rousseau",
          title: "Product Manager",
          company: "DigitalAgency",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 6,
          quote: "Sécurité, performance et facilité d'utilisation. Stella coche toutes les cases pour une solution SaaS enterprise.",
          rating: 5,
          name: "Pierre Moreau",
          title: "CTO",
          company: "EnterpriseTech",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
        }
      ]
    }
  }
}
</script>

<style scoped>
.testimonials-section {
  padding: var(--spacing-xxl) 0;
  background: #f8f9fa;
}

.testimonials-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.testimonials-header {
  text-align: center;
  margin-bottom: var(--spacing-xxl);
}

.testimonials-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
}

.testimonials-title-highlight {
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.testimonials-subtitle {
  font-size: 1.25rem;
  color: var(--text-color);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}


.review-container {}

.review-mask {
  grid-column-gap: 2em;
  grid-row-gap: 2em;
  flex-flow: column;
  padding-top: 2em;
  padding-bottom: 4em;
  display: flex;
  overflow: hidden;
  -webkit-mask: linear-gradient(90deg, #0000 0%, #fff 15% 85%, #0000 100%);
  mask: linear-gradient(90deg, #0000 0%, #fff 15% 85%, #0000 100%);
}

.review-list-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: var(--spacing-md);

}

.review-list {
  flex: none;
  align-items: center;
  display: flex;
  position: relative;
  gap: var(--spacing-sm);
}

.review-card {
  box-shadow: var(--sh-card);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
}

.review-content {
  min-width: 19em;
}

@keyframes translateX {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.review-header {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: var(--spacing-md);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xxl);
}

.testimonial-card {
  background: white;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  box-shadow: var(--sh-card);
  border-radius: var(--radius-xl);
  flex-flow: column;
  width: 24.125em;
  margin-right: var(--spacing-sm);
  padding: var(--spacing-lg);
}

/* .testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
} */

.testimonial-content {
  margin-bottom: var(--spacing-lg);
}

.testimonial-rating {
  display: flex;
  gap: 4px;
  margin-bottom: var(--spacing-md);
}

.star {
  height: 27px;
  width: 27px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #00b67a;
}

.star--filled {
  color: white;
  font-family: arial;
}

.testimonial-quote {
  font-size: var(--font-size-md);
  line-height: var(--line-height-sm);
  color: var(--text-color);
  font-style: italic;
  margin: 0;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.author-avatar {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info {
  flex: 1;
}

.author-name {
  font-weight: 600;
  font-size: var(--font-size-sm);
  font-family: sans-serif;
  color: var(--primary-color);
  margin-bottom: var(--spacing-xs);
}

.author-title {
  font-size: 0.875rem;
  color: var(--text-color);
  margin-bottom: var(--spacing-xs);
}

.author-company {
  font-size: 0.875rem;
  color: var(--text-color);
  opacity: 0.7;
}

.testimonials-stats {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xxl);
  padding-top: var(--spacing-xl);
  border-top: 1px solid #e9ecef;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-size: 1rem;
  color: var(--text-color);
  font-weight: 500;
}

.review-mask--bottom {
  margin-top: var(--spacing-lg);
}

.review-list--left {
  animation: translateX 30s linear infinite;
}

.review-list--right {
  animation: translateXReverse 30s linear infinite;
}

@keyframes translateX {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

@keyframes translateXReverse {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .testimonials-stats {
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .testimonial-card {
    padding: var(--spacing-lg);
  }
}
</style>