import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AsideType = "search" | "cart" | "mobile" | "closed";
type AsideContextValue = {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
};

/**
 * A side bar component with Overlay
 * @example
 * ```jsx
 * <Aside type="search" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 */
export function Aside({
  children,
  heading,
  type,
}: {
  children?: React.ReactNode;
  type: AsideType;
  heading?: React.ReactNode;
}) {
  const { type: activeType, close } = useAside();
  const expanded = type === activeType;

  useEffect(() => {
    const abortController = new AbortController();

    if (expanded) {
      document.addEventListener(
        "keydown",
        function handler(event: KeyboardEvent) {
          if (event.key === "Escape") {
            close();
          }
        },
        { signal: abortController.signal },
      );
    }
    return () => abortController.abort();
  }, [close, expanded]);

  return (
    <div
      aria-modal
      className={`overlay fixed inset-0 ${expanded ? "expanded" : "pointer-events-none"} transition-opacity duration-300 ease-in-out ${expanded ? 'opacity-100' : 'opacity-0'} z-40`}
      role="dialog"
      onClick={close}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`absolute top-0 right-0 h-full transform transition-transform duration-300 ease-in-out w-full max-w-md sm:max-w-lg md:max-w-xl shadow-2xl bg-white z-50 flex flex-col ${ 
          expanded ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {heading && (
          <header className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            {typeof heading === 'string' ? <h2 className="text-lg font-medium text-gray-900">{heading}</h2> : heading}
            <button onClick={close} className="text-gray-500 hover:text-gray-700 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>
        )}
        <main className="flex-grow overflow-y-auto p-0">
          {children}
        </main>
      </aside>
    </div>
  );
}

const AsideContext = createContext<AsideContextValue | null>(null);

Aside.Provider = function AsideProvider({ children }: { children: ReactNode }) {
  const [type, setType] = useState<AsideType>("closed");

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType("closed"),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error("useAside must be used within an AsideProvider");
  }
  return aside;
}
