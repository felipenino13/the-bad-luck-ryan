"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Team = {
  aliases?: string;
  code: string;
  name: string;
};

const worldCupTeams: Team[] = [
  { name: "Alemania", code: "de" },
  { name: "Argelia", code: "dz" },
  { name: "Argentina", code: "ar" },
  { name: "Australia", code: "au" },
  { name: "Austria", code: "at" },
  { name: "Bélgica", code: "be" },
  { name: "Bosnia y Herzegovina", code: "ba" },
  { name: "Brasil", code: "br" },
  { name: "Cabo Verde", code: "cv" },
  { name: "Canadá", code: "ca" },
  { name: "Colombia", code: "co" },
  { name: "Corea del Sur", code: "kr" },
  { name: "Costa de Marfil", code: "ci" },
  { name: "Croacia", code: "hr" },
  { name: "Curazao", code: "cw" },
  { name: "Ecuador", code: "ec" },
  { name: "Egipto", code: "eg" },
  { name: "Escocia", code: "gb-sct", aliases: "Scotland" },
  { name: "España", code: "es" },
  { name: "Estados Unidos", code: "us", aliases: "USA United States EEUU" },
  { name: "Francia", code: "fr" },
  { name: "Ghana", code: "gh" },
  { name: "Haití", code: "ht" },
  { name: "Inglaterra", code: "gb-eng", aliases: "England" },
  { name: "Irán", code: "ir" },
  { name: "Iraq", code: "iq" },
  { name: "Japón", code: "jp" },
  { name: "Jordania", code: "jo" },
  { name: "Marruecos", code: "ma" },
  { name: "México", code: "mx" },
  { name: "Noruega", code: "no" },
  { name: "Nueva Zelanda", code: "nz" },
  { name: "Países Bajos", code: "nl", aliases: "Holanda Netherlands" },
  { name: "Panamá", code: "pa" },
  { name: "Paraguay", code: "py" },
  { name: "Portugal", code: "pt" },
  { name: "Qatar", code: "qa" },
  { name: "RD Congo", code: "cd", aliases: "DR Congo Republica Democratica Congo" },
  { name: "República Checa", code: "cz", aliases: "Czech Republic Chequia" },
  { name: "Arabia Saudita", code: "sa" },
  { name: "Senegal", code: "sn" },
  { name: "Sudáfrica", code: "za" },
  { name: "Suecia", code: "se" },
  { name: "Suiza", code: "ch" },
  { name: "Túnez", code: "tn" },
  { name: "Turquía", code: "tr" },
  { name: "Uruguay", code: "uy" },
  { name: "Uzbekistán", code: "uz" },
];

const placeholder = "Ryan Castro usando la camiseta de....";

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function flagUrl(code: string) {
  return `https://flagcdn.com/w40/${code}.png`;
}

export default function TeamCombobox() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const filteredTeams = useMemo(() => {
    const normalizedQuery = normalizeSearch(query.trim());

    if (!normalizedQuery) {
      return worldCupTeams;
    }

    return worldCupTeams.filter((team) =>
      normalizeSearch(`${team.name} ${team.aliases ?? ""}`).includes(
        normalizedQuery,
      ),
    );
  }, [query]);

  return (
    <div className="badluck-combobox">
      <label className="sr-only" htmlFor="team-search">
        Selecciona un país
      </label>
      <div className="badluck-combobox__field">
        {selectedTeam ? (
          <Image
            className="badluck-combobox__selected-flag"
            src={flagUrl(selectedTeam.code)}
            alt=""
            width={24}
            height={16}
            aria-hidden="true"
            unoptimized
          />
        ) : null}
        <input
          id="team-search"
          name="team"
          role="combobox"
          aria-autocomplete="list"
          aria-controls="team-options"
          aria-expanded={isOpen}
          autoComplete="off"
          placeholder={placeholder}
          value={query}
          onBlur={() => window.setTimeout(() => setIsOpen(false), 120)}
          onChange={(event) => {
            setQuery(event.target.value);
            setSelectedTeam(null);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        <input
          name="selectedTeamCode"
          type="hidden"
          value={selectedTeam?.code ?? ""}
        />
        <input
          name="selectedTeamName"
          type="hidden"
          value={selectedTeam?.name ?? ""}
        />
        <Image
          src="/icon-herradura.svg"
          alt=""
          width={34}
          height={34}
          aria-hidden="true"
        />
      </div>

      {isOpen ? (
        <ul className="badluck-combobox__options" id="team-options" role="listbox">
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team) => (
              <li key={team.name} role="option" aria-selected={query === team.name}>
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    setQuery(team.name);
                    setSelectedTeam(team);
                    setIsOpen(false);
                  }}
                >
                  <Image
                    src={flagUrl(team.code)}
                    alt=""
                    width={24}
                    height={16}
                    aria-hidden="true"
                    unoptimized
                  />
                  <span>{team.name}</span>
                </button>
              </li>
            ))
          ) : (
            <li className="badluck-combobox__empty">
              No hay países con ese nombre.
            </li>
          )}
        </ul>
      ) : null}
    </div>
  );
}
