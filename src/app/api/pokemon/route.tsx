import { NextRequest, NextResponse } from "next/server";
import * as pokemon from "@/db/pokedex-sample.json";

export async function GET(request: NextRequest) {
  return NextResponse.json(
        Array.from(pokemon)
    );
}
