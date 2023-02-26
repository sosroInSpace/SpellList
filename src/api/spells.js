/*
  spells.js
*/

/**
 * Fetches all DND spells.
 *
 * @returns {Array} array of spells.
 */
export async function fetchSpellsList() {
  const res = await fetch("https://www.dnd5eapi.co/api/spells");

  if (res.status !== 200) {
    throw new Error(`Fetch failed [${res.status}]`);
  }

  const json = await res.json();

  return json.results || [];
}

/**
 * Fetches a single DND spell by ID.
 *
 * @param {String} spellIndex - the URL of the spell.
 *
 * @returns {Object} the spell.
 */
export async function fetchSpellItem(url) {
  const res = await fetch(url);
  if (res.status !== 200) {
    throw new Error(`Fetch failed [${res.status}]`);
  }

  const json = await res.json();

  // TODO.

  return json;
}
