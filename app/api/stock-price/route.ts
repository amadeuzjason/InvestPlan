import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbols = searchParams.get("symbols");

  if (!symbols) {
    return NextResponse.json({ error: "Missing symbols parameter" }, { status: 400 });
  }

  // Symbol format on Yahoo Finance for IDX is TICKER.JK
  const symbolList = symbols.split(",").map((s) => `${s.trim().toUpperCase()}.JK`);
  
  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/quote?symbols=${symbolList.join(",")}`
    );
    const data = await response.json();

    const priceMap: Record<string, number> = {};
    if (data.quoteResponse && data.quoteResponse.result) {
      data.quoteResponse.result.forEach((quote: any) => {
        // Strip .JK to get the clean symbol
        const cleanSymbol = quote.symbol.replace(".JK", "");
        priceMap[cleanSymbol] = quote.regularMarketPrice;
      });
    }

    return NextResponse.json(priceMap);
  } catch (error) {
    console.error("Error fetching stock prices:", error);
    return NextResponse.json({ error: "Failed to fetch stock prices" }, { status: 500 });
  }
}
