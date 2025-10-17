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
              <div class="review-card" v-for="testimonial in firstTestimonialGroup" :key="`first-left-${testimonial.id}`">
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
              <div class="review-card" v-for="testimonial in firstTestimonialGroup" :key="`second-left-${testimonial.id}`">
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
              <div class="review-card" v-for="testimonial in secondTestimonialGroup" :key="`first-right-${testimonial.id}`">
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
              <div class="review-card" v-for="testimonial in secondTestimonialGroup" :key="`second-right-${testimonial.id}`">
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

      <!-- <div class="testimonials-stats">
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
      </div> -->
    </div>
  </section>
</template>

<script>
export default {
  name: 'TestimonialsSection',
  data() {
    return {
      firstTestimonialGroup: [
        {
          id: 1,
          quote: "Je n’arrivais pas à vendre sur Shopify… jusqu’à ce que je découvre Mercure. Mon chiffre d’affaires a doublé en un mois ! Ce thème a littéralement changé ma vie.",
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
          quote: "Mercure a transformé ma boutique en un site professionnel et élégant. Mes clients adorent naviguer dessus, je gagne  du temps pour me concentrer sur mon business.",
          rating: 5,
          name: "Sophie Bernard",
          title: "Chef de Projet",
          company: "InnovationLab",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 4,
          quote: "Les conversions ont augmenté dès la première semaine et mes clients restent plus longtemps sur mon site.",
          rating: 5,
          name: "Lucas Petit",
          title: "Data Analyst",
          company: "DataFlow",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 5,
          quote: "Ce thème m’a permis de me concentrer sur ce qui compte vraiment : mes clients. Mercure s’occupe de tout le reste, et mes ventes le prouvent.",
          rating: 5,
          name: "Emma Rousseau",
          title: "Product Manager",
          company: "DigitalAgency",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 6,
          quote: "Mon équipe a pu déployer notre boutique en un temps record, et les KPIs de conversion ont augmenté de 35 % dès le premier mois.",
          rating: 5,
          name: "Pierre Moreau",
          title: "CTO",
          company: "EnterpriseTech",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
        }
      ],
      secondTestimonialGroup: [
        {
          id: 7,
          quote: "Mercure ne se contente pas d’être beau : il est construit pour la performance.",
          rating: 5,
          name: "Alice Lemoine",
          title: "Designer",
          company: "CreativesCo",
          avatar: "https://images.unsplash.com/photo-1502767089025-6572583495b6?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 8,
          quote: "Mercure est l’outil idéal pour les professionnels qui veulent maximiser leurs conversions.",
          rating: 5,
          name: "Kevin Roux",
          title: "Growth Hacker",
          company: "StartGrowth",
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 9,
          quote: "Grâce à Mercure, notre boutique en ligne a une allure professionnelle en un rien de temps.",
          rating: 5,
          name: "Julie Pelletier",
          title: "eCommerce Manager",
          company: "ShopBoost",
          avatar: "https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 10,
          quote: "Ce thème offre une flexibilité incroyable, la personnalisation est sans fin.",
          rating: 5,
          name: "Bruno Lefèvre",
          title: "Développeur Frontend",
          company: "CodeCraft",
          avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 11,
          quote: "La simplicité et l'efficacité de Mercure ont facilité notre transition vers la vente en ligne.",
          rating: 5,
          name: "Nina Bertin",
          title: "Entrepreneuse",
          company: "GreenMarket",
          avatar: "https://images.unsplash.com/photo-1489515217751-5fd1be406fef?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 12,
          quote: "Un design moderne et une ergonomie exceptionnelle, Mercure est vraiment à la hauteur de nos attentes.",
          rating: 5,
          name: "Cédric Fabre",
          title: "Chef de Produit",
          company: "DigitalDesigns",
          avatar: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=150&h=150&fit=crop&crop=face"
        }
      ]
    }
  }
}
</script>

<style scoped>
.testimonials-section {
  /* padding: var(--spacing-xxl) 0; */
  /* background: #f8f9fa; */
  margin: 0 auto;
  padding-top: var(--spacing-xxl);
  border-radius: var(--radius-xxl);
  background: linear-gradient(180deg, #ffffff05 0%, transparent 30%);
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


.review-container {
  background-color: white;
  border-radius: var(--radius-xxl) var(--radius-xxl) 0 0;
  padding-top: var(--spacing-xl);
}

.review-mask {
  grid-column-gap: 2em;
  grid-row-gap: 2em;
  flex-flow: column;
  padding: var(--spacing-xl) 0;
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
  border: dashed 2px #00000008;
  padding: var(--spacing-sm);

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
  animation: translateX 15s linear infinite;
}

.review-list--right {
  animation: translateXReverse 15s linear infinite;
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