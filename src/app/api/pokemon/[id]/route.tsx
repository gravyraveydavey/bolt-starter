import { NextRequest, NextResponse } from "next/server";
import * as all_pokemon from "@/db/pokedex-sample.json";

export async function GET(request: NextRequest, context) {
  const { params } = context;
  const pokemon = all_pokemon.filter((x) => params.id === x.id.toString());
  return NextResponse.json({
    ...pokemon[0]
    });
}
