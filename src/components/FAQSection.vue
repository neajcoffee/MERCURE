<template>
  <section id="faq" class="faq-section">
    <div class="faq-container">

      <!-- <div class="landing-header-section">
        <h2 class="landing-section-title">
          Questions <span class="landing-section-title-highlight">fréquentes</span>
        </h2>
        <p class="landing-section-subtitle">
          Tout ce que vous devez savoir sur Stella
        </p>
      </div> -->

      <div class="grid gap-xl">
        <!-- <div class="faq-cta">
          <p class="faq-cta-text">
            Vous ne trouvez pas la réponse à votre question ?
          </p>
          <router-link to="/contact" class="faq-cta-btn">
            Contactez nous
          </router-link>
        </div> -->
        <div class="landing-header-section">
          <h2 class="landing-section-title">
            Questions <span class="landing-section-title-highlight">fréquentes</span>
          </h2>
          <p class="landing-section-subtitle">
            Tout ce que vous devez savoir sur Mercure
          </p>
        </div>

        <div class="faq-content">
          <div class="faq-list">
            <div class="faq-item" v-for="item in faqItems" :key="item.id" :class="{ 'faq-item--open': item.isOpen }">
              <button class="faq-question" @click="toggleFAQ(item.id)" :aria-expanded="item.isOpen">
                <span class="question-text">{{ item.question }}</span>
                <div class="faq_dropdown_icon">
                  <div class="icon-16" :class="{ 'icon-16--open': item.isOpen }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 16" fill="none">
                      <rect y="7.25098" width="16" height="1.5" rx="0.75" fill="#00061A"></rect>
                      <rect x="8.75" width="16" height="1.5" rx="0.75" transform="rotate(90 8.75 0)" fill="#00061A">
                      </rect>
                    </svg>
                  </div>
                </div>
              </button>
              <div class="faq-answer" :class="{ 'faq-answer--open': item.isOpen }">
                <div class="answer-content">
                  <p>{{ item.answer }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>


    </div>
  </section>
</template>

<script>
export default {
  name: 'FAQSection',
  data() {
    return {
      faqItems: [
        {
          id: 1,
          question: "Pourquoi Mercure est le meilleur thème Shopify ?",
          answer: "Mercure est conçu pour la performance, la flexibilité et la conversion. Il offre une vitesse de chargement exceptionnelle et des options de personnalisation avancées. De plus, il intègre une centaine d’applications prêtes à l’emploi, disponibles gratuitement !",
          isOpen: false
        },
        {
          id: 2,
          question: "Combien de boutiques puis-je utiliser ?",
          answer: "Le thème Mercure propose trois types de plans : Le plan Basic inclut 1 licence. Le plan Scale permet jusqu’à 3 licences. Le plan Business offre jusqu’à 10 licences.",
          isOpen: false
        },
        {
          id: 3,
          question: "Puis-je changer de plan à tout moment ?",
          answer: "Oui, tu peux modifier ton plan ou ton abonnement à tout moment, selon tes besoins.",
          isOpen: false
        },
        {
          id: 4,
          question: "Les mises à jour sont-elles régulières ?",
          answer: "Oui, des mises à jour régulières sont effectuées pour garantir la compatibilité avec les dernières versions de Shopify, améliorer les performances et ajouter de nouvelles fonctionnalités.",
          isOpen: false
        },
        {
          id: 5,
          question: "Proposez-vous des remboursements ?",
          answer: "Oui, nous proposons des remboursements sous certaines conditions, notamment en cas de problème technique majeur non résolu par notre support. Consulte nos conditions de remboursement pour plus de détails.",
          isOpen: false
        },
        {
          id: 6,
          question: "Le thème s’adapte-t-il à tous les secteurs d'activité ?",
          answer: "Absolument. Mercure est un thème polyvalent qui s’adapte à tous les types de boutiques : mode, beauté, technologie, alimentation, décoration et bien d’autres. Sa flexibilité te permet de créer un design sur mesure pour ton domaine.",
          isOpen: false
        },
        {
          id: 7,
          question: "Pourquoi le thème est-il disponible en abonnement ?",
          answer: "Le modèle par abonnement nous permet d’assurer un support client continu, des mises à jour fréquentes et l’ajout régulier de nouvelles fonctionnalités afin que ton site reste performant et à jour.",
          isOpen: false
        },
        {
          id: 8,
          question: "Puis-je transférer les accès de mon thème sur un autre shop ?",
          answer: "Non, la licence est liée à la boutique sur laquelle le thème a été activé. Pour un autre shop, une nouvelle licence est nécessaire.",
          isOpen: false
        },
        {
          id: 9,
          question: "Le thème est-il optimisé pour le SEO ?",
          answer: "Oui, Mercure est entièrement optimisé pour le SEO. Le code est propre, rapide et structuré pour une indexation optimale par les moteurs de recherche. Les balises, métadonnées et performances techniques respectent les meilleures pratiques SEO.",
          isOpen: false
        }
      ]
    }
  },
  methods: {
    toggleFAQ(id) {
      this.faqItems = this.faqItems.map(item => {
        if (item.id === id) {
          return { ...item, isOpen: !item.isOpen }
        } else {
          return { ...item, isOpen: false }
        }
      })
    }
  }
}
</script>

<style scoped>
.landing-section-title {
  color: var(--landing-color-text);
}

.faq-section {
  padding: var(--spacing-xxl) 0;
  background: white;
}

.faq-container {
  /* max-width: 800px; */
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.faq-container>.grid {
  grid-column-gap: 72px;
  grid-row-gap: 72px;
  grid-template-rows: auto;
  grid-template-columns: .75fr 1.25fr;
  grid-auto-columns: 1fr;
  align-items: center;
  display: grid;
}

.faq-header {
  text-align: center;
  margin-bottom: var(--spacing-xxl);
}

.faq-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
}

.faq-title-highlight {
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.faq-subtitle {
  font-size: 1.25rem;
  color: var(--text-color);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.faq-content {
  margin-bottom: var(--spacing-xxl);
}

.faq-list {
  grid-column-gap: var(--spacing-sm);
  grid-row-gap: var(--spacing-xs);
  flex-flow: column;
  display: flex;
}

.faq-item {
  background-color: #ffffffba;
  box-shadow: 0px 0px 0px 1px rgba(14, 63, 126, 0.04), 0px 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0px 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0px 6px 6px -3px rgba(42, 51, 70, 0.04), 0px 12px 12px -6px rgba(14, 63, 126, 0.04), 0px 24px 24px -12px rgba(14, 63, 126, 0.04);
  border-radius: var(--radius-md);
  width: 100%;
  max-width: 100%;
}

.faq_dropdown_icon {
  background-color: #ffffffba;
  box-shadow: 0px 0px 0px 1px rgba(14, 63, 126, 0.04), 0px 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0px 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0px 6px 6px -3px rgba(42, 51, 70, 0.04), 0px 12px 12px -6px rgba(14, 63, 126, 0.04), 0px 24px 24px -12px rgba(14, 63, 126, 0.04);
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  width: 40px;
  min-width: 40px;
  height: 40px;
  min-height: 40px;
  display: flex;
}

.icon-16 {
  justify-content: center;
  align-items: center;
  width: 16px;
  min-width: 16px;
  height: 16px;
  min-height: 16px;
  display: flex;
  transition: transform 0.6s ease;
  transform-style: preserve-3d;

}

.icon-16--open {
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(45deg) skew(0deg, 0deg);
}

/* .faq-item:hover {
  box-shadow: var(--shadow-soft);
} */

/* .faq-item--open {
  box-shadow: var(--shadow-soft);
} */

.faq-question {
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  white-space: normal;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 12px 12px 24px;
  display: flex;
}

/* .faq-question:hover {
  background: #f8f9fa;
} */

.question-text {
  flex: 1;
  margin-right: var(--spacing-md);
}

.faq-answer {
  transition: max-height 0.6s ease;
  background-color: #0000;
  width: 100%;
  max-width: 100%;
  position: relative;
  overflow: hidden;
  max-height: 0;
}

.faq-answer--open {
  max-height: 200px;
}

.answer-content {
  padding: 0 var(--spacing-lg) var(--spacing-lg);
  color: var(--text-color);
  line-height: 1.6;
}

.answer-content p {
  font-size: var(--font-size-sm);
}

.faq-cta {
  text-align: center;
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  border: dashed 1px #d5d5d5;
  height: fit-content;
}

.faq-cta-text {
  font-size: 1.125rem;
  color: var(--text-color);
  margin-bottom: var(--spacing-md);
}

.faq-cta-btn {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--primary-color);
  font-size: var(--font-size-sm);
  color: white;
  text-decoration: none;
  border-radius: var(--radius-sm);
  font-weight: 600;
  transition: all 0.2s ease;
  /* border: 2px solid var(--primary-color); */
}

.faq-cta-btn:hover {
  background: var(--secondary-color);
  border-color: var(--secondary-color);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .faq-container>.grid {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* gap: var(--spacing-md); */
  }

  .faq-question {
    padding: var(--spacing-md);
    font-size: 1rem;
  }

  .answer-content {
    padding: 0 var(--spacing-md) var(--spacing-md);
  }
}
</style>