import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#f5f0e9] px-6">
      <div className="w-full max-w-md text-center text-[#704a2e]">
        <AlertCircle className="mx-auto mb-5 h-9 w-9" strokeWidth={1.5} />
        <h1 className="font-display text-4xl">Página não encontrada</h1>
        <p className="mt-4 text-sm leading-6 text-[#704a2e]/65">
          O endereço acessado não existe. Volte para a página inicial do Centro
          Estético Premium.
        </p>
        <a
          href="/"
          className="mt-7 inline-flex bg-[#704a2e] px-6 py-3 text-[11px] font-bold uppercase tracking-[.16em] text-[#f9f4ec] transition hover:bg-[#563721]"
        >
          Voltar ao início
        </a>
      </div>
    </div>
  );
}
