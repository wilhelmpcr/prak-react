import Button from "./Button";

export default function HeroSection({ title, subtitle, ctaText, onCtaClick }) {
  return (
    <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
      <div className="relative z-10 max-w-xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">{title}</h1>
        <p className="text-blue-100 text-base sm:text-lg mb-6">{subtitle}</p>
        {ctaText && (
          <div onClick={onCtaClick} className="inline-block">
            <Button type="primary">{ctaText}</Button>
          </div>
        )}
      </div>
    </div>
  );
}
