export const getPosition = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return null;

  const rect = el.getBoundingClientRect();

  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    width: rect.width,
    height: rect.height,
  };
};

export const isMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
};