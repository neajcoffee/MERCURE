<template>
    <h1 class="animated-title">
        <span class="fixed-text">{{ fixedText }}</span>
        <div class="words-container">
            <transition :name="animationClass" mode="out-in" @after-leave="onTransitionComplete">
                <span :key="currentTextIndex" class="animated-word">
                    {{ changingTexts[currentTextIndex] }}
                </span>
            </transition>
        </div>
    </h1>
</template>

<script>
export default {
    name: 'AnimatedTitle',
    props: {
        fixedText: {
            type: String,
            default: 'Le thème qui '
        },
        changingTexts: {
            type: Array,
            default: () => ['convertir', 'séduire', 'engager', 'motiver']
        },
        changeInterval: {
            type: Number,
            default: 3000
        },
        animationType: {
            type: String,
            default: 'smooth',
            validator: (value) => ['smooth', 'dynamic'].includes(value)
        }
    },
    computed: {
        animationClass() {
            return `fade-slide-${this.animationType}`
        },
        animationDuration() {
            return this.animationType === 'smooth' ? 800 : 400
        }
    },
    data() {
        return {
            currentTextIndex: 0,
            isAnimating: false
        }
    },
    mounted() {
        this.startTextRotation()
    },
    beforeUnmount() {
        this.stopTextRotation()
    },
    methods: {
        startTextRotation() {
            // Démarrer immédiatement la première rotation
            this.rotateText()
        },
        stopTextRotation() {
            if (this.rotationTimeout) {
                clearTimeout(this.rotationTimeout)
            }
        },
        rotateText() {
            if (this.isAnimating) return

            this.rotationTimeout = setTimeout(() => {
                this.isAnimating = true
                this.currentTextIndex = (this.currentTextIndex + 1) % this.changingTexts.length
            }, this.changeInterval)
        },
        onTransitionComplete() {
            this.isAnimating = false
            this.rotateText() // Planifier la prochaine rotation
        }
    }
}
</script>

<style scoped>
.animated-title {
    font-size: clamp(3.2rem, 5vw, 7rem);
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: var(--spacing-lg);
    color: var(--landing-color-text);
    display: inline-flex;
    flex-wrap: wrap;
    width: 100%;
}

.fixed-text {
    display: inline-block;
    text-align: center;
}

.words-container {
    display: inline-block;
    position: relative;
    min-width: min(8ch, 90%);
    height: 1.1em;
    vertical-align: baseline;
    text-align: center;
}

.animated-word {
    color: var(--landing-color-primary);
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    display: inline-block;
    white-space: nowrap;
    width: 100%;
    text-align: left;
    font-weight: 1000;
    letter-spacing: -0.02em;
}

/* Animation Smooth */
.fade-slide-smooth-enter-active {
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-smooth-leave-active {
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-smooth-enter-from {
    opacity: 0;
    transform: translate(-50%, 50%);
}

.fade-slide-smooth-leave-to {
    opacity: 0;
    transform: translate(-50%, -50%);
}

/* Animation Dynamic */
.fade-slide-dynamic-enter-active {
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.fade-slide-dynamic-leave-active {
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.fade-slide-dynamic-enter-from {
    opacity: 0;
    transform: translate(-50%, 100%) scale(0.8);
}

.fade-slide-dynamic-leave-to {
    opacity: 0;
    transform: translate(-50%, -100%) scale(0.8);
}

/* Responsive */
@media (max-width: 768px) {
    .animated-title {
        font-size: clamp(2.5rem, 9vw, 4rem);
        flex-direction: column;
        gap: 0.2em;
    }

    .words-container {
        min-width: min(8ch, 95%);
        height: 1.2em;
    }

    .animated-word {
        text-align: center;
    }
}

@media (max-width: 480px) {

    .words-container {
        min-width: min(7ch, 100%);
        height: 1.3em;
    }
}
</style>