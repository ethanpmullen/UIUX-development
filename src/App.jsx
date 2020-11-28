import data from "./data";
import { useState } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import StateCard from "./Card";

const RANGE_MAX = 40000000000;
const SMALL_MEDIUM = 2500000;
const MEDIUM_LARGE = 6500000;
const alphabet = "Alphabetical";
const evLow = "Electoral Votes, Low to High";
const evHigh = "Electoral Votes, High to Low";

function withinRange(num, tuple) {
  const result = num >= tuple[0] && num < tuple[1];
  return result;
}

function App() {
  const [cards, setCards] = useState(data);
  const [winnerFilter, setWinnerFilter] = useState("");
  const [populationFilter, setPopulationFilter] = useState([0, RANGE_MAX]);
  const [sortedBy, setSortedBy] = useState(alphabet);
  const [selected, setSelected] = useState([]);

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

  function updatePopulationFilter(range) {
    setCards(
      sortState(data, sortedBy).filter(
        (s) =>
          s.result.includes(winnerFilter) && withinRange(s.population, range)
      )
    );
    setPopulationFilter(range);
  }

  function sortState(list, type) {
    if (type === alphabet) {
      const alphabet = list.sort((a, b) => {
        if (a.state < b.state) return -1;
        else if (a.state < b.state) return 1;
        else return 0;
      });
      return alphabet;
    } else if (type === evLow) {
      return list.sort((a, b) => a.electoral - b.electoral);
    } else if (type === evHigh) {
      return list.sort((a, b) => b.electoral - a.electoral);
    }
  }

  function sortButton(type) {
    setCards(sortState(cards, type));
    setSortedBy(type);
  }

  return (
    <div style={{ padding: 20 }}>
      <div style={{ padding: 4 }}>
        <Typography variant="body1">
          Click on states to add up the total electoral votes!
        </Typography>
        <Typography variant="h4"> Selected States</Typography>
        <Typography variant="body1">
          {selected.map((item) => item.state).join(",  ")}
        </Typography>
        <Typography variant="h4">
          {" "}
          Electoral Votes:{" "}
          {selected.reduce((acc, cur) => acc + cur.electoral, 0)}
        </Typography>
        <div>
          <Typography variant={"subtitle1"} display={"inline"}>
            Filter by winner:
          </Typography>
          <Button
            color={winnerFilter === "" ? "primary" : "default"}
            onClick={() => updateWinnerFilter("")}
          >
            Both candidates
          </Button>
          <Button
            color={winnerFilter === "Biden" ? "primary" : "default"}
            onClick={() => updateWinnerFilter("Biden")}
          >
            States Biden won
          </Button>
          <Button
            color={winnerFilter === "Trump" ? "primary" : "default"}
            onClick={() => updateWinnerFilter("Trump")}
          >
            States Trump won
          </Button>
        </div>

        <div>
          <Typography variant={"subtitle1"} display={"inline"}>
            Filter by population:
          </Typography>
          <Button
            color={
              populationFilter[0] === 0 && populationFilter[1] === RANGE_MAX
                ? "primary"
                : "default"
            }
            onClick={() => updatePopulationFilter([0, RANGE_MAX])}
          >
            All sizes
          </Button>
          <Button
            color={populationFilter[1] === SMALL_MEDIUM ? "primary" : "default"}
            onClick={() => updatePopulationFilter([0, SMALL_MEDIUM])}
          >
            Small states
          </Button>
          <Button
            color={populationFilter[0] === SMALL_MEDIUM ? "primary" : "default"}
            onClick={() => updatePopulationFilter([SMALL_MEDIUM, MEDIUM_LARGE])}
          >
            Medium states
          </Button>
          <Button
            color={populationFilter[0] === MEDIUM_LARGE ? "primary" : "default"}
            onClick={() => updatePopulationFilter([MEDIUM_LARGE, RANGE_MAX])}
          >
            Big states
          </Button>
        </div>

        <div>
          <Typography variant={"subtitle1"} display={"inline"}>
            Sort:
          </Typography>
          <Button
            color={sortedBy === alphabet ? "primary" : "default"}
            onClick={() => sortButton(alphabet)}
          >
            Alphabetically
          </Button>
          <Button
            color={sortedBy === evLow ? "primary" : "default"}
            onClick={() => sortButton(evLow)}
          >
            Electoral Votes, low to high
          </Button>

          <Button
            color={sortedBy === evHigh ? "primary" : "default"}
            onClick={() => sortButton(evHigh)}
          >
            Electoral Votes, high to low
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={() =>
              cards.every((x) => selected.includes(x))
                ? setSelected(selected.filter((x) => !cards.includes(x)))
                : setSelected(
                    selected.concat(cards.filter((x) => !selected.includes(x)))
                  )
            }
          >
            {cards.every((x) => selected.includes(x))
              ? "Deselect all"
              : "Select all"}
          </Button>
        </div>
      </div>

      <Grid container spacing={2} justify="center">
        {cards.map((item) => (
          <StateCard
            item={item}
            selected={selected}
            setSelected={setSelected}
            key={item.state}
          />
        ))}
      </Grid>
    </div>
  );
}

export default App;
