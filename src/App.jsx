import data from "./data";
import { useState } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import StateCard from "./StateCard";

/* constants to be used in filtering and sorting. constants are used for consistency */
const TRUMP = "Trump";
const BIDEN = "Biden";
const BOTH = ""; /* represents both, as filtering uses .includes() */
const RANGE_MAX = 40000000000;
const SMALL_MEDIUM = 2500000;
const MEDIUM_LARGE = 6500000;
const ALPHABET = "Alphabetical";
const EVLOW = "Electoral Votes, Low to High";
const EVHIGH = "Electoral Votes, High to Low";

/**
 * returns whether a number is in a given range
 * @param {int} num a number
 * @param {array} tuple an array of two elements, where the first element is the
 * lower bound and the second is the upper bound
 */
function withinRange(num, tuple) {
  const result = num >= tuple[0] && num < tuple[1];
  return result;
}

/**
 * returns "primary" if the color should be selected, "default" if otherwise
 * @param {boolean} cond whether the given filter/sort method is selected or not
 */
function selectedColor(cond) {
  return cond ? "primary" : "default";
}

export function popToRange(population) {
  if (population < SMALL_MEDIUM) {
    return "Small state";
  } else if (population < MEDIUM_LARGE) {
    return "Medium state";
  } else {
    return "Large state";
  }
}

