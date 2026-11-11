import { motion } from 'framer-motion';
import { Rainbow, chip, pop, hint, fade } from '../ui';

export default function Note({ onNext }) {
  return (
    <motion.div className="fixed inset-0 z-40 flex items-center justify-center p-6 cursor-pointer overflow-y-auto" {...fade} transition={{ duration: 0.8 }} onClick={onNext}>
      <div className="max-w-3xl text-center my-auto py-8 flex flex-col items-center">
        <span className={`${chip} rotate-2`}>🎶 A few words</span>
        <h2 className="font-display font-bold text-5xl md:text-7xl leading-tight mt-6"><Rainbow text="Daddy’s Muddu, Amma’s Maga, Akka’s Tom." /></h2>
        <div className={`mt-8 bg-white rounded-3xl px-6 py-6 md:px-10 md:py-8 space-y-5 text-lg md:text-2xl font-medium leading-relaxed ${pop}`}>
          {/* ✏️ PARAGRAPHS */}
          <p>Swaroo, you are my little brother, and I have spent your whole life guiding you, scolding you, and yes, smacking you (with love). And you? You never listened to me or to anyone else. You always did your own thing. Honestly, that stubborn streak is what makes you you, and somehow you always find your own way. I would not change you, even though I will probably keep trying..</p>
          <p>
To Daddy, you will always be his muddu, his little darling who can never do wrong. To Amma, you are her maga, her son and her pride, even when you do things your own way. They love you more than they say out loud.            </p>
        </div>
        <motion.p className={`mt-12 ${hint}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>Tap anywhere to continue</motion.p>
      </div>
    </motion.div>
  );
}
