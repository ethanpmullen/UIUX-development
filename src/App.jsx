import data from "./data";
import { useState } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import StateCard from "./StateCard";

/* constants to be used in filtering and sorting. constants are used for consistency */
const TRUMP = "Trump";
const BIDEN = "Biden";
const BOTH = ""; /* represents both, as filtering uses .includes() */

/* ranges are inclusive downwards */
const RANGE_MAX = 60;
const SMALL_UPPER_BOUND = 5;
const MEDIUM_UPPER_BOUND = 10;

/* descriptive strings used in sortState() */
const ALPHABET = "Alphabetical";
const POPLOW = "Population, Low to High";
const POPHIGH = "Population, High to Low";

/**
 * returns whether a number is in a given range
 * @param {int} num a number
 * @param {array} tuple an array of two elements, where the first element is the
 * lower bound and the second is the upper bound
 */
function withinRange(num, tuple) {
  const result = num > tuple[0] && num <= tuple[1];
  return result;
}

/**
 * returns "primary" if the color should be selected, "default" if otherwise
 * @param {boolean} cond whether the given filter/sort method is selected or not
 */
function selectedColor(cond) {
  return cond ? "primary" : "default";
}

/**
 * Converts a number of electoral votes to its range represented as a string
 * @param {number} electorals number of electoral votes of a state
 */
