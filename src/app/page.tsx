import Image from "next/image";
import * as pokemon from "@/db/pokedex-sample.json";

export default function Home() {


  return (
    <div className="columns-[300px]">
        {pokemon.map((p) => (
            <div key={p.id} className="border border-gray-300 rounded-md p-4 mb-4 mx-1">
                <Image
                    src={p.image.hires}
                    alt={p.name.english}
                    width={348}
                    height={348}
                />
                <h1>{p.name.english}</h1>
            </div>
        ))}
    </div>
  );
}