function App() {
  /* the current list of cards to display */
  const [cards, setCards] = useState(data);
  /* the current winner filter. either TRUMP, BIDEN, or BOTH */
  const [winnerFilter, setWinnerFilter] = useState(BOTH);
  /* the current population filter, an array of 2 elements representing lower and
  upper bounds */
  const [populationFilter, setPopulationFilter] = useState([0, RANGE_MAX]);
  /* how the list is currently being sorted, represented by a string */
  const [sortedBy, setSortedBy] = useState(ALPHABET);
  /* the list items in the aggregator */
  const [selected, setSelected] = useState([]);

  /**
   * updates the cards to apply a given a filter for winner
   * @param {string} winner the winner to filter by, either TRUMP, BIDEN, or BOTH
   */
  function updateWinnerFilter(winner) {
    setCards(
      sortState(data, sortedBy).filter(
        (s) =>
          s.result.includes(winner) &&
          withinRange(s.population, populationFilter)
      )
    );
    setWinnerFilter(winner);
  }

  /**
   * updates the cards to apply a given population filter
   * @param {*} range a two-element array representing a range
   */
  function updatePopulationFilter(range) {
    setCards(
      sortState(data, sortedBy).filter(
        (s) =>
          s.result.includes(winnerFilter) && withinRange(s.population, range)
      )
    );
    setPopulationFilter(range);
  }

  /**
   * returns a list sorted by a given method of sorting
   * @param {array} list the list to sort
   * @param {string} type the method of sorting, either ALPHABET, EVLOW, or
   * EVHIGH
   */
  function sortState(list, type) {
    if (type === ALPHABET) {
      const alphabet = list.sort((a, b) => {
        if (a.name < b.name) return -1;
        else if (a.name < b.name) return 1;
        else return 0;
      });
      return alphabet;
    } else if (type === EVLOW) {
      return list.sort((a, b) => a.electoral - b.electoral);
    } else if (type === EVHIGH) {
      return list.sort((a, b) => b.electoral - a.electoral);
    }
  }

  /**
   * updates the cards to apply a method of sorting
   * @param {string} type method of sorting
   */
  function updateSort(type) {
    setCards(sortState(cards, type));
    setSortedBy(type);
  }

  return (
    <div style={{ padding: "5px 20px", display: "flex" }}>
      <div style={{ flex: 1, margin: "10px 4px" }}>
        <Typography variant="h5">
          {" "}
          Electoral Votes:{" "}
          {
            /* adds up electoral vote counts for aggregated states */
            selected.reduce((acc, cur) => acc + cur.electoral, 0)
          }
        </Typography>
        <Typography variant="body1">
          {
            /* returns a string of comma-separated states */
            selected.length === 0
              ? "Click on states to add up electoral votes!"
              : selected
                  .map((item) => item.name + " (" + item.electoral + ")")
                  .join(",  ")
          }
        </Typography>
      </div>
      <div style={{ flex: 4 }}>
        <div style={{ margin: "10px 4px" }}>
          <div style={{ borderBottom: "1px solid black" }}>
            <Typography variant={"subtitle1"} display={"inline"}>
              Filter by winner:
            </Typography>
            <Button
              color={selectedColor(winnerFilter === BOTH)}
              onClick={() => updateWinnerFilter(BOTH)}
            >
              Both candidates
            </Button>
            <Button
              color={selectedColor(winnerFilter === BIDEN)}
              onClick={() => updateWinnerFilter(BIDEN)}
            >
              States Biden won
            </Button>
            <Button
              color={selectedColor(winnerFilter === TRUMP)}
              onClick={() => updateWinnerFilter(TRUMP)}
            >
              States Trump won
            </Button>
          </div>

          <div style={{ borderBottom: "1px solid black" }}>
            <Typography variant={"subtitle1"} display={"inline"}>
              Filter by population:
            </Typography>
            <Button
              color={selectedColor(
                populationFilter[0] === 0 && populationFilter[1] === RANGE_MAX
              )}
              onClick={() => updatePopulationFilter([0, RANGE_MAX])}
            >
              All sizes
            </Button>
            <Button
              color={selectedColor(populationFilter[1] === SMALL_MEDIUM)}
              onClick={() => updatePopulationFilter([0, SMALL_MEDIUM])}
            >
              Small states
            </Button>
            <Button
              color={selectedColor(populationFilter[0] === SMALL_MEDIUM)}
              onClick={() =>
                updatePopulationFilter([SMALL_MEDIUM, MEDIUM_LARGE])
              }
            >
              Medium states
            </Button>
            <Button
              color={selectedColor(populationFilter[0] === MEDIUM_LARGE)}
              onClick={() => updatePopulationFilter([MEDIUM_LARGE, RANGE_MAX])}
            >
              Large states
            </Button>
          </div>

          <div style={{ borderBottom: "1px solid black" }}>
            <Typography variant={"subtitle1"} display={"inline"}>
              Sort:
            </Typography>
            <Button
              color={selectedColor(sortedBy === ALPHABET)}
              onClick={() => updateSort(ALPHABET)}
            >
              Alphabetically
            </Button>
            <Button
              color={selectedColor(sortedBy === EVLOW)}
              onClick={() => updateSort(EVLOW)}
            >
              Electoral Votes, low to high
            </Button>

            <Button
              color={selectedColor(sortedBy === EVHIGH)}
              onClick={() => updateSort(EVHIGH)}
            >
              Electoral Votes, high to low
            </Button>
          </div>

          <div>
            <Button
              style={{ margin: "10px 0px", marginRight: "10px" }}
              variant="contained"
              disabled={cards.every((x) => selected.includes(x))}
              onClick={() =>
                /* add all displayed cards that aren't already in aggregator to
                 aggregator */
                setSelected(
                  selected.concat(cards.filter((x) => !selected.includes(x)))
                )
              }
            >
              Include states in count
            </Button>
            <Button
              style={{ margin: "10px 0px" }}
              variant="contained"
              disabled={selected.length === 0}
              onClick={() =>
                /* filter out all currently displayed cards  */
                setSelected(selected.filter((x) => !cards.includes(x)))
              }
            >
              Remove states from count
            </Button>
          </div>
        </div>

        <Grid container spacing={2} justify="center">
          {cards.map((item) => (
            <StateCard
              item={item}
              selected={selected}
              setSelected={setSelected}
              key={item.name}
            />
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default App;
