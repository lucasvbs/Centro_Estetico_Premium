import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, Instagram, Menu, MapPin, MessageCircle, Play, Sparkles, X } from 'lucide-react';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const WHATSAPP_NUMBER = '5561999999999';
const WHATSAPP_TEXT = 'Olá, quero agendar minha avaliação no Centro Estético Premium';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

const assets = {
  logo: '/assets/logo.jpg',
  hero: '/assets/01.png',
  lips: '/assets/02.png',
  body: '/assets/03.png',
  doctor: '/assets/04.png',
  interior: '/assets/centro.jpg',
  interiorDetail: '/assets/centro02.jpg',
};

const results = [
  { src: '/assets/galeria01.png', label: 'Toxina botulínica', alt: 'Resultado de transformação facial com toxina botulínica, antes e depois' },
  { src: '/assets/galeria02.png', label: 'Preenchimento labial', alt: 'Resultado de preenchimento labial, antes e depois' },
  { src: '/assets/galeria03.png', label: 'Preenchimento labial', alt: 'Resultado de preenchimento labial em vista lateral, antes e depois' },
  { src: '/assets/galeria04.png', label: 'Fios espiculados', alt: 'Resultado com fios espiculados para contorno mandibular, antes e depois' },
  { src: '/assets/galeria05.png', label: 'Fios de PDO espiculados', alt: 'Resultado com fios de PDO espiculados, antes e depois' },
];

const faqs = [
  ['Dói fazer esses procedimentos?', 'Cada um tem um nível de desconforto diferente — isso é explicado na avaliação, antes de qualquer aplicação.'],
  ['Quanto tempo dura o resultado?', 'Varia por procedimento. Fios, Botox, preenchimento e bioestimulador têm durações diferentes — tudo é explicado individualmente na consulta.'],
  ['Preciso de algum preparo antes?', 'Orientações específicas são passadas na avaliação, de acordo com o procedimento escolhido.'],
  ['Tem alguma contraindicação?', 'É avaliado caso a caso na consulta inicial.'],
  ['Quais as formas de pagamento?', 'Essa informação é definida diretamente com a clínica no momento do agendamento.'],
  ['Onde fica a clínica?', 'QNB 16 Lote 1, Salas 105/106, Edifício Noleto, Taguatinga Norte — Brasília-DF.'],
];

function Reveal({ children, className = '', delay = '' }: { children: ReactNode; className?: string; delay?: string }) {
  const [visible, setVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={elementRef} className={`reveal ${visible ? 'is-visible' : ''} ${delay} ${className}`}>{children}</div>;
}

function WhatsAppButton({ children, variant = 'solid', className = '', testId = 'button-whatsapp' }: { children: ReactNode; variant?: 'solid' | 'outline' | 'light'; className?: string; testId?: string }) {
  return <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" data-testid={testId} className={`inline-flex items-center justify-center gap-3 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[.16em] transition-all duration-300 hover:-translate-y-0.5 ${variant === 'solid' ? 'bg-[#704a2e] text-[#f9f4ec] hover:bg-[#563721] shadow-[0_12px_24px_rgba(112,74,46,.18)]' : variant === 'light' ? 'bg-[#f9f4ec] text-[#704a2e] hover:bg-[#bba271]' : 'border border-[#bba271] text-[#704a2e] hover:bg-[#bba271]/20'} ${className}`}>
    {children}<ArrowRight size={15} strokeWidth={1.7} />
  </a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [['O método', '#metodo'], ['Resultados', '#resultados'], ['O espaço', '#espaco'], ['Dúvidas', '#duvidas']];
  return <header className="nav-blur fixed inset-x-0 top-0 z-50 border-b border-[#704a2e]/10">
    <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 md:px-10">
      <a href="#inicio" data-testid="link-logo" className="flex items-center gap-3">
        <img src={assets.logo} alt="Símbolo do Centro Estético Premium" className="h-11 w-11 rounded-full object-cover object-top" />
        <span className="font-display text-[19px] leading-[.85] text-[#704a2e]">Centro Estético<br /><span className="text-[14px] tracking-[.17em]">PREMIUM</span></span>
      </a>
      <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
        {nav.map(([label, href]) => <a key={href} href={href} data-testid={`link-nav-${label.toLowerCase().replace(' ', '-')}`} className="line-link text-[10px] font-bold uppercase tracking-[.17em] text-[#704a2e]/75 hover:text-[#704a2e]">{label}</a>)}
      </nav>
      <div className="hidden lg:block"><WhatsAppButton testId="button-header-agendar" className="px-5 py-3">Agendar avaliação</WhatsAppButton></div>
      <button type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} data-testid="button-mobile-menu" onClick={() => setOpen(!open)} className="flex h-10 w-10 items-center justify-center text-[#704a2e] lg:hidden">{open ? <X size={22} /> : <Menu size={22} />}</button>
    </div>
    {open && <nav className="border-t border-[#704a2e]/10 bg-[#f5f0e9] px-5 py-5 lg:hidden" aria-label="Menu mobile">
      <div className="flex flex-col gap-5">
        {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} data-testid={`link-mobile-${label.toLowerCase().replace(' ', '-')}`} className="text-[11px] font-bold uppercase tracking-[.18em] text-[#704a2e]">{label}</a>)}
        <WhatsAppButton testId="button-mobile-agendar" className="w-full">Agendar avaliação</WhatsAppButton>
      </div>
    </nav>}
  </header>;
}

