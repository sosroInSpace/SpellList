/*
  RootPage.js
*/

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PaginatedList } from "react-paginated-list";
import {
  fetchSpells,
  fetchSpell,
  fetchSpellStorage,
  addToFavourites,
  removeFromFavourites,
} from "features/spells/spellsSlice";

// image assets
import wond from "assets/wond.svg";
import star from "assets/star.svg";
import filledStar from "assets/filled-star.svg";
import close from "assets/close.svg";
// styles
import "./RootPage.css";

export default function RootPage({ favourites = false }) {
  const dispatch = useDispatch();
  const spells = useSelector((state) => state.spells.spells);
  const spell = useSelector((state) => state.spells.spell);
  const storage = useSelector((state) => state.spells.storage);
  const favouritesSet = useSelector(
    (state) => new Set(state.spells.favourites)
  );
  const status = useSelector((state) => state.spells.status);
  const error = useSelector((state) => state.spells.error);
  // state
  const [desc, setDesc] = useState(false);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalLoader, setModalLoader] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSpells());
    }
  }, [status, dispatch]);

  function handleClickRetry() {
    dispatch(fetchSpells());
  }

  function closeModal() {
    setModal(false);
    setModalLoader(false);
  }

  function getIndieSpell(e) {
    let url =
      "https://www.dnd5eapi.co" +
      e.currentTarget.getAttribute("data-attr-endpoint");
    setModal(true);
    dispatch(fetchSpell(url));
    // loading animation
    setTimeout(function () {
      setModalLoader(true);
    }, 1000);
  }

  const useSpells = favourites
    ? spells.filter((spell) => favouritesSet.has(spell.index))
    : spells;

  return (
    <div className="RootPage">
      <span
        className={modal ? "filter modal active" : "filter modal"}
        onClick={closeModal}
      />
      <header>
        <h1>{favourites ? "My Favourite Spells" : "Spell List"}</h1>
      </header>
      {useSpells.length > 0 ? (
        <div>
          <h3 className="total-count">
            Total Count: <strong>{useSpells.length}</strong>
          </h3>

          <section>
            <div className="loop-wrap infint-container">
              <PaginatedList
                list={useSpells}
                itemsPerPage={21}
                renderList={(list) =>
                  list.map((spell, i) => {
                    const isFavourited = favouritesSet.has(spell.index);

                    function handleClickFavourite() {
                      dispatch(
                        isFavourited
                          ? removeFromFavourites(spell)
                          : addToFavourites(spell)
                      );
                    }

                    return (
                      <div className="card" key={spell.index}>
                        <div className="top-section">
                          <div className="wond-wrapper">
                            <img src={wond} alt="wond" className="wond" />
                          </div>
                          <div className="button-wrapper">
                            <button
                              onClick={getIndieSpell}
                              data-attr-endpoint={spell.url}
                            >
                              {spell.name}
                            </button>
                          </div>
                          <div className="add-to-favourites">
                            <button
                              type="button"
                              onClick={handleClickFavourite}
                            >
                              {isFavourited ? (
                                <img
                                  src={filledStar}
                                  alt="Filled star"
                                  className="star"
                                />
                              ) : (
                                <img src={star} alt="Star" className="star" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                }
              />
            </div>
          </section>
        </div>
      ) : (
        <div>
          <p>
            {error ? (
              error.message
            ) : status === "succeeded" ? (
              "No Spells Found"
            ) : status === "loading.." ? (
              <span className="loader"></span>
            ) : (
              ""
            )}
          </p>

          {Boolean(error) && (
            <div>
              <button type="button" onClick={handleClickRetry}>
                Click to Retry
              </button>
            </div>
          )}
        </div>
      )}

      <div className={modal ? "modal active" : "modal"} onClick={closeModal}>
        {spell ? (
          <div className="content">
            <div className="close-wrapper">
              <div className="ok-col-1">
                <h4>{spell.name}</h4>
              </div>
              <div className="ok-col-2">
                <img src={close} alt="x" onClick={closeModal} />
              </div>
            </div>
            <div className="heading-wrapper">
              <span
                className={
                  modalLoader ? "loader-wrapper removed" : "loader-wrapper"
                }
              >
                <span className="loader"></span>
              </span>
              {spell.duration ? (
                <h4 className="stats">
                  Duration: <strong>{spell.duration}</strong>
                </h4>
              ) : (
                ""
              )}
              {spell.material ? (
                <h4 className="stats">
                  Material: <strong>{spell.material}</strong>
                </h4>
              ) : (
                ""
              )}
              {spell.attack_type ? (
                <h4 className="stats">
                  Attack Type: <strong>{spell.attack_type}</strong>
                </h4>
              ) : (
                ""
              )}
              {spell.casting_time ? (
                <h4 className="stats">
                  Casting Time: <strong>{spell.casting_time}</strong>
                </h4>
              ) : (
                ""
              )}
              {spell.range ? (
                <h4 className="stats">
                  Range: <strong>{spell.range}</strong>
                </h4>
              ) : (
                ""
              )}
              {spell.desc
                ? spell.desc.map((item, index) => {
                    return <p>{item}</p>;
                  })
                : ""}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
