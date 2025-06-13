import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Star, Play, Pause, Volume2 } from 'lucide-react';

const RomanticWebsite = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicControl, setShowMusicControl] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 200) {
        setShowMusicControl(false);
      } else {
        setShowMusicControl(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('[data-section]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((e) => console.log('Audio play failed:', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Componente de partícula mais sutil
  const FloatingParticle = ({ delay = 0, type = 'heart' }) => {
    const Icon = type === 'heart' ? Heart : type === 'star' ? Star : Sparkles;
    const colors = [
      'text-pink-200/30',
      'text-purple-200/30',
      'text-red-200/30',
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return (
      <div
        className={`absolute ${color} animate-pulse pointer-events-none`}
        style={{
          animationDelay: `${delay}s`,
          animationDuration: `${4 + Math.random() * 3}s`,
          left: `${20 + Math.random() * 60}%`,
          top: `${20 + Math.random() * 60}%`,
          transform: `scale(${0.3 + Math.random() * 0.4})`,
        }}
      >
        <Icon className="w-3 h-3 fill-current" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 text-white overflow-x-hidden relative">
      {/* Audio Element com música romântica que funciona */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/music/contramao.mp3" type="audio/mpeg" />
        Seu navegador não suporta o elemento <code>audio</code>.
      </audio>

      {/* Controle de Música Melhorado */}
      <div
        className={`fixed top-6 right-6 z-50 transition-all duration-500 ${
          showMusicControl ? 'opacity-100 scale-100' : 'opacity-80 scale-95'
        }`}
      >
        <button
          onClick={toggleMusic}
          className="bg-gradient-to-r from-pink-500/80 to-purple-500/80 backdrop-blur-md hover:from-pink-600/90 hover:to-purple-600/90 text-white p-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 border border-pink-300/20"
        >
          <div className="flex items-center space-x-1">
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
            <Volume2 className="w-3 h-3" />
          </div>
        </button>
      </div>

      {/* Efeitos de fundo mais sutis */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Menos partículas, mais sutis */}
        {[...Array(12)].map((_, i) => (
          <FloatingParticle
            key={`particle-${i}`}
            delay={i * 0.5}
            type={['heart', 'star', 'sparkle'][Math.floor(Math.random() * 3)]}
          />
        ))}
      </div>

      {/* Gradiente de fundo animado mais sutil */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 via-transparent to-purple-600/10 animate-pulse"></div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-6">
        <div
          className="text-center transform transition-all duration-1000"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400/30 to-purple-400/30 rounded-full blur-2xl animate-pulse"></div>
            <Heart className="w-32 h-32 text-pink-400 fill-current mx-auto animate-pulse relative z-10" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-8 animate-pulse">
            Para Isa
          </h1>
          <p className="text-2xl md:text-3xl text-pink-200/90 mb-6">
            Para lembrar de mim... 💕
          </p>
          <p className="text-base text-pink-300/60">
            Role para baixo e sinta cada palavra...
          </p>
        </div>
      </section>

      {/* Sections com decoração mais limpa */}
      {[
        'Isa, você é tipo a poesia mais bonita que eu já senti, sabe? Tudo em você me encanta de um jeito que nem sei explicar.',
        'Não consigo tirar você da cabeça, e nem quero. Você é o meu sonho acordado, e tudo o que eu mais desejo é a chance de te mostrar o quanto meu coração deseja por você.',
        'Não desiste de mim, porque eu jamais vou desistir de tudo oq eu quero viver do seu lado 🩷',
        'Eu quero conquistar você, porque é com você que eu quero estar e é com você que eu me vejo daqui 1, 2, 7 anos.',
        'Talvez você pense que não seja o momento, mas te deixar escapar entre meus dedos é a maior burrice que eu poderia fazer.',
        'Eu sou extremamente apaixonada pelo seu sorriso, seu beijo, seu abraço, seu cheiro, seus olhos, o formato do seu cabelo, sou apaixonada por cada detalhe que há em você!',
        'Seja o meu lar, e eu te prometo te dar refúgio sempre que quiser.',
        'Nesse dia dos namorados, eu não posso te chamar de meu amor, mas no próximo, eu tenho a certeza de que é com você que vou estar comemorando essa data.',
        'Porque quando eu digo "talvez na próxima vida" eu torço muito pra que ainda seja nessa e em um futuro próximo.',
      ].map((text, index) => (
        <section
          key={index}
          id={`section${index + 1}`}
          data-section
          className="min-h-screen flex items-center justify-center px-8 relative"
        >
          <div
            className={`text-center max-w-4xl transform transition-all duration-1000 ${
              visibleSections.has(`section${index + 1}`)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
          >
            {/* Decoração sutil */}
            <div className="relative mb-8">
              {index % 3 === 0 && (
                <Heart className="absolute -top-6 left-1/4 w-8 h-8 text-pink-300/50 fill-current animate-pulse" />
              )}
              {index % 3 === 1 && (
                <Sparkles className="absolute -top-6 right-1/4 w-6 h-6 text-yellow-300/50 animate-pulse" />
              )}
              {index % 3 === 2 && (
                <Star className="absolute -top-6 left-1/3 w-7 h-7 text-yellow-300/50 animate-pulse" />
              )}
            </div>

            <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed font-light">
              <span
                className={`bg-gradient-to-r ${
                  index % 4 === 0
                    ? 'from-pink-300 via-purple-300 to-pink-400'
                    : index % 4 === 1
                    ? 'from-purple-300 via-red-300 to-pink-300'
                    : index % 4 === 2
                    ? 'from-red-300 via-pink-300 to-purple-300'
                    : 'from-pink-300 via-purple-300 to-blue-300'
                } bg-clip-text text-transparent`}
              >
                {text}
              </span>
            </p>
          </div>
        </section>
      ))}

      {/* Seção Final */}
      <section
        id="section10"
        data-section
        className="min-h-screen flex items-center justify-center px-8 relative"
      >
        <div
          className={`text-center max-w-4xl transform transition-all duration-1000 ${
            visibleSections.has('section10')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="relative mb-12">
            <div className="flex justify-center space-x-8 mb-8">
              <Heart className="w-16 h-16 text-pink-300 fill-current animate-pulse" />
              <Heart
                className="w-20 h-20 text-red-400 fill-current animate-pulse"
                style={{ animationDelay: '0.5s' }}
              />
              <Heart
                className="w-16 h-16 text-pink-300 fill-current animate-pulse"
                style={{ animationDelay: '1s' }}
              />
            </div>
          </div>

          <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed font-light mb-12">
            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 bg-clip-text text-transparent">
              Eu te tenho dentro do meu peito, e você me tem por inteira
            </span>
            <span className="text-pink-400 text-5xl ml-4">🩷</span>
          </p>

          <div className="mt-16">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/40 to-purple-400/40 rounded-full blur-2xl animate-pulse"></div>
              <Heart className="w-24 h-24 text-pink-400 fill-current mx-auto animate-pulse relative z-10" />
            </div>
            <p className="text-xl text-pink-200/90 mb-4">
              Com todo meu amor e esperança ❤️
            </p>
            <p className="text-base text-pink-300/70">
              Feliz Dia dos Namorados, futura namorada 💕
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RomanticWebsite;