function Progress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="progress-bar" style={{ width: `${progress}%` }} aria-hidden="true" />;
}

function Hero() {
  return <section id="inicio" className="relative overflow-hidden bg-[#f5f0e9] pt-[76px]">
    <div className="mx-auto grid min-h-[calc(100svh-76px)] max-w-[1400px] grid-cols-1 lg:grid-cols-[.9fr_1.1fr]">
      <div className="flex flex-col justify-center px-6 pb-16 pt-16 md:px-12 lg:px-20 lg:py-20">
        <Reveal><p className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.24em] text-[#704a2e]"><span className="h-px w-8 bg-[#bba271]" /> Taguatinga Norte · Brasília-DF</p></Reveal>
        <Reveal delay="reveal-delay-1"><h1 className="max-w-[680px] font-display text-[clamp(3.5rem,7vw,7rem)] leading-[.82] tracking-[-.035em] text-[#704a2e]">Harmonização<br /><em className="font-normal text-[#bba271]">facial</em> que parece<br />você.</h1></Reveal>
        <Reveal delay="reveal-delay-2"><p className="mt-8 max-w-[480px] text-[15px] leading-7 text-[#3c2b20]/70">Só que mais descansada. Fios de sustentação, Botox, preenchimento e bioestimulador aplicados por quem entende de resultado natural.</p></Reveal>
        <Reveal delay="reveal-delay-3"><div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><WhatsAppButton testId="button-hero-agendar">Agendar avaliação</WhatsAppButton><span className="text-[10px] uppercase tracking-[.11em] text-[#3c2b20]/55">Avaliação sem compromisso<br />Resposta rápida no WhatsApp</span></div></Reveal>
        <div className="mt-16 flex items-center gap-5 border-t border-[#704a2e]/15 pt-5 text-[10px] uppercase tracking-[.15em] text-[#704a2e]/70"><span className="flex items-center gap-2"><Sparkles size={13} /> Cuidado individual</span><span className="h-1 w-1 rounded-full bg-[#bba271]" /><span>Resultado natural</span></div>
      </div>
      <div className="relative min-h-[510px] overflow-hidden bg-[#704a2e] lg:min-h-0">
        <img src={assets.hero} alt="Dra. Viviane Cunha, especialista em estética, em seu espaço de atendimento" className="absolute inset-0 h-full w-full object-cover object-center lg:object-[center_28%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3a2113]/55 via-transparent to-[#704a2e]/10" />
        <div className="absolute bottom-7 left-6 right-6 flex items-end justify-between text-[#f5f0e9] md:bottom-10 md:left-10 md:right-10">
          <p className="max-w-[210px] font-display text-[30px] leading-[.9]">“Mais você.<br /><em className="text-[#bba271]">Nunca menos.</em>”</p>
          <a href="#metodo" aria-label="Conheça o método" data-testid="link-hero-scroll" className="flex h-14 w-14 items-center justify-center rounded-full border border-[#f5f0e9]/45 transition hover:bg-[#f5f0e9] hover:text-[#704a2e]"><ArrowDown size={19} /></a>
        </div>
      </div>
    </div>
  </section>;
}