export function evToRange(electorals) {
  if (electorals <= SMALL_UPPER_BOUND) {
    return "Small state";
  } else if (electorals <= MEDIUM_UPPER_BOUND) {
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
  const [electoralFilter, setElectoralFilter] = useState([0, RANGE_MAX]);
  /* how the list is currently being sorted, represented by a string */
  const [sortedBy, setSortedBy] = useState(ALPHABET);
  /* states claimed for Biden in the aggregator */
  const [blueStates, setBlueStates] = useState([]);
  /* states claimed for Trump in the aggregator */
  const [redStates, setRedStates] = useState([]);

  /**
   * updates the cards to apply a given a filter for winner
   * @param {string} winner the winner to filter by, either TRUMP, BIDEN, or BOTH
   */
  function updateWinnerFilter(winner) {
    setCards(
      sortState(data, sortedBy).filter(
        (s) =>
          s.result.includes(winner) && withinRange(s.electoral, electoralFilter)
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
          s.result.includes(winnerFilter) && withinRange(s.electoral, range)
      )
    );
    setElectoralFilter(range);
  }

  /**
   * returns a list sorted by a given method of sorting
   * @param {array} list the list to sort
   * @param {string} type the method of sorting, either ALPHABET, POPLOW, or
   * POPHIGH
   */
  function sortState(list, type) {
    if (type === ALPHABET) {
      const alphabet = list.sort((a, b) => {
        if (a.name < b.name) return -1;
        else if (a.name < b.name) return 1;
        else return 0;
      });
      return alphabet;
    } else if (type === POPLOW) {
      return list.sort((a, b) => a.population - b.population);
    } else if (type === POPHIGH) {
      return list.sort((a, b) => b.population - a.population);
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
      <div style={{ flex: 1, marginTop: 10, marginRight: 10 }}>
        {
          /* displays message if electoral count is above threshold*/
          redStates.reduce((acc, cur) => acc + cur.electoral, 0) >= 270 && (
            <Typography variant="h5">
              <b>Trump wins!</b>
            </Typography>
          )
        }
        {blueStates.reduce((acc, cur) => acc + cur.electoral, 0) >= 270 && (
          <Typography variant="h5">
            <b>Biden wins!</b>
          </Typography>
        )}
        <Typography variant="h5">
          {
            /* adds up electoral vote counts for aggregated states */
            blueStates.reduce((acc, cur) => acc + cur.electoral, 0)
          }{" "}
          electoral votes for Biden
        </Typography>
        <Typography variant="body1">
          {
            /* returns a string of comma-separated states */
            blueStates.length === 0
              ? "Click on states to add up electoral votes!"
              : blueStates
                  .map((item) => item.name + " (" + item.electoral + ")")
                  .join(",  ")
          }
        </Typography>

        <Typography variant="h5">
          {
            /* adds up electoral vote counts for aggregated states */
            redStates.reduce((acc, cur) => acc + cur.electoral, 0)
          }{" "}
          electoral votes for Trump
        </Typography>
        <Typography variant="body1">
          {
            /* returns a string of comma-separated states */
            redStates.length === 0
              ? "Click on states to add up electoral votes!"
              : redStates
                  .map((item) => item.name + " (" + item.electoral + ")")
                  .join(",  ")
          }
        </Typography>
      </div>
      <div style={{ flex: 3 }}>
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
              Filter by electoral votes:
            </Typography>
            <Button
              color={selectedColor(
                electoralFilter[0] === 0 && electoralFilter[1] === RANGE_MAX
              )}
              onClick={() => updatePopulationFilter([0, RANGE_MAX])}
            >
              All sizes
            </Button>
            <Button
              color={selectedColor(electoralFilter[1] === SMALL_UPPER_BOUND)}
              onClick={() => updatePopulationFilter([0, SMALL_UPPER_BOUND])}
            >
              Small states
            </Button>
            <Button
              color={selectedColor(electoralFilter[0] === SMALL_UPPER_BOUND)}
              onClick={() =>
                updatePopulationFilter([SMALL_UPPER_BOUND, MEDIUM_UPPER_BOUND])
              }
            >
              Medium states
            </Button>
            <Button
              color={selectedColor(electoralFilter[0] === MEDIUM_UPPER_BOUND)}
              onClick={() =>
                updatePopulationFilter([MEDIUM_UPPER_BOUND, RANGE_MAX])
              }
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
              color={selectedColor(sortedBy === POPLOW)}
              onClick={() => updateSort(POPLOW)}
            >
              Population, low to high
            </Button>

            <Button
              color={selectedColor(sortedBy === POPHIGH)}
              onClick={() => updateSort(POPHIGH)}
            >
              Population, high to low
            </Button>
          </div>

          <div>
            <Button
              style={{ margin: "10px 0px", marginRight: "10px" }}
              variant="contained"
              disabled={cards.every((x) => blueStates.includes(x))}
              onClick={() => {
                /* add all displayed cards that aren't already in aggregator to
                 aggregator */
                setBlueStates(
                  blueStates.concat(
                    cards.filter((x) => !blueStates.includes(x))
                  )
                );
                setRedStates(redStates.filter((x) => !cards.includes(x)));
              }}
            >
              Claim all for Biden
            </Button>
            <Button
              style={{ margin: "10px 0px", marginRight: "10px" }}
              variant="contained"
              disabled={cards.every((x) => redStates.includes(x))}
              onClick={() => {
                /* claims all displayed states for Trump */
                setRedStates(
                  redStates.concat(cards.filter((x) => !redStates.includes(x)))
                );
                setBlueStates(blueStates.filter((x) => !cards.includes(x)));
              }}
            >
              Claim all for Trump
            </Button>
            <Button
              style={{ margin: "10px 0px" }}
              variant="contained"
              disabled={blueStates.length === 0 && redStates.length === 0}
              onClick={() => {
                /* claims all displayed states for Biden  */
                setBlueStates(blueStates.filter((x) => !cards.includes(x)));
                setRedStates(redStates.filter((x) => !cards.includes(x)));
              }}
            >
              Remove states from count
            </Button>
          </div>
        </div>

        <Grid container spacing={2} justify="center">
          {cards.map((item) => (
            <StateCard
              item={item}
              blueStates={blueStates}
              setBlueStates={setBlueStates}
              redStates={redStates}
              setRedStates={setRedStates}
              key={item.name}
            />
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default App;
