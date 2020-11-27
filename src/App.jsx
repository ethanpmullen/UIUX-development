import data from "./data";
import { useState } from "react";
import { Grid, Card, Typography, CardContent, Button } from "@material-ui/core";

const RANGE_MAX = 40000000000;
const SMALL_MEDIUM = 2500000;
const MEDIUM_LARGE = 6500000;
const alphabet = "Alphabetical";
const evLow = "Electoral Votes, Low to High";
const evHigh = "Electoral Votes, High to Low";

function withinRange(num, tuple) {
  const result = num >= tuple[0] && num < tuple[1];
  console.log(num, tuple[0], tuple[1], result);
  return result;
}

function App() {
  const [cards, setCards] = useState(data);
  const [winnerFilter, setWinnerFilter] = useState("");
  const [populationFilter, setPopulationFilter] = useState([0, RANGE_MAX]);
  const [sortedBy, setSortedBy] = useState(alphabet);

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
      <div>
        <Typography variant={"subtitle1"} display={"inline"}>
          Filter by winner:
        </Typography>
        <Button
          color={winnerFilter === "" ? "primary" : ""}
          onClick={() => updateWinnerFilter("")}
        >
          Both candidates
        </Button>
        <Button
          color={winnerFilter === "Biden" ? "primary" : ""}
          onClick={() => updateWinnerFilter("Biden")}
        >
          States Biden won
        </Button>
        <Button
          color={winnerFilter === "Trump" ? "primary" : ""}
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
              : ""
          }
          onClick={() => updatePopulationFilter([0, RANGE_MAX])}
        >
          All sizes
        </Button>
        <Button
          color={populationFilter[1] === SMALL_MEDIUM ? "primary" : ""}
          onClick={() => updatePopulationFilter([0, SMALL_MEDIUM])}
        >
          Small states
        </Button>
        <Button
          color={populationFilter[0] === SMALL_MEDIUM ? "primary" : ""}
          onClick={() => updatePopulationFilter([SMALL_MEDIUM, MEDIUM_LARGE])}
        >
          Medium states
        </Button>
        <Button
          color={populationFilter[0] === MEDIUM_LARGE ? "primary" : ""}
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
          color={sortedBy === alphabet ? "primary" : ""}
          onClick={() => sortButton(alphabet)}
        >
          Alphabetically
        </Button>
        <Button
          color={sortedBy === evLow ? "primary" : ""}
          onClick={() => sortButton(evLow)}
        >
          Electoral Votes, low to high
        </Button>

        <Button
          color={sortedBy === evHigh ? "primary" : ""}
          onClick={() => sortButton(evHigh)}
        >
          Electoral Votes, high to low
        </Button>
      </div>

      <Grid container spacing={2} justify="center">
        {cards.map((item, key) => (
          <Grid key={key} item xs={12} sm={6} md={4} lg={3}>
            <Card key={key}>
              <CardContent>
                <Typography variant="h5">{item.state}</Typography>
                <Typography variant="subtitle2">
                  Population:{" "}
                  <Typography variant="body1" display="inline">
                    {item.population
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  </Typography>
                </Typography>

                <Typography variant="subtitle2">
                  Electoral votes:{" "}
                  <Typography variant="body1" display="inline">
                    {item.electoral}
                  </Typography>
                </Typography>

                <Typography variant="subtitle2">
                  Result:{" "}
                  <Typography variant="body1" display="inline">
                    {item.result}
                  </Typography>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
