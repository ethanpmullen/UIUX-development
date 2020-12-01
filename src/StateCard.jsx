import { Grid, Card, Typography, CardContent, Button } from "@material-ui/core";
import { popToRange } from "./App";

/**
 * returns the correct background color if the card is selected
 * @param {string} winner the winner of the card
 */
function winnerToColor(winner) {
  if (winner === "Biden") {
    return "#0c71e0";
  } else {
    return "#d5212e";
  }
}

function StateCard({ item, selected, setSelected }) {
  /**
   * selects or deselects state based on current state
   */
  function toggleSelected() {
    if (!selected.includes(item)) {
      setSelected([...selected, item]);
    } else {
      setSelected(selected.filter((x) => x !== item));
    }
  }

  return (
    <Grid key={item.name} item xs={12} sm={6} md={4} lg={3}>
      <Card
        style={{
          height: "100%",
          backgroundColor: selected.includes(item)
            ? winnerToColor(item.result)
            : "white",
          color: selected.includes(item) ? "white" : "black",
        }}
        key={item.name}
      >
        <CardContent>
          <Typography variant="h5">{item.name}</Typography>
          <img
            style={{
              width: "70%",
              height: "auto",
              objectFit: "contain",
            }}
            alt={"Flag of " + item.name}
            src={"./Flags/" + item.name + ".png"}
          />
          <Typography variant="subtitle2">
            Population:{" "}
            <Typography variant="body1" display="inline">
              {
                /*inserts commas into number */
                item.population
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                  " (" +
                  popToRange(item.population) +
                  ")"
              }
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
          <Button variant="contained" onClick={() => toggleSelected()}>
            {selected.includes(item) ? "Remove from Count" : "Include In Count"}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default StateCard;