function Intro() {
  return <section className="overflow-hidden bg-[#704a2e] text-[#f5f0e9]">
    <div className="marquee-track flex w-max items-center gap-9 py-4 text-[10px] font-bold uppercase tracking-[.25em] text-[#bba271]"><span>Natural é uma escolha</span><span aria-hidden="true">·</span><span>Seu rosto, seu ritmo</span><span aria-hidden="true">·</span><span>Cuidado que sabe até onde ir</span><span aria-hidden="true">·</span><span>Natural é uma escolha</span><span aria-hidden="true">·</span><span>Seu rosto, seu ritmo</span><span aria-hidden="true">·</span><span>Cuidado que sabe até onde ir</span><span aria-hidden="true">·</span></div>
    <div className="mx-auto grid max-w-[1320px] gap-12 px-6 py-24 md:px-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-24 lg:py-32">
      <Reveal><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#bba271]">Uma pergunta honesta</p></Reveal>
      <Reveal delay="reveal-delay-1"><div><h2 className="max-w-[800px] font-display text-[clamp(2.8rem,5vw,5.6rem)] leading-[.88] tracking-[-.02em]">Você já parou diante do espelho puxando a pele com as mãos, só para ver “como ficaria”?</h2><p className="mt-9 max-w-[650px] text-[15px] leading-7 text-[#f5f0e9]/68">Esse é o ponto de partida de quase toda cliente que chega até nós. A vontade de rejuvenescer sem virar outra pessoa. No Centro Estético Premium, cada procedimento é pensado para realçar o que já é seu, não para apagar.</p><div className="mt-10 flex items-center gap-4"><div className="flex -space-x-2">{['B','G','J'].map((letter, i) => <span key={letter} className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#704a2e] text-[11px] font-bold ${i === 0 ? 'bg-[#bba271]' : i === 1 ? 'bg-[#dac7ab]' : 'bg-[#9f7b59]'}`}>{letter}</span>)}</div><p className="text-[11px] leading-4 text-[#f5f0e9]/68"><strong className="text-[#f5f0e9]">4,9 no Google</strong><br />+266 clientes já avaliaram este cuidado</p></div></div></Reveal>
    </div>
  </section>;
}

function Method() {
  const items = [
    ['01', 'Escuta', 'Antes de qualquer aplicação, entendemos o que incomoda, o que você deseja e o que faz sentido para o seu momento.'],
    ['02', 'Leitura', 'Analisamos seu rosto em movimento, respeitando proporções, expressões e a beleza que já existe em você.'],
    ['03', 'Precisão', 'Indicamos entre fios, Botox, preenchimento e bioestimulador apenas o necessário — nem mais, nem menos.'],
  ];
  return <section id="metodo" className="bg-[#eee5da] px-6 py-24 md:px-10 lg:py-32">
    <div className="mx-auto max-w-[1320px]">
      <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24"><Reveal><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#704a2e]">O Protocolo Premium</p><div className="mt-16 hidden font-display text-[120px] leading-none text-[#bba271]/50 lg:block">03</div></div></Reveal><Reveal delay="reveal-delay-1"><div><h2 className="max-w-[780px] font-display text-[clamp(3rem,6vw,6rem)] leading-[.84] text-[#704a2e]">Não é sobre aplicar tudo.<br /><em className="font-normal text-[#bba271]">É sobre acertar.</em></h2><p className="mt-8 max-w-[570px] text-[15px] leading-7 text-[#3c2b20]/68">Uma avaliação individual define exatamente o que o seu rosto precisa. O resultado natural começa antes da primeira aplicação.</p></div></Reveal></div>
      <div className="mt-20 grid border-t border-[#704a2e]/20 md:grid-cols-3">{items.map(([number, title, text], i) => <Reveal key={number} delay={`reveal-delay-${i + 1}`} className="border-b border-[#704a2e]/20 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"><span className="font-display text-4xl text-[#bba271]">{number}</span><h3 className="mt-7 font-display text-4xl text-[#704a2e]">{title}</h3><p className="mt-4 max-w-[260px] text-[13px] leading-6 text-[#3c2b20]/65">{text}</p></Reveal>)}</div>
    </div>
  </section>;
}

function Benefits() {
  const benefits = [
    ['Fios de sustentação', 'Liso, bomba ou espiculado: sustentação sem parecer “puxado”.'],
    ['Botox', 'Fim das marcas de expressão sem travar o movimento do rosto.'],
    ['Preenchimento', 'Contorno recuperado, com resultado que parece seu, não postiço.'],
    ['Bioestimulador', 'Colágeno trabalhando por meses, com resultado que evolui aos poucos.'],
  ];
  return <section className="bg-[#f5f0e9] px-6 py-24 md:px-10 lg:py-32"><div className="mx-auto max-w-[1320px]"><div className="mb-14 flex flex-col justify-between gap-7 md:flex-row md:items-end"><Reveal><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#704a2e]">O que pode fazer sentido</p><h2 className="mt-5 max-w-[580px] font-display text-[clamp(3rem,5vw,5.7rem)] leading-[.84] text-[#704a2e]">Seu rosto não cabe<br /><em className="font-normal text-[#bba271]">em um protocolo.</em></h2></div></Reveal><Reveal delay="reveal-delay-1"><p className="max-w-[290px] text-[13px] leading-6 text-[#3c2b20]/60">Você sai sabendo exatamente o que foi feito e por quê. A avaliação individual vem antes de tudo.</p></Reveal></div><div className="grid gap-px bg-[#704a2e]/15 md:grid-cols-2">{benefits.map(([title, text], i) => <Reveal key={title} delay={`reveal-delay-${(i % 3) + 1}`} className="group bg-[#f5f0e9] p-8 transition-colors duration-300 hover:bg-[#eee5da] md:p-10"><div className="flex items-start justify-between"><span className="text-[10px] font-bold tracking-[.18em] text-[#bba271]">0{i + 1}</span><ArrowRight size={17} className="text-[#704a2e] transition-transform duration-300 group-hover:translate-x-2" /></div><h3 className="mt-14 font-display text-[37px] leading-none text-[#704a2e]">{title}</h3><p className="mt-4 max-w-[430px] text-[14px] leading-6 text-[#3c2b20]/65">{text}</p></Reveal>)}</div></div></section>;
}

function Results() {
  const [selected, setSelected] = useState(-1);
  const selectedResult = selected < 0 ? null : results[selected];
  return <section id="resultados" className="bg-[#3c2b20] px-6 py-24 text-[#f5f0e9] md:px-10 lg:py-32"><div className="mx-auto max-w-[1320px]"><div className="grid items-end gap-10 lg:grid-cols-[.85fr_1.15fr]"><Reveal><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#bba271]">Resultados que respeitam histórias</p><h2 className="mt-6 max-w-[530px] font-display text-[clamp(3.2rem,6vw,6.3rem)] leading-[.82]">O melhor resultado é <em className="font-normal text-[#bba271]">continuar sendo você.</em></h2></div></Reveal><Reveal delay="reveal-delay-1"><p className="max-w-[430px] text-[14px] leading-7 text-[#f5f0e9]/65 lg:justify-self-end">Cada caso é único. As imagens abaixo registram experiências reais compartilhadas pela clínica e não representam promessa de resultado. Clique para ampliar.</p></Reveal></div><div className="mt-16 grid gap-5 md:grid-cols-12">{results.map((result, i) => <Reveal key={result.src} delay={`reveal-delay-${(i % 3) + 1}`} className={`${i === 0 ? 'md:col-span-7' : i === 1 ? 'md:col-span-5' : i === 2 ? 'md:col-span-4' : i === 3 ? 'md:col-span-4' : 'md:col-span-4'}`}><button type="button" data-testid={`button-result-${i + 1}`} onClick={() => setSelected(i)} className="image-zoom group relative block aspect-[1/1.03] w-full overflow-hidden bg-[#704a2e] text-left"><img src={result.src} alt={result.alt} className="h-full w-full object-cover" /><span className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-[#704a2e]/90 px-5 py-4 text-[10px] font-bold uppercase tracking-[.15em] transition-transform duration-300 group-hover:translate-y-0">{result.label}<span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#bba271]"><Play size={11} fill="currentColor" /></span></span></button></Reveal>)}</div><div className="mt-10 flex items-center justify-between border-t border-[#f5f0e9]/15 pt-6"><p className="text-[10px] uppercase tracking-[.16em] text-[#f5f0e9]/55">Arraste o olhar · Toque para ampliar</p><div className="flex gap-2"><button type="button" aria-label="Resultado anterior" data-testid="button-result-prev" onClick={() => setSelected((selected - 1 + results.length) % results.length)} className="flex h-10 w-10 items-center justify-center border border-[#bba271]/45 hover:bg-[#bba271] hover:text-[#3c2b20]"><ChevronLeft size={16} /></button><button type="button" aria-label="Próximo resultado" data-testid="button-result-next" onClick={() => setSelected((selected + 1) % results.length)} className="flex h-10 w-10 items-center justify-center border border-[#bba271]/45 hover:bg-[#bba271] hover:text-[#3c2b20]"><ChevronRight size={16} /></button></div></div></div>{selectedResult && <div className="pointer-events-none fixed left-1/2 top-1/2 z-[70] hidden -translate-x-1/2 -translate-y-1/2 opacity-0" aria-hidden="true"><img src={selectedResult.src} alt="" /></div>}<Lightbox index={selected} onClose={() => setSelected(-1)} onChange={setSelected} /></section>;
}

function Lightbox({ index, onClose, onChange }: { index: number; onClose: () => void; onChange: (index: number) => void }) {
  if (index < 0) return null;
  const item = results[index];
  return <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#24170f]/95 p-4 md:p-10" role="dialog" aria-modal="true" aria-label="Visualização ampliada do resultado"><button type="button" aria-label="Fechar imagem" data-testid="button-lightbox-close" onClick={onClose} className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#f5f0e9]/30 text-[#f5f0e9] hover:bg-[#f5f0e9] hover:text-[#704a2e]"><X size={19} /></button><button type="button" aria-label="Imagem anterior" data-testid="button-lightbox-prev" onClick={() => onChange((index - 1 + results.length) % results.length)} className="absolute left-4 flex h-11 w-11 items-center justify-center border border-[#f5f0e9]/30 text-[#f5f0e9] hover:bg-[#bba271] hover:text-[#704a2e] md:left-8"><ChevronLeft size={20} /></button><figure className="flex max-h-[90vh] max-w-[min(780px,80vw)] flex-col items-center gap-4"><img src={item.src} alt={item.alt} className="max-h-[78vh] w-auto max-w-full object-contain" /><figcaption className="text-[10px] font-bold uppercase tracking-[.18em] text-[#bba271]">{item.label} · {index + 1}/{results.length}</figcaption></figure><button type="button" aria-label="Próxima imagem" data-testid="button-lightbox-next" onClick={() => onChange((index + 1) % results.length)} className="absolute right-4 flex h-11 w-11 items-center justify-center border border-[#f5f0e9]/30 text-[#f5f0e9] hover:bg-[#bba271] hover:text-[#704a2e] md:right-8"><ChevronRight size={20} /></button></div>;
}

function SpaceAndDoctor() {
  return <section id="espaco" className="bg-[#eee5da]"><div className="mx-auto grid max-w-[1400px] lg:grid-cols-2"><Reveal className="image-zoom min-h-[470px] overflow-hidden lg:min-h-[700px]"><img src={assets.interior} alt="Recepção do Centro Estético Premium em Taguatinga Norte" className="h-full w-full object-cover" /></Reveal><div className="flex flex-col justify-center px-6 py-20 md:px-16 lg:px-20"><Reveal><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#704a2e]">Um lugar para desacelerar</p><h2 className="mt-6 max-w-[530px] font-display text-[clamp(3.2rem,5vw,5.6rem)] leading-[.83] text-[#704a2e]">Cuidado também é o <em className="font-normal text-[#bba271]">ambiente.</em></h2><p className="mt-8 max-w-[470px] text-[14px] leading-7 text-[#3c2b20]/68">Fácil acesso, boa estrutura e um atendimento pensado para que você se sinta segura desde a chegada. O endereço é em Taguatinga Norte, dentro do Edifício Noleto.</p><a href="#duvidas" data-testid="link-space-address" className="line-link mt-8 flex w-fit items-center gap-3 text-[10px] font-bold uppercase tracking-[.17em] text-[#704a2e]"><MapPin size={15} /> QNB 16 Lote 1, Salas 105/106</a></Reveal><Reveal delay="reveal-delay-1" className="mt-14 grid grid-cols-2 gap-4"><div className="image-zoom h-40 overflow-hidden"><img src={assets.interiorDetail} alt="Detalhe da parede de identificação e marcas do espaço" className="h-full w-full object-cover" /></div><div className="flex flex-col justify-end border-l border-[#704a2e]/20 pl-5"><p className="font-display text-4xl leading-none text-[#704a2e]">Um olhar<br /><em className="text-[#bba271]">atento.</em></p></div></Reveal></div></div><div className="mx-auto grid max-w-[1320px] items-center gap-12 px-6 py-24 md:px-10 lg:grid-cols-[1.08fr_.92fr] lg:py-32"><Reveal><div className="relative overflow-hidden bg-[#704a2e]"><img src={assets.doctor} alt="Dra. Viviane Cunha, farmacêutica esteta e proprietária do Centro Estético Premium" className="w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#3c2b20]/35 to-transparent" /></div></Reveal><Reveal delay="reveal-delay-1"><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#704a2e]">Quem cuida de você</p><h2 className="mt-6 font-display text-[clamp(3rem,5vw,5.2rem)] leading-[.83] text-[#704a2e]">Dra. Viviane<br /><em className="font-normal text-[#bba271]">Cunha.</em></h2><p className="mt-8 max-w-[490px] text-[15px] leading-7 text-[#3c2b20]/70">Farmacêutica esteta, especialista em toxina botulínica, preenchimentos, bioestimuladores e fios de PDO, com formação avançada e atuação como professora e proprietária do Centro Estético Premium.</p><div className="mt-8 flex gap-3"><span className="border border-[#704a2e]/25 px-3 py-2 text-[9px] font-bold uppercase tracking-[.14em] text-[#704a2e]">Formação avançada</span><span className="border border-[#704a2e]/25 px-3 py-2 text-[9px] font-bold uppercase tracking-[.14em] text-[#704a2e]">Atendimento individual</span></div></Reveal></div></section>;
}

function SocialProof() {
  return <section className="bg-[#bba271] px-6 py-24 md:px-10 lg:py-28"><div className="mx-auto max-w-[1320px]"><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-24"><Reveal><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#704a2e]">O que elas dizem</p><p className="mt-12 font-display text-[clamp(4rem,8vw,8rem)] leading-[.72] text-[#704a2e]">4,9</p><p className="mt-6 text-[11px] font-bold uppercase tracking-[.15em] text-[#704a2e]/70">Nota no Google · +266 avaliações</p></div></Reveal><div className="grid gap-8 md:grid-cols-3">{[['“A clínica possui fácil acesso, tem uma boa estrutura.”', 'Barbara Jorge'], ['“Ótimo trabalho, lugar perfeito. Amei o atendimento.”', 'Gizella Aquino'], ['“Usa produtos seguros, confiáveis e de qualidade.”', 'Jane Vaz']].map(([quote, name], i) => <Reveal key={name} delay={`reveal-delay-${i + 1}`} className="border-t border-[#704a2e]/30 pt-6"><p className="font-display text-[29px] leading-[.95] text-[#704a2e]">{quote}</p><p className="mt-8 text-[10px] font-bold uppercase tracking-[.16em] text-[#704a2e]/65">{name}</p></Reveal>)}</div></div></div></section>;
}

function OfferNote() {
  return <section className="bg-[#3c2b20] px-6 py-20 text-[#f5f0e9] md:px-10 lg:py-24"><div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[.8fr_1.2fr]"><Reveal><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#bba271]">Sem letras miúdas</p><h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5rem)] leading-[.82]">Como funciona<br /><em className="font-normal text-[#bba271]">na prática.</em></h2></div></Reveal><Reveal delay="reveal-delay-1"><div className="grid gap-5 border-l border-[#bba271]/45 pl-6 md:grid-cols-3 md:border-l-0 md:pl-0">{[['01', 'Avaliação presencial'], ['02', 'Indicação do procedimento ideal'], ['03', 'Agendamento']].map(([number, title]) => <div key={number} className="border-t border-[#f5f0e9]/20 pt-4 md:border-l md:pl-5"><span className="text-[10px] font-bold tracking-[.18em] text-[#bba271]">{number}</span><p className="mt-8 font-display text-[27px] leading-none">{title}</p></div>)}</div><div className="mt-12 border-t border-[#f5f0e9]/15 pt-5 text-[12px] leading-6 text-[#f5f0e9]/55"><p><strong className="text-[#f5f0e9]">Investimento e formas de pagamento:</strong> variam por procedimento e são conversados diretamente com a clínica antes de qualquer decisão.</p><p className="mt-2">A orientação pós-procedimento está incluída. Não há prazo ou condição de agenda informados nesta página.</p></div></Reveal></div></section>;
}

function Objections() {
  const data = [['Mas e se ficar artificial?', 'Por isso a avaliação vem antes de qualquer aplicação — o objetivo é realçar, não transformar o rosto em outro.'], ['Mas eu não sei qual procedimento é para o meu caso?', 'Você não precisa saber. Isso é definido na avaliação, com a profissional te explicando cada opção.'], ['Mas é caro?', 'O investimento varia por procedimento. Dá para conversar sobre o que cabe no seu momento antes de decidir qualquer coisa.'], ['E se eu não gostar do resultado?', 'O acompanhamento não termina na aplicação. Qualquer ajuste é conversado com a clínica.']];
  return <section className="bg-[#f5f0e9] px-6 py-24 md:px-10 lg:py-32"><div className="mx-auto max-w-[1050px]"><Reveal><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#704a2e]">Pode perguntar</p><h2 className="mt-6 max-w-[650px] font-display text-[clamp(3rem,5vw,5.5rem)] leading-[.83] text-[#704a2e]">Confiança nasce<br /><em className="font-normal text-[#bba271]">da clareza.</em></h2></Reveal><div className="mt-14">{data.map(([question, answer], i) => <Reveal key={question} delay={`reveal-delay-${(i % 3) + 1}`} className="grid gap-5 border-t border-[#704a2e]/20 py-7 md:grid-cols-[.9fr_1.1fr] md:gap-12"><h3 className="font-display text-[29px] leading-none text-[#704a2e]">{question}</h3><p className="text-[14px] leading-6 text-[#3c2b20]/65">{answer}</p></Reveal>)}</div><Reveal className="mt-12 flex items-center gap-4 border border-[#bba271] bg-[#eee5da] p-6"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#bba271] text-[#704a2e]"><Check size={18} /></div><p className="text-[13px] leading-5 text-[#3c2b20]/75"><strong className="text-[#704a2e]">Acompanhamento no pós.</strong> Toda cliente passa por avaliação individual, recebe explicação clara e não é atendida “no automático”.</p></Reveal></div></section>;
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return <section id="duvidas" className="bg-[#eee5da] px-6 py-24 md:px-10 lg:py-32"><div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[.7fr_1.3fr] lg:gap-24"><Reveal><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#704a2e]">Ainda ficou alguma dúvida?</p><h2 className="mt-6 font-display text-[clamp(3rem,5vw,5.6rem)] leading-[.82] text-[#704a2e]">Você não precisa<br /><em className="font-normal text-[#bba271]">decidir agora.</em></h2><p className="mt-7 max-w-[320px] text-[14px] leading-6 text-[#3c2b20]/65">A avaliação é o primeiro passo para entender o que faz sentido para o seu rosto e para o seu momento.</p></div></Reveal><div>{faqs.map(([question, answer], index) => <Reveal key={question} delay={`reveal-delay-${(index % 3) + 1}`}><div className="border-t border-[#704a2e]/20"><button type="button" aria-expanded={open === index} data-testid={`button-faq-${index + 1}`} onClick={() => setOpen(open === index ? null : index)} className="flex w-full items-center justify-between gap-5 py-6 text-left"><span className="font-display text-[25px] leading-none text-[#704a2e]">{question}</span><ChevronDown size={18} className={`shrink-0 text-[#704a2e] transition-transform duration-300 ${open === index ? 'rotate-180' : ''}`} /></button><div className={`faq-content ${open === index ? 'open' : ''}`}><div><p className="pb-6 pr-10 text-[13px] leading-6 text-[#3c2b20]/65">{answer}</p></div></div></div></Reveal>)}</div></div></section>;
}

function FinalCTA() {
  return <section className="relative overflow-hidden bg-[#704a2e] px-6 py-28 text-[#f5f0e9] md:px-10 lg:py-40"><div className="absolute -right-20 -top-28 h-80 w-80 rounded-full border border-[#bba271]/30 md:h-[520px] md:w-[520px]" /><div className="absolute -right-4 -top-12 h-56 w-56 rounded-full border border-[#bba271]/20 md:h-[350px] md:w-[350px]" /><div className="relative mx-auto max-w-[1000px] text-center"><Reveal><p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#bba271]">O primeiro passo é uma conversa</p><h2 className="mx-auto mt-8 max-w-[850px] font-display text-[clamp(3.5rem,8vw,8.5rem)] leading-[.76] tracking-[-.03em]">Seu rosto não precisa mudar.<br /><em className="font-normal text-[#bba271]">Ele precisa de cuidado.</em></h2><p className="mx-auto mt-10 max-w-[460px] text-[14px] leading-6 text-[#f5f0e9]/68">Um cuidado que sabe até onde ir. Agende sua avaliação no Centro Estético Premium, em Taguatinga Norte.</p><WhatsAppButton variant="light" testId="button-final-agendar" className="mt-9">Agendar minha avaliação</WhatsAppButton><p className="mt-6 text-[10px] uppercase tracking-[.14em] text-[#f5f0e9]/45">Sem compromisso · Direto com a clínica</p></Reveal></div></section>;
}

function Footer() {
  return <footer className="bg-[#3c2b20] px-6 py-12 text-[#f5f0e9] md:px-10"><div className="mx-auto max-w-[1320px]"><div className="grid gap-10 border-b border-[#f5f0e9]/15 pb-10 md:grid-cols-[1.2fr_.8fr_.8fr]"><div><div className="flex items-center gap-3"><img src={assets.logo} alt="Símbolo do Centro Estético Premium" className="h-12 w-12 rounded-full object-cover object-top" /><span className="font-display text-2xl leading-[.83]">Centro Estético<br /><span className="text-base tracking-[.16em]">PREMIUM</span></span></div><p className="mt-6 max-w-[260px] text-[12px] leading-5 text-[#f5f0e9]/55">Harmonização facial natural para mulheres que querem se cuidar sem parecer artificial.</p></div><div><p className="text-[10px] font-bold uppercase tracking-[.19em] text-[#bba271]">Navegue</p><div className="mt-5 flex flex-col items-start gap-3 text-[12px] text-[#f5f0e9]/65"><a href="#metodo" data-testid="link-footer-metodo" className="hover:text-[#bba271]">O método</a><a href="#resultados" data-testid="link-footer-resultados" className="hover:text-[#bba271]">Resultados</a><a href="#espaco" data-testid="link-footer-espaco" className="hover:text-[#bba271]">O espaço</a><a href="#duvidas" data-testid="link-footer-duvidas" className="hover:text-[#bba271]">Dúvidas</a></div></div><div><p className="text-[10px] font-bold uppercase tracking-[.19em] text-[#bba271]">Encontre</p><p className="mt-5 text-[12px] leading-6 text-[#f5f0e9]/65">QNB 16 Lote 1<br />Salas 105/106, Edifício Noleto<br />Taguatinga Norte · Brasília-DF</p><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" data-testid="link-footer-whatsapp" className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#bba271]"><MessageCircle size={14} /> Falar no WhatsApp</a></div></div><div className="flex flex-col justify-between gap-5 pt-7 text-[10px] uppercase tracking-[.13em] text-[#f5f0e9]/40 md:flex-row"><p>© {new Date().getFullYear()} Centro Estético Premium</p><div className="flex items-center gap-5"><span>Conteúdo informativo · Resultados individuais variam</span><Instagram size={15} /></div></div></div></footer>;
}

function Home() {
  useEffect(() => { document.title = 'Centro Estético Premium | Harmonização facial natural em Taguatinga'; }, []);
  return <div className="site-shell grain min-h-[100dvh]"><Progress /><Header /><main><Hero /><Intro /><Method /><Benefits /><Results /><SpaceAndDoctor /><SocialProof /><OfferNote /><Objections /><FAQ /><FinalCTA /></main><Footer /></div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;