import {
  Grid,
  Card,
  Typography,
  CardContent,
  Button,
  Box,
} from "@material-ui/core";
import { evToRange } from "./App";

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

function StateCard({
  item,
  blueStates,
  setBlueStates,
  redStates,
  setRedStates,
}) {
  /**
   * selects or deselects a blue state based on current state
   */
  function toggleBlue() {
    if (redStates.includes(item)) {
      setRedStates(redStates.filter((x) => x !== item));
    }
    if (!blueStates.includes(item)) {
      setBlueStates([...blueStates, item]);
    } else {
      setBlueStates(blueStates.filter((x) => x !== item));
    }
  }

  /**
   * selects or deselects a red state based on current state
   */
  function toggleRed() {
    if (blueStates.includes(item)) {
      setBlueStates(blueStates.filter((x) => x !== item));
    }
    if (!redStates.includes(item)) {
      setRedStates([...redStates, item]);
    } else {
      setRedStates(redStates.filter((x) => x !== item));
    }
  }

  return (
    <Grid key={item.name} item xs={12} sm={6} md={4} lg={3}>
      <Card
        style={{
          height: "100%",
          backgroundColor: blueStates.includes(item)
            ? "#0c71e0"
            : redStates.includes(item)
            ? "#d5212e"
            : "white",
          color:
            blueStates.includes(item) || redStates.includes(item)
              ? "white"
              : "black",
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
                item.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            </Typography>
          </Typography>

          <Typography variant="subtitle2">
            Electoral votes:{" "}
            <Typography variant="body1" display="inline">
              {item.electoral + " (" + evToRange(item.electoral) + ")"}
            </Typography>
          </Typography>

          <Typography variant="subtitle2">
            Result:{" "}
            <Typography variant="body1" display="inline">
              {item.result}
            </Typography>
          </Typography>

          <Button
            style={{ margin: 5 }}
            variant="contained"
            onClick={() => toggleBlue()}
          >
            {blueStates.includes(item)
              ? "Unclaim for Biden"
              : "Claim for Biden"}
          </Button>
          <Button
            style={{
              margin: 5,
            }}
            variant="contained"
            onClick={() => toggleRed()}
          >
            {redStates.includes(item) ? "Unclaim for Trump" : "Claim for Trump"}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default StateCard;
