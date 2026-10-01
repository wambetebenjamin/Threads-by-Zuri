import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <p className="font-serif text-8xl text-terracotta">404</p>
      <h1 className="mt-4 font-serif text-3xl">This thread leads nowhere</h1>
      <p className="mt-3 text-charcoal/60">
        The page you&apos;re looking for has been moved, sold out, or never existed.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-terracotta px-8 py-4 text-sm font-semibold text-offwhite transition-colors hover:bg-terracotta-dark"
      >
        Back to the Boutique
      </Link>
    </div>
  );
}
