"use client";

import { useFormStatus } from "react-dom";

/**
 * Bouton de soumission qui se désactive et change de libellé pendant l'action.
 *
 * `useFormStatus` doit être appelé dans un composant enfant du <form>, jamais
 * dans celui qui le rend — d'où ce composant séparé.
 *
 * `intent` permet de n'afficher l'état d'attente que sur le bouton réellement
 * cliqué quand un même formulaire en compte plusieurs.
 */
export function SubmitButton({
  children,
  pendingLabel,
  className,
  style,
  disabled,
  name,
  value,
  intent,
}: {
  children: React.ReactNode;
  pendingLabel: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  name?: string;
  value?: string;
  intent?: string;
}) {
  const { pending, data } = useFormStatus();
  const isThisButton = intent === undefined || data?.get("intent") === intent;
  const busy = pending && isThisButton;

  return (
    <button
      type="submit"
      name={name}
      value={value}
      disabled={disabled || pending}
      aria-busy={busy}
      className={className}
      style={style}
    >
      {busy ? pendingLabel : children}
    </button>
  );
}
