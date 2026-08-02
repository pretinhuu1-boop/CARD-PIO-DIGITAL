'use client';

import { motion } from 'framer-motion';
import { store, contactMessage } from '@/lib/config';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

/** Contato direto, fora do fluxo de pedido. Oculto se não houver número. */
function FloatingWhatsApp() {
  if (!store.whatsapp.trim()) return null;

  const url = `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(contactMessage)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.8 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="focus-ring fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-on-whatsapp shadow-lg transition-colors hover:bg-whatsapp-hover sm:bottom-8 sm:right-8"
      aria-label="Falar no WhatsApp"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </motion.a>
  );
}

export { FloatingWhatsApp };
