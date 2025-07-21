import type { Variants, Transition } from 'framer-motion';

export const logoVariants: Variants = {

  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.42, 0, 0.58, 1] // cubic-bezier for easeInOut
    }
  },
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    } as Transition // Explicitly type the transition
  }
};

export const navItemVariants: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * custom,
      duration: 0.5,
      ease: "easeInOut"
    }
  }),
  hover: {
    color: "#3b82f6",
    transition: {
      duration: 0.2
    } as Transition
  }
};

export const underlineVariants: Variants = {
  initial: { width: 0 },
  hover: { width: "100%" },
  active: { width: "100%" }
};

export const mobileMenuVariants: Variants = {
  initial: {
    opacity: 0,
    height: 0,
    y: -20
  },
  animate: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const mobileItemVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { opacity: 0, x: -20 }
};




export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      ease: [0.16, 1, 0.3, 1] as const,
      duration: 1
    }
  }
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, rotateY: 15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    transition: {
      ease: [0.16, 1, 0.3, 1] as const,
      duration: 0.8
    }
  },
  hover: {
    y: -15,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: {
      duration: 0.4,
      ease: "easeOut"
    } as Transition
  }
};

export const imageHoverVariants: Variants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
};

export const badgeVariants: Variants = {
  hover: {
    rotate: [0, -5, 5, 0],
    transition: {
      duration: 0.6
    } as Transition
  }
};

export const headerVariants = {
  initial: { opacity: 0, y: -100 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

export const textReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

export const scaleUp = {
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    } as Transition
  }
};






export const specialFaresContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

export const specialFaresCardVariants: Variants = {
  hidden: { y: 50, opacity: 0, rotateX: -15 },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
      mass: 0.5
    } as Transition
  },
  hover: {
    y: -15,
    rotateX: 5,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    } as Transition
  }
};

export const TitleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut"
    } as Transition
  }
};

export const PriceVariants: Variants = {
  hover: {
    scale: 1.05,
    textShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
    transition: {
      type: "spring",
      stiffness: 500
    } as Transition
  }
};

export const FeatureItemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5 + i * 0.1,
      duration: 0.3
    } as Transition
  })
};

export const floatingOrbVariants: Variants = {
  initial: { y: 0, x: 0 },
  animate: (i: number) => ({
    y: [0, -20, 0],
    x: [0, i % 2 === 0 ? 10 : -10, 0],
    transition: {
      duration: 5 + i * 2,
      repeat: Infinity,
      ease: "easeInOut"
    } as Transition
  })
};

export const BackgroundOrbVariants: Variants = {
  animate: {
    y: [0, -40, 0],
    x: [0, 20, 0],
    opacity: [0.3, 0.7, 0.3],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    } as Transition
  }
};

export const BackgroundOrbDelayedVariants: Variants = {
  animate: {
    y: [0, -30, 0],
    x: [0, -15, 0],
    opacity: [0.4, 0.8, 0.4],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 2
    } as Transition
  }
};





export const testimonialsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      ease: [0.16, 1, 0.3, 1],
      duration: 1
    }
  }
};

export const testimonialCardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.8
    }
  },
  hover: {
    y: -10,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
    transition: {
      duration: 0.4,
      ease: "easeOut"
    } as Transition
  }
};

export const testimonialQuoteVariants: Variants = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.6
    } as Transition
  }
};

export const testimonialCarouselVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6
    }
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    transition: {
      duration: 0.4
    }
  })
};

export const testimonialHeaderVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const testimonialIndicatorVariants: Variants = {
  inactive: {
    width: 12,
    backgroundColor: "#4b5563" // gray-600
  },
  active: {
    width: 24,
    backgroundColor: "#f59e0b", // amber-400
    transition: {
      duration: 0.3
    } as Transition
  }
};

export const testimonialRatingVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const testimonialStarVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15
    } as Transition
  }
};

export const testimonialAvatarVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    } as Transition
  }
};

export const testimonialBadgeVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4,
      duration: 0.6
    } as Transition
  }
};

export const testimonialNavButtonVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.1,
    backgroundColor: "rgba(55, 65, 81, 0.9)", // gray-700/90
    transition: {
      duration: 0.2
    } as Transition
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    } as Transition
  }
};




export const partnersContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const partnerItemVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
      ease: [0.16, 1, 0.3, 1]
    } as Transition
  },
  hover: {
    y: -10,
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    } as Transition
  }
};

export const partnersTitleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    } as Transition
  }
};

export const partnerLogoVariants: Variants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3
    } as Transition
  }
};

export const ctaButtonVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.8
    }
  },
  hover: { 
    scale: 1.03,
    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
    transition: {
      type: "spring",
      stiffness: 400
    } as Transition
  },
  tap: { 
    scale: 0.98 
  }
};