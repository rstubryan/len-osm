interface SymbolPlaceholderProps {
  symbol: string;
}

export function SymbolPlaceholder({ symbol }: SymbolPlaceholderProps) {
  return (
    <>
      <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
        {symbol}
      </span>
    </>
  );
}
