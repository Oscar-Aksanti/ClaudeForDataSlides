interface ClickZonesProps {
  onPrev: () => void;
  onNext: () => void;
}

/** Zones de clic gauche/droite pour naviguer — brief section 8. */
export function ClickZones({ onPrev, onNext }: ClickZonesProps) {
  return (
    <>
      <button
        aria-label="Slide précédente"
        onClick={onPrev}
        className="no-print absolute inset-y-0 left-0 z-20 w-[12%] cursor-w-resize"
      />
      <button
        aria-label="Slide suivante"
        onClick={onNext}
        className="no-print absolute inset-y-0 right-0 z-20 w-[12%] cursor-e-resize"
      />
    </>
  );
}
